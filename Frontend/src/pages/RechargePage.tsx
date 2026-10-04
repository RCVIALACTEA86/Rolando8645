import { useState } from "react";
import AppLayout from "../components/AppLayout";
import { useAuth } from "../hooks/useAuth";
import { chargeRequest } from "../api/snailpay";
import { getCard, saveCard } from "../lib/localStorage";
import type { ChargeResponse, ChargeStatus } from "../types";

function money(value: number) {
  return `$${Math.round(value).toLocaleString("es-CO")}`;
}

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function formatExpiry(value: string) {
  const digits = onlyDigits(value).slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
}

interface ChargeResult {
  status: ChargeStatus;
  statusDetail: string;
  message: string;
}

const resultTitles: Record<ChargeStatus, string> = {
  Aprobado: "Operación aprobada",
  Rechazado: "Operación rechazada",
  Error: "Error del sistema",
};

const resultStyles: Record<ChargeStatus, string> = {
  Aprobado: "border-cr-emerald/40 bg-cr-emerald/10 text-cr-emerald",
  Rechazado: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  Error: "border-red-500/25 bg-red-500/10 text-red-400",
};

function RechargePage() {
  const { user, balance, recharge } = useAuth();
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<ChargeResult | null>(null);
  const [savedCard] = useState(() => getCard());

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult(null);

    if (!user) {
      setResult({
        status: "Error",
        statusDetail: "Sesión no válida",
        message: "No hay un usuario autenticado.",
      });
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const cardNumber = onlyDigits(String(formData.get("cardNumber") ?? ""));
    const expiry = String(formData.get("expiry") ?? "").trim();
    const cvv = onlyDigits(String(formData.get("cvv") ?? ""));
    const fullName = String(formData.get("fullName") ?? "").trim();
    const amount = Number(formData.get("amount"));

    setSending(true);

    try {
      const res = await chargeRequest({
        cardNumber,
        expiry,
        cvv,
        fullName,
        amount,
        userId: user.email,
        email: user.email,
      });

      saveCard({ cardNumber: res.data.cardNumber, cvv: res.data.cvv });

      if (res.data.status === "Aprobado") {
        recharge(res.data.transaction_amount);
        form.reset();
      }

      setResult({
        status: res.data.status,
        statusDetail: res.data.status_detail,
        message: res.data.message,
      });
    } catch (err) {
      const data = (
        err as { response?: { data?: Partial<ChargeResponse> } }
      )?.response?.data;

      if (data?.status_detail) {
        setResult({
          status: (data.status as ChargeStatus) ?? "Error",
          statusDetail: data.status_detail,
          message: data.message ?? "No se pudo procesar el cobro.",
        });
      } else {
        setResult({
          status: "Error",
          statusDetail: "Solicitud no procesada",
          message:
            data?.message || "No se pudo procesar el cobro. Intenta de nuevo.",
        });
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-4 sm:p-6">
        <div className="mx-auto w-full max-w-lg space-y-6">
          <header>
            <h1 className="text-2xl font-bold sm:text-3xl">Recargar saldo</h1>
            <p className="mt-1 text-sm text-cr-muted">
              SnailPay · pasarela de pagos simulada (no procesa pagos reales).
            </p>
          </header>

          <div className="glow-accent rounded-2xl bg-gradient-to-br from-cr-navy-3 to-cr-blue-dark px-6 py-5 text-center">
            <p className="text-xs uppercase tracking-wide text-cr-blue-soft/80">
              Saldo disponible
            </p>
            <p className="mt-1 text-3xl font-bold text-white sm:text-4xl">
              {money(balance)}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-3xl border border-cr-border bg-cr-navy-2/80 p-5 shadow-xl shadow-black/30 sm:p-6"
          >
            <div className="space-y-1">
              <p className="text-xs text-cr-muted">
                Usuario: <span className="text-cr-ink">{user?.email}</span>
              </p>
              <p className="text-xs text-cr-muted">
                Identificador:{" "}
                <span className="text-cr-ink">{user?.email}</span>
              </p>
            </div>

            {result && (
              <div
                role={result.status === "Aprobado" ? "status" : "alert"}
                className={`rounded-lg border px-3 py-2 text-sm ${resultStyles[result.status]}`}
              >
                <p className="font-semibold">
                  {resultTitles[result.status]} · {result.statusDetail}
                </p>
                <p className="mt-0.5">{result.message}</p>
              </div>
            )}

            <div className="space-y-1.5">
              <label
                htmlFor="cardNumber"
                className="block text-sm font-semibold text-cr-ink/80"
              >
                Número de tarjeta
              </label>
              <input
                id="cardNumber"
                name="cardNumber"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="1234123412341234"
                maxLength={16}
                pattern="\d{16}"
                defaultValue={savedCard?.cardNumber ?? ""}
                className="w-full rounded-lg border border-cr-border bg-cr-field px-4 py-3 text-sm text-cr-ink placeholder-cr-muted/60 outline-none transition focus:border-cr-blue focus:ring-2 focus:ring-cr-blue/30"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label
                  htmlFor="expiry"
                  className="block text-sm font-semibold text-cr-ink/80"
                >
                  Fecha de vencimiento
                </label>
                <input
                  id="expiry"
                  name="expiry"
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  placeholder="MM/AA"
                  maxLength={5}
                  onChange={(e) => {
                    e.target.value = formatExpiry(e.target.value);
                  }}
                  className="w-full rounded-lg border border-cr-border bg-cr-field px-4 py-3 text-sm text-cr-ink placeholder-cr-muted/60 outline-none transition focus:border-cr-blue focus:ring-2 focus:ring-cr-blue/30"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="cvv"
                  className="block text-sm font-semibold text-cr-ink/80"
                >
                  CVV
                </label>
                <input
                  id="cvv"
                  name="cvv"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  placeholder="543"
                  maxLength={4}
                  pattern="\d{3,4}"
                  defaultValue={savedCard?.cvv ?? ""}
                  className="w-full rounded-lg border border-cr-border bg-cr-field px-4 py-3 text-sm text-cr-ink placeholder-cr-muted/60 outline-none transition focus:border-cr-blue focus:ring-2 focus:ring-cr-blue/30"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="fullName"
                className="block text-sm font-semibold text-cr-ink/80"
              >
                Nombre completo
              </label>
              <input
                id="fullName"
                name="fullName"
                autoComplete="cc-name"
                placeholder="Como aparece en la tarjeta"
                className="w-full rounded-lg border border-cr-border bg-cr-field px-4 py-3 text-sm text-cr-ink placeholder-cr-muted/60 outline-none transition focus:border-cr-blue focus:ring-2 focus:ring-cr-blue/30"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="amount"
                className="block text-sm font-semibold text-cr-ink/80"
              >
                Monto de la recarga (COP)
              </label>
              <input
                id="amount"
                name="amount"
                type="number"
                inputMode="numeric"
                min={1}
                step={1}
                placeholder="50000"
                className="w-full rounded-lg border border-cr-border bg-cr-field px-4 py-3 text-sm text-cr-ink placeholder-cr-muted/60 outline-none transition focus:border-cr-blue focus:ring-2 focus:ring-cr-blue/30"
                required
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="glow-cta w-full rounded-lg bg-gradient-to-r from-cr-orange to-cr-orange-dark py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:from-cr-orange-soft hover:to-cr-orange disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? "Procesando..." : "Pagar con SnailPay"}
            </button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}

export default RechargePage;
