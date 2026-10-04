import { z } from "zod";

export const chargeSchema = z.object({
  cardNumber: z
    .string({ required_error: "El número de tarjeta es requerido" })
    .regex(/^\d{16}$/, {
      message: "El número de tarjeta debe tener 16 dígitos",
    }),
  expiry: z
    .string({ required_error: "La fecha de vencimiento es requerida" })
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
      message: "La fecha de vencimiento debe tener el formato MM/AA",
    }),
  cvv: z
    .string({ required_error: "El CVV es requerido" })
    .regex(/^\d{3,4}$/, { message: "El CVV debe tener 3 o 4 dígitos" }),
  fullName: z
    .string({ required_error: "El nombre completo es requerido" })
    .trim()
    .min(1, { message: "El nombre completo es requerido" }),
  amount: z
    .number({ required_error: "El monto es requerido" })
    .positive({ message: "El monto debe ser mayor que cero" }),
  userId: z
    .string({ required_error: "El identificador del usuario es requerido" })
    .min(1, { message: "El identificador del usuario es requerido" }),
  email: z
    .string({ required_error: "El correo es requerido" })
    .email({ message: "Correo no válido" }),
});
