import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import PasswordField from "../components/PasswordField";

function getErrorMessage(err: unknown, fallback: string): string {
  const axiosMessage = (
    err as { response?: { data?: { message?: string } } }
  )?.response?.data?.message;
  if (axiosMessage) return axiosMessage;
  if (err instanceof Error && err.message) return err.message;
  return fallback;
}

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    try {
      await login({ email, password });
      navigate("/home");
    } catch (err) {
      setError(getErrorMessage(err, "Error al iniciar sesión"));
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 sm:space-y-5">
        <div className="text-center">
          <div className="mb-3 flex items-center justify-center gap-2 lg:hidden">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cr-blue text-sm font-bold text-white">
              CR
            </span>
            <span className="text-lg font-bold text-cr-ink">CaracolRace</span>
          </div>

          <h1 className="text-2xl font-bold text-cr-ink sm:text-3xl">
            Iniciar sesión
          </h1>
          <p className="mt-2 text-sm text-cr-muted">
            Bienvenido de nuevo a CaracolRace
          </p>
        </div>

        {error && (
          <p className="rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-2 text-sm text-red-400">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-cr-ink/80"
            >
              Correo electrónico
            </label>
            <div className="relative">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-cr-muted"
                aria-hidden="true"
              >
                <path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="tu@correo.com"
                autoComplete="email"
                className="w-full rounded-lg border border-cr-border bg-cr-field py-3 pl-11 pr-4 text-sm text-cr-ink placeholder-cr-muted/60 outline-none transition focus:border-cr-blue focus:ring-2 focus:ring-cr-blue/30"
                required
              />
            </div>
          </div>

          <PasswordField
            label="Contraseña"
            autoComplete="current-password"
            placeholder="Ingresa tu contraseña"
          />
        </div>

        <button
          type="submit"
          className="glow-cta w-full rounded-lg bg-gradient-to-r from-cr-orange to-cr-orange-dark py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:from-cr-orange-soft hover:to-cr-orange"
        >
          Entrar
        </button>

        <p className="text-center text-sm text-cr-muted">
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            className="font-semibold text-cr-blue-soft hover:underline"
          >
            Regístrate
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;
