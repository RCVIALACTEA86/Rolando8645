import { useState } from "react";
import type { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const navItems = [
  { to: "/home", label: "Inicio" },
  { to: "/apuestas", label: "Apuestas Realizadas" },
  { to: "/recargar", label: "Recargar saldo" },
];

function AppLayout({ children }: { children: ReactNode }) {
  const { user, balance, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-cr-night bg-diamonds text-cr-ink">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-72 max-w-[85vw] shrink-0 flex-col overflow-hidden border-r border-cr-border bg-cr-navy transition-transform duration-200 lg:static lg:max-w-none lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 pt-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cr-blue to-cr-blue-dark text-sm font-bold text-white">
              CR
            </span>
            <span className="text-lg font-bold">
              Caracol<span className="text-cr-blue-soft">Race</span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-md p-1 text-cr-muted transition hover:bg-white/5 hover:text-cr-ink lg:hidden"
            aria-label="Cerrar panel"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="h-5 w-5"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="px-5 pt-3">
          <p className="truncate text-sm font-semibold">{user?.fullName}</p>
          <p className="truncate text-xs text-cr-muted">{user?.email}</p>
        </div>

        <div className="px-5 py-4">
          <div className="glow-accent rounded-2xl bg-gradient-to-br from-cr-navy-3 to-cr-blue-dark px-4 py-4">
            <p className="text-[10px] uppercase tracking-wide text-cr-blue-soft/80">
              Saldo disponible
            </p>
            <p className="mt-1 text-2xl font-bold text-white">
              ${balance.toLocaleString("es-CO")}
            </p>
          </div>
        </div>

        <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3 pb-4">
          <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-wide text-cr-muted/70">
            Menú
          </p>

          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `block w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                  isActive
                    ? "bg-white/10 text-cr-ink"
                    : "text-cr-muted hover:bg-white/5 hover:text-cr-ink"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <button
            type="button"
            disabled
            className="w-full cursor-not-allowed rounded-lg px-3 py-2 text-left text-sm text-cr-muted/60"
          >
            Carreras (pronto)
          </button>
        </nav>

        <div className="border-t border-cr-border p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-lg border border-cr-border py-2 text-sm font-semibold text-cr-ink transition hover:border-cr-blue/60 hover:bg-cr-blue/10"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div className="flex items-center gap-3 border-b border-cr-border bg-cr-navy/80 px-3 py-3 backdrop-blur lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-md p-1.5 text-cr-muted transition hover:bg-white/5 hover:text-cr-ink"
            aria-label="Abrir menú"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="h-5 w-5"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <span className="text-base font-bold">
            Caracol<span className="text-cr-blue-soft">Race</span>
          </span>

          <span className="ml-auto shrink-0 rounded-full border border-cr-border bg-cr-navy-3/60 px-2.5 py-1 text-xs font-semibold text-cr-blue-soft">
            ${balance.toLocaleString("es-CO")}
          </span>
        </div>

        {children}
      </main>
    </div>
  );
}

export default AppLayout;
