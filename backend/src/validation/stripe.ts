import { z, TypeOf } from "zod";

const payload = {
  body: z.object({
    amount: z
      .number({ required_error: "La cantidad es obligatoria" })
      .positive(),
    paymentMethod: z.enum(["stripe", "cash", "transfer"], {
      message: "El método de pago es obligatorio",
    }),
    message: z
      .string()
      .min(1, "El mensaje debe tener al menos un carácter")
      .optional(),
    donator: z
      .object({
        name: z.string().min(1, "El nombre es obligatorio"), // Add name validation
        email: z.string().email("El correo electrónico no es válido"),
        phone: z.string().min(1, "El teléfono es obligatorio"), // Add phone validation
      })
      .required(),
  }),
};

const params = {
  params: z.object({
    id: z.string({
      required_error: "donationId is required",
    }),
  }),
};

export const createStripeDonationSchema = z.object({
  ...payload,
});

export type CreateStripeDonationInput = TypeOf<
  typeof createStripeDonationSchema
>;
