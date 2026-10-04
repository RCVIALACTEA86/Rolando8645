import type { Request, Response, NextFunction } from "express";
import type { ZodTypeAny } from "zod";

export const validateSchema =
  (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      const message =
        error instanceof Error && "errors" in error
          ? (error as { errors: { message: string }[] }).errors
              .map((e) => e.message)
              .join(", ")
          : "Datos inválidos";
      res.status(400).json({ message });
    }
  };
