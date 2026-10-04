import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  loginRequest,
  registerRequest,
  verifyTokenRequest,
  logoutRequest,
} from "../api/auth";
import {
  clearSession,
  findUserByEmail,
  getSession,
  saveSession,
  upsertUser,
} from "../lib/localStorage";
import type { User } from "../types";
import { AuthContext } from "./auth-context";
import type { LoginInput, RegisterInput } from "./auth-context";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(
    () => getSession()?.user ?? null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState<boolean>(
    () => Boolean(getSession()?.token)
  );

  useEffect(() => {
    const session = getSession();
    if (!session?.token) return;

    let active = true;

    (async () => {
      try {
        await verifyTokenRequest();
        if (!active) return;
        setUser(session.user);
        setIsAuthenticated(true);
      } catch {
        if (!active) return;
        clearSession();
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const register = async (data: RegisterInput) => {
    if (findUserByEmail(data.email)) {
      throw new Error("El correo ingresado ya está en uso!!!");
    }

    const res = await registerRequest(data);
    const { token, passwordHash, user: apiUser } = res.data;
    const newUser: User = { ...apiUser, passwordHash };

    upsertUser(newUser);
    saveSession({ token, user: newUser });
    setUser(newUser);
    setIsAuthenticated(true);
  };

  const login = async (data: LoginInput) => {
    const stored = findUserByEmail(data.email);
    if (!stored) {
      throw new Error("Usuario no encontrado!!");
    }

    const res = await loginRequest({
      email: stored.email,
      password: data.password,
      passwordHash: stored.passwordHash,
      fullName: stored.fullName,
    });

    saveSession({ token: res.data.token, user: stored });
    setUser(stored);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } catch {
      // Ignorar errores de red al cerrar sesión
    }
    clearSession();
    setUser(null);
    setIsAuthenticated(false);
  };

  const recharge = (amount: number) => {
    if (!user) return;
    const updated: User = {
      ...user,
      balance: (user.balance ?? 0) + amount,
    };
    upsertUser(updated);
    const session = getSession();
    if (session) {
      saveSession({ token: session.token, user: updated });
    }
    setUser(updated);
  };

  const balance = user?.balance ?? 0;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        balance,
        loading,
        register,
        login,
        logout,
        recharge,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
