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
    donator: z.string({ required_error: "El donador es obligatorio" }),
    budgetId: z.string().optional(),
  }),
};

const params = {
  params: z.object({
    id: z.string({
      required_error: "donationId is required",
    }),
  }),
};

export const createDonationSchema = z.object({
  ...payload,
});
export const updateDonationSchema = z.object({
  ...payload,
  ...params,
});

export const deleteDonationSchema = z.object({
  ...params,
});

export const getDonationSchema = z.object({
  ...params,
});

export type CreateDonationInput = TypeOf<typeof createDonationSchema>;
export type UpdateDonationInput = TypeOf<typeof updateDonationSchema>;
export type ReadDonationInput = TypeOf<typeof getDonationSchema>;
export type DeleteDonationInput = TypeOf<typeof deleteDonationSchema>;
