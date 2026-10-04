import { createContext } from "react";
import type { User } from "../types";

export interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  balance: number;
  loading: boolean;
  register: (data: RegisterInput) => Promise<void>;
  login: (data: LoginInput) => Promise<void>;
  logout: () => Promise<void>;
  recharge: (amount: number) => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);
