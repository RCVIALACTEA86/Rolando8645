export interface User {
  fullName: string;
  email: string;
  passwordHash: string;
  balance: number;
}

export interface AuthSession {
  token: string;
  user: User;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  token: string;
  passwordHash: string;
  user: {
    fullName: string;
    email: string;
    balance: number;
  };
}

export interface LoginResponse {
  token: string;
  user: {
    fullName: string;
    email: string;
  };
}

export interface VerifyResponse {
  id: string;
  email: string;
  fullName: string;
  mensaje: string;
}

export interface ChargePayload {
  cardNumber: string;
  expiry: string;
  cvv: string;
  fullName: string;
  amount: number;
  userId: string;
  email: string;
}

export type ChargeStatus = "Aprobado" | "Rechazado" | "Error";

export interface ChargeResponse {
  id: string;
  status: ChargeStatus;
  status_detail: string;
  transaction_amount: number;
  date_created: string;
  authorization_code: string | null;
  reference: string;
  payer_id: string;
  payer_email: string;
  cardNumber: string;
  cvv: string;
  message: string;
}
