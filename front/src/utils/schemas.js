import { z } from "zod";
import { PAYMENT_METHODS } from "./constants";

export const checkoutSchema = z.object({
  firstName: z.string().min(1, "Nombre es requerido"),
  lastName: z.string().min(1, "Apellido es requerido"),
  email: z.email("Correo inválido"),
  phone: z.string().min(1, "Teléfono es requerido"),
  address: z.string().min(1, "Dirección es requerida"),
  city: z.string().min(1, "Ciudad es requerida"),
  state: z.string().min(1, "Estado es requerido"),
  country: z.string().min(1, "País es requerido"),
  postalCode: z.string().min(1, "Código postal es requerido"),
  paymentMethod: z.enum(PAYMENT_METHODS.map((method) => method.name)),
});
