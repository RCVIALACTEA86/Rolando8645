import { useState } from "react";

interface PasswordFieldProps {
  name?: string;
  label?: string;
  placeholder?: string;
  minLength?: number;
  autoComplete?: string;
}

function PasswordField({
  name = "password",
  label,
  placeholder = "Contraseña",
  minLength,
  autoComplete,
}: PasswordFieldProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-semibold text-cr-ink/80"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-cr-muted"
          aria-hidden="true"
        >
          <path d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>

        <input
          id={name}
          name={name}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          minLength={minLength}
          autoComplete={autoComplete}
          className="w-full rounded-lg border border-cr-border bg-cr-field py-3 pl-11 pr-11 text-sm text-cr-ink placeholder-cr-muted/60 outline-none transition focus:border-cr-blue focus:ring-2 focus:ring-cr-blue/30"
          required
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-cr-muted transition hover:text-cr-ink"
          aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          {show ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
            >
              <path d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
            >
              <path d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default PasswordField;
