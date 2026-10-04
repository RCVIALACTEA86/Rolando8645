// Funciones para creación del Token (igual que GitCompositor)
import jwt from "jsonwebtoken";
import { KEY_SECRET } from "../config.js";

export interface TokenPayload {
  id: string;
  email: string;
  fullName: string;
}

export function createAccessToken(payload: TokenPayload): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, KEY_SECRET, { expiresIn: "1d" }, (err, token) => {
      if (err) reject(err);
      resolve(token as string);
    });
  });
}
