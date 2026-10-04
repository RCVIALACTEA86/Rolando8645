import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z
      .string({ required_error: "El nombre completo es requerido" })
      .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
    email: z
      .string({ required_error: "El correo es requerido" })
      .email({ message: "Correo no válido" }),
    password: z
      .string({ required_error: "La contraseña es requerida" })
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    confirmPassword: z
      .string({ required_error: "Debes confirmar la contraseña" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .string({ required_error: "El correo es requerido" })
    .email({ message: "Correo no válido" }),
  password: z.string({ required_error: "La contraseña es requerida" }),
  passwordHash: z.string({ required_error: "passwordHash es requerido" }),
  fullName: z.string({ required_error: "El nombre es requerido" }),
});
