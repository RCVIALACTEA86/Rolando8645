import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import { INITIAL_BALANCE } from "../config.js";
import type { AuthRequest } from "../middlewares/authRequired.js";

//#region Registrar Usuarios
export const register = async (req: Request, res: Response): Promise<void> => {
  const { fullName, email, password } = req.body as {
    fullName: string;
    email: string;
    password: string;
  };

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const token = await createAccessToken({ id: email, email, fullName });

    res.json({
      token,
      passwordHash,
      user: {
        fullName,
        email,
        balance: INITIAL_BALANCE,
      },
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
//#endregion

//#region Logueo de Usuario
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password, passwordHash, fullName } = req.body as {
    email: string;
    password: string;
    passwordHash: string;
    fullName: string;
  };

  try {
    const validPassword = await bcrypt.compare(password, passwordHash);
    if (!validPassword) {
      res.status(400).json({ message: "Contraseña inválida!!" });
      return;
    }

    const token = await createAccessToken({ id: email, email, fullName });

    res.json({
      token,
      user: {
        fullName,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
//#endregion

//#region Logout
export const logout = (_req: Request, res: Response): void => {
  res.sendStatus(200);
};
//#endregion

//#region Verificación del Token
export const verifyToken = (req: AuthRequest, res: Response): void => {
  const user = req.user;

  if (!user) {
    res.status(401).json({ message: "No Autorizado" });
    return;
  }

  res.json({
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    mensaje: "Validación-Token: OK!!",
  });
};
//#endregion
