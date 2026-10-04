import instanceAxios from "./axios";
import type {
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  VerifyResponse,
} from "../types";

export const registerRequest = (user: RegisterPayload) =>
  instanceAxios.post<RegisterResponse>("/register", user);

export const loginRequest = (user: {
  email: string;
  password: string;
  passwordHash: string;
  fullName: string;
}) => instanceAxios.post<LoginResponse>("/login", user);

export const verifyTokenRequest = () =>
  instanceAxios.get<VerifyResponse>("/verify");

export const logoutRequest = () => instanceAxios.post("/logout");
