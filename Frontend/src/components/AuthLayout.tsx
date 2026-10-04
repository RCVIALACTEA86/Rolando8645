import type { ReactNode } from "react";

function SnailMark() {
  return (
    <div className="relative h-56 w-56 sm:h-64 sm:w-64 lg:h-72 lg:w-72" aria-hidden="true">
      <div className="absolute inset-0 rounded-full bg-cr-blue/20 blur-3xl" />

      <svg
        viewBox="0 0 240 200"
        className="relative h-full w-full drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Pista */}
        <path
          d="M10 168h190"
          stroke="#1d4ed8"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="14 12"
        />

        {/* Rastro de baba */}
        <path
          className="snail-trail"
          d="M14 160c16-8 36 8 56 0s40-8 60 0"
          stroke="#60a5fa"
          strokeOpacity="0.6"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="10 14"
        />

        {/* Sombra */}
        <ellipse cx="96" cy="156" rx="66" ry="7" fill="#050b1a" opacity="0.5" />

        {/* Cartas de apuesta */}
        <g className="snail-crawl">
          <g className="snail-group">
            <g style={{ filter: "drop-shadow(0 0 7px rgba(244,114,182,0.55))" }}>
              <g transform="rotate(-14 37 87)">
                <rect
                  x="8"
                  y="46"
                  width="58"
                  height="82"
                  rx="9"
                  fill="#5b21b6"
                  stroke="#f472b6"
                  strokeWidth="2.5"
                />
                <path
                  transform="translate(24 64) scale(0.55)"
                  d="M0 7 C-4 2 -10 -2 -10 -8 C-10 -13 -4 -16 0 -11 C4 -16 10 -13 10 -8 C10 -2 4 2 0 7 Z"
                  fill="#f472b6"
                />
                <path
                  transform="translate(37 96) scale(2)"
                  d="M0 7 C-4 2 -10 -2 -10 -8 C-10 -13 -4 -16 0 -11 C4 -16 10 -13 10 -8 C10 -2 4 2 0 7 Z"
                  fill="none"
                  stroke="#f472b6"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </g>
            </g>

            <g style={{ filter: "drop-shadow(0 0 7px rgba(34,211,238,0.55))" }}>
              <g transform="rotate(14 81 65)">
                <rect
                  x="52"
                  y="24"
                  width="58"
                  height="82"
                  rx="9"
                  fill="#312e81"
                  stroke="#22d3ee"
                  strokeWidth="2.5"
                />
                <path
                  transform="translate(68 44) scale(0.5)"
                  d="M0 -13 C-4 -8 -11 -5 -11 1 C-11 5 -8 8 -4 8 C-2.5 8 -1.5 7 -1 6 L-3.5 14 L3.5 14 L1 6 C1.5 7 2.5 8 4 8 C8 8 11 5 11 1 C11 -5 4 -8 0 -13 Z"
                  fill="#22d3ee"
                />
                <path
                  transform="translate(81 76) scale(2)"
                  d="M0 -13 C-4 -8 -11 -5 -11 1 C-11 5 -8 8 -4 8 C-2.5 8 -1.5 7 -1 6 L-3.5 14 L3.5 14 L1 6 C1.5 7 2.5 8 4 8 C8 8 11 5 11 1 C11 -5 4 -8 0 -13 Z"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </g>
            </g>
          </g>
        </g>

        {/* Caracol */}
        <g className="snail-crawl">
          <g className="snail-group">
            {/* Cuerpo */}
            <path
              d="M40 148h94c20 0 32-14 32-30"
              stroke="#3b82f6"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <path
              d="M40 148h94c20 0 32-14 32-30"
              stroke="#93c5fd"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.5"
            />

            {/* Concha */}
            <circle cx="88" cy="114" r="42" fill="#1d4ed8" />
            <circle
              cx="88"
              cy="114"
              r="42"
              fill="none"
              stroke="#15358f"
              strokeWidth="3"
            />
            <path
              d="M88 114a26 26 0 0 1 26 26"
              stroke="#f97316"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <path
              d="M88 114a13 13 0 0 1 13 13"
              stroke="#93c5fd"
              strokeWidth="6"
              strokeLinecap="round"
            />

            {/* Antenas */}
            <g>
              <path
                className="snail-antenna"
                d="M158 116 172 74"
                stroke="#3b82f6"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <circle cx="173" cy="68" r="9" fill="#ffffff" />
              <circle cx="173" cy="68" r="4" fill="#081226" />
            </g>
            <g>
              <path
                className="snail-antenna snail-antenna--alt"
                d="M150 114 138 76"
                stroke="#3b82f6"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <circle cx="136" cy="70" r="9" fill="#ffffff" />
              <circle cx="136" cy="70" r="4" fill="#081226" />
            </g>
          </g>
        </g>

        {/* Fichas de apuesta */}
        <g className="snail-crawl">
          <g className="snail-group">
            <g style={{ filter: "drop-shadow(0 0 7px rgba(34,211,238,0.6))" }}>
              <circle cx="152" cy="150" r="20" fill="#0a172b" stroke="#22d3ee" strokeWidth="3" />
              <circle
                cx="152"
                cy="150"
                r="13.5"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="4"
                strokeDasharray="3 6"
                opacity="0.9"
              />
              <circle
                cx="152"
                cy="150"
                r="9"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="1.5"
                opacity="0.7"
              />
              <path
                transform="translate(152 151) scale(0.62)"
                d="M0 -13 C-4 -8 -11 -5 -11 1 C-11 5 -8 8 -4 8 C-2.5 8 -1.5 7 -1 6 L-3.5 14 L3.5 14 L1 6 C1.5 7 2.5 8 4 8 C8 8 11 5 11 1 C11 -5 4 -8 0 -13 Z"
                fill="#22d3ee"
              />
            </g>

            <g style={{ filter: "drop-shadow(0 0 7px rgba(244,114,182,0.6))" }}>
              <circle cx="119" cy="163" r="17" fill="#4c1d95" stroke="#f472b6" strokeWidth="3" />
              <circle
                cx="119"
                cy="163"
                r="11.5"
                fill="none"
                stroke="#f472b6"
                strokeWidth="4"
                strokeDasharray="3 5"
                opacity="0.9"
              />
              <circle
                cx="119"
                cy="163"
                r="7.5"
                fill="none"
                stroke="#f472b6"
                strokeWidth="1.5"
                opacity="0.7"
              />
              <path
                transform="translate(119 164) scale(0.55)"
                d="M0 7 C-4 2 -10 -2 -10 -8 C-10 -13 -4 -16 0 -11 C4 -16 10 -13 10 -8 C10 -2 4 2 0 7 Z"
                fill="#f472b6"
              />
            </g>
          </g>
        </g>

        {/* Meta a cuadros */}
        <line
          x1="196"
          y1="168"
          x2="196"
          y2="96"
          stroke="#3b82f6"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <g className="snail-flag">
          <path d="M196 96h34v22h-34z" fill="#ffffff" />
          <path
            d="M196 96h11.33v11H196zM219.66 96h10.34v11h-10.34zM207.33 107h11.33v11h-11.33z"
            fill="#f97316"
          />
        </g>
      </svg>
    </div>
  );
}

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-cr-night bg-diamonds p-4 sm:p-6">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl border border-cr-border bg-cr-navy-2 shadow-2xl shadow-black/50 lg:min-h-[640px]">
        {/* Panel decorativo (solo desktop) */}
        <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden border-r border-cr-border bg-cr-navy p-10 lg:flex">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cr-blue/15 via-transparent to-cr-blue-dark/25" />

          <div className="relative flex flex-1 items-center justify-center">
            <SnailMark />
          </div>

          <div className="relative text-center">
            <h2 className="text-2xl font-bold text-cr-ink">
              Caracol<span className="text-cr-blue-soft">Race</span>
            </h2>
            <p className="mx-auto mt-2 max-w-xs text-sm text-cr-muted">
              Las carreras más lentas y divertidas. Registra tu cuenta y apuesta
              por tu caracol favorito.
            </p>
          </div>
        </div>

        {/* Contenido (formulario) */}
        <div className="flex w-full items-center justify-center bg-cr-navy-2 p-6 sm:p-10 lg:w-1/2 lg:p-12">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
