import { useState, type CSSProperties } from "react";
import AppLayout from "../components/AppLayout";

const WAVE_PERIOD = 60;
const WAVE_BASE_Y = 26;

function buildWaveLine(startX: number, endX: number) {
  let d = `M${startX} ${WAVE_BASE_Y}`;
  for (let x = startX; x < endX; x += WAVE_PERIOD) {
    d += ` C${x + 10} ${WAVE_BASE_Y - 16}, ${x + 20} ${WAVE_BASE_Y - 16}, ${x + 30} ${WAVE_BASE_Y}`;
    d += ` C${x + 40} ${WAVE_BASE_Y + 16}, ${x + 50} ${WAVE_BASE_Y + 16}, ${x + 60} ${WAVE_BASE_Y}`;
  }
  return d;
}

const WAVE_LINE = buildWaveLine(-60, 180);
const WAVE_PATH = `${WAVE_LINE} L180 40 L-60 40 Z`;

const CATEGORY_LABELS = ["Simples", "Combinadas", "Favoritas", "En vivo"];

const SNAILS: { name: string; speed: number }[] = [
  { name: "Fantasmita", speed: 1.35 },
  { name: "Hércules", speed: 1.2 },
  { name: "Flash", speed: 1.0 },
  { name: "Destello", speed: 0.9 },
  { name: "Máquina", speed: 0.75 },
  { name: "Correcaminos", speed: 0.6 },
];
const RACES_PER_DAY = 6;

type Category = { label: string; pct: number };

type Dashboard = {
  invested: number;
  won: number;
  totalBets: number;
  wonBets: number;
  lostBets: number;
  bestStreak: number;
  categories: Category[];
  raceWins: number[];
};

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function money(value: number) {
  return `$${Math.round(value).toLocaleString("es-CO")}`;
}

function buildData(): Dashboard {
  const totalBets = randomInt(40, 160);
  const wonBets = randomInt(
    Math.round(totalBets * 0.35),
    Math.round(totalBets * 0.75)
  );
  const lostBets = totalBets - wonBets;
  const invested = totalBets * randomInt(3000, 9000);
  const won = Math.round(invested * (0.7 + Math.random() * 1.1));

  const categories = CATEGORY_LABELS.map((label) => ({
    label,
    pct: randomInt(30, 95),
  }));

  const raceWins = SNAILS.map(() => 0);
  const totalSpeed = SNAILS.reduce((acc, snail) => acc + snail.speed, 0);
  for (let race = 0; race < RACES_PER_DAY; race++) {
    let roll = Math.random() * totalSpeed;
    let winner = SNAILS.length - 1;
    for (let i = 0; i < SNAILS.length; i++) {
      roll -= SNAILS[i].speed;
      if (roll <= 0) {
        winner = i;
        break;
      }
    }
    raceWins[winner] += 1;
  }

  return {
    invested,
    won,
    totalBets,
    wonBets,
    lostBets,
    bestStreak: randomInt(3, 12),
    categories,
    raceWins,
  };
}

