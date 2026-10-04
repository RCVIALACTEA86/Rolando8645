import { useState } from "react";
import AppLayout from "../components/AppLayout";
import { useAuth } from "../hooks/useAuth";

function HomePage() {
  const { user, balance } = useAuth();
  const [showCard, setShowCard] = useState(true);

  const handleAccept = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowCard(false);
  };

  return (
    <AppLayout>
      <div className="flex flex-1 flex-col items-center justify-center gap-2 overflow-y-auto p-6 text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">
          ¡Bienvenido, {user?.fullName}!
        </h1>
        <p className="max-w-md text-sm text-cr-muted">
          Pronto podrás apostar en las carreras de caracoles.
        </p>
      </div>

      {showCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-cr-night/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Bienvenida y saldo"
        >
          <form
            onSubmit={handleAccept}
            className="max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-3xl border border-cr-border bg-cr-navy-2/95 p-6 shadow-2xl shadow-black/50 sm:p-8"
          >
            <h1 className="text-center text-xl font-bold sm:text-2xl">
              ¡Bienvenido, {user?.fullName}!
            </h1>
            <p className="mt-2 text-center text-sm text-cr-muted">
              {user?.email}
            </p>

            <div className="glow-accent mt-6 rounded-2xl bg-gradient-to-br from-cr-navy-3 to-cr-blue-dark px-6 py-5 text-center">
              <p className="text-xs uppercase tracking-wide text-cr-blue-soft/80">
                Saldo disponible
              </p>
              <p className="mt-1 text-3xl font-bold text-white sm:text-4xl">
                ${balance.toLocaleString("es-CO")}
              </p>
            </div>

            <button
              type="submit"
              className="glow-cta mt-6 w-full rounded-lg bg-gradient-to-r from-cr-orange to-cr-orange-dark py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:from-cr-orange-soft hover:to-cr-orange"
            >
              Aceptar
            </button>
          </form>
        </div>
      )}
    </AppLayout>
  );
}

export default HomePage;
