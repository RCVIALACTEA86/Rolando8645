import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { KEY_SECRET } from "../config.js";
import type { TokenPayload } from "../libs/jwt.js";

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

export const authRequired = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;

  if (!token) {
    res.status(401).json({ message: "No Autorizado" });
    return;
  }

  jwt.verify(token, KEY_SECRET, (err, user) => {
    if (err) {
      res.status(401).json({ message: "No Autorizado" });
      return;
    }
    req.user = user as TokenPayload;
    next();
  });
};