function WaveCard({
  label,
  value,
  hint,
  gradientId,
  from,
  to,
  delay = 0,
}: {
  label: string;
  value: string;
  hint: string;
  gradientId: string;
  from: string;
  to: string;
  delay?: number;
}) {
  return (
    <div
      className="animate-water-rise relative overflow-hidden rounded-2xl border border-cr-border bg-cr-navy-2"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="p-5">
        <p className="text-xs text-cr-muted">{label}</p>
        <p className="mt-1 text-2xl font-bold text-white">{value}</p>
        <p className="mt-1 text-xs text-cr-muted">{hint}</p>
      </div>
      <div className="relative h-16 overflow-hidden">
        <svg
          viewBox="0 0 120 40"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={from} />
              <stop offset="100%" stopColor={to} />
            </linearGradient>
          </defs>
          <g className="animate-water-slosh-slow">
            <path d={WAVE_PATH} fill={`url(#${gradientId})`} opacity="0.45" />
          </g>
          <g className="animate-water-slosh">
            <path d={WAVE_PATH} fill={`url(#${gradientId})`} />
            <path
              d={WAVE_LINE}
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.45"
              strokeWidth="1.5"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

function BetsPage() {
  const [data] = useState<Dashboard>(buildData);

  const net = data.won - data.invested;
  const roi = data.invested
    ? Math.round((net / data.invested) * 100)
    : 0;
  const winRate = data.totalBets
    ? Math.round((data.wonBets / data.totalBets) * 100)
    : 0;
  const lostPct = 100 - winRate;

  const topWins = Math.max(...data.raceWins, 0);

  const donutSize = 180;
  const donutStroke = 24;
  const donutRadius = (donutSize - donutStroke) / 2;
  const donutCircumference = 2 * Math.PI * donutRadius;
  const wonLength = (winRate / 100) * donutCircumference;
  const lostLength = donutCircumference - wonLength;
  const wonAngle = (winRate / 100) * 360;

  return (
    <AppLayout>
      <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-4 sm:p-6">
        <div className="mx-auto w-full max-w-5xl space-y-6">
          <header>
            <h1 className="text-2xl font-bold sm:text-3xl">
              Apuestas Realizadas
            </h1>
            <p className="mt-1 text-sm text-cr-muted">
              Resumen de tus apuestas y bonos.
            </p>
          </header>

          <div className="rounded-3xl border border-cr-border bg-cr-navy-2/80 p-5 shadow-xl shadow-black/30 sm:p-6">
            <h2 className="text-lg font-bold text-white">
              Resumen ganadas / perdidas
            </h2>

            <div className="mt-4 flex flex-col items-center gap-8 sm:flex-row sm:justify-around">
              <div
                className="relative shrink-0"
                style={{ width: donutSize, height: donutSize }}
              >
                <svg
                  width={donutSize}
                  height={donutSize}
                  viewBox={`0 0 ${donutSize} ${donutSize}`}
                  className="-rotate-90"
                  role="img"
                  aria-label={`Apuestas ganadas ${winRate}% y perdidas ${lostPct}%`}
                >
                  <circle
                    cx={donutSize / 2}
                    cy={donutSize / 2}
                    r={donutRadius}
                    fill="none"
                    stroke="#f97316"
                    strokeWidth={donutStroke}
                    strokeDasharray={donutCircumference}
                    strokeDashoffset={donutCircumference - lostLength}
                    transform={`rotate(${wonAngle} ${donutSize / 2} ${donutSize / 2})`}
                    className="animate-donut"
                    style={
                      {
                        "--dash-from": `${donutCircumference}`,
                        "--dash-to": `${donutCircumference - lostLength}`,
                        animationDelay: "0.35s",
                      } as CSSProperties
                    }
                  />
                  <circle
                    cx={donutSize / 2}
                    cy={donutSize / 2}
                    r={donutRadius}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth={donutStroke}
                    strokeDasharray={donutCircumference}
                    strokeDashoffset={donutCircumference - wonLength}
                    className="animate-donut"
                    style={
                      {
                        "--dash-from": `${donutCircumference}`,
                        "--dash-to": `${donutCircumference - wonLength}`,
                        animationDelay: "0.1s",
                      } as CSSProperties
                    }
                  />
                </svg>

                <div
                  className="animate-donut-pop absolute inset-0 flex flex-col items-center justify-center"
                  style={{ animationDelay: "0.6s" }}
                >
                  <span className="text-3xl font-bold text-white">
                    {winRate}%
                  </span>
                  <span className="text-[10px] uppercase tracking-wide text-cr-muted">
                    Ganadas
                  </span>
                </div>
              </div>

              <ul className="w-full max-w-xs space-y-4">
                <li className="flex items-center gap-3">
                  <span className="h-3 w-3 shrink-0 rounded-full bg-cr-blue" />
                  <span className="text-sm text-cr-ink">Ganadas</span>
                  <span className="ml-auto text-sm font-semibold text-white">
                    {data.wonBets}
                  </span>
                  <span className="w-10 text-right text-xs text-cr-muted">
                    {winRate}%
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-3 w-3 shrink-0 rounded-full bg-cr-orange" />
                  <span className="text-sm text-cr-ink">Perdidas</span>
                  <span className="ml-auto text-sm font-semibold text-white">
                    {data.lostBets}
                  </span>
                  <span className="w-10 text-right text-xs text-cr-muted">
                    {lostPct}%
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-3 w-3 shrink-0 rounded-full bg-cr-emerald" />
                  <span className="text-sm text-cr-ink">Mejor racha</span>
                  <span className="ml-auto text-sm font-semibold text-white">
                    {data.bestStreak}
                  </span>
                </li>
                <li className="flex items-center gap-3 border-t border-cr-border pt-4">
                  <span className="text-sm font-semibold text-cr-ink">
                    Total
                  </span>
                  <span className="ml-auto text-sm font-bold text-white">
                    {data.totalBets}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <WaveCard
              label="Dinero invertido"
              value={money(data.invested)}
              hint={`${data.totalBets} apuestas realizadas`}
              gradientId="wave-invested"
              from="#3b82f6"
              to="#8b5cf6"
              delay={80}
            />
            <WaveCard
              label="Dinero ganado"
              value={money(data.won)}
              hint={`${data.wonBets} apuestas ganadas`}
              gradientId="wave-won"
              from="#10b981"
              to="#14b8a6"
              delay={200}
            />
            <WaveCard
              label="Ganancia neta"
              value={(net >= 0 ? "+" : "-") + money(Math.abs(net)).slice(1)}
              hint={`Rentabilidad ${roi}%`}
              gradientId="wave-net"
              from={net >= 0 ? "#d946ef" : "#f97316"}
              to={net >= 0 ? "#8b5cf6" : "#ea580c"}
              delay={320}
            />
          </div>

          <div className="rounded-3xl border border-cr-border bg-cr-navy-2/80 p-5 shadow-xl shadow-black/30 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
              <div>
                <h2 className="text-lg font-bold text-white">
                  Victorias por caracol
                </h2>
                <p className="text-xs text-cr-muted">
                  Día simulado · {RACES_PER_DAY} carreras de{" "}
                  {SNAILS.length} caracoles · dato de ejemplo
                </p>
              </div>
              <span className="rounded-full border border-cr-blue/40 bg-cr-blue/10 px-3 py-1 text-sm font-bold text-cr-blue-soft">
                {RACES_PER_DAY} carreras
              </span>
            </div>

            <div className="mt-5 flex items-end justify-between gap-2 sm:gap-4">
              {data.raceWins.map((wins, i) => (
                <div
                  key={SNAILS[i].name}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <span className="text-xs font-semibold text-white">
                    {wins}
                  </span>
                  <div
                    className="flex h-40 w-full items-end justify-center"
                    title={`${SNAILS[i].name}: ${wins} victoria(s) de ${RACES_PER_DAY}`}
                  >
                    <div
                      className={`animate-bar-rise w-full max-w-10 rounded-t ${
                        wins === topWins && wins > 0
                          ? "bg-cr-orange"
                          : "bg-cr-blue"
                      }`}
                      style={{
                        height: `${(wins / RACES_PER_DAY) * 100}%`,
                        animationDelay: `${i * 300}ms`,
                      }}
                    />
                  </div>
                  <span className="w-full truncate text-center text-[10px] text-cr-muted">
                    {SNAILS[i].name}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-3 text-[11px] text-cr-muted">
              Cada carrera tiene un único ganador; la barra naranja marca al
              caracol con más victorias del día.
            </p>
          </div>

          <p className="text-center text-[11px] uppercase tracking-wide text-cr-muted/70">
            Datos de ejemplo
          </p>
        </div>
      </div>
    </AppLayout>
  );
}

export default BetsPage;
