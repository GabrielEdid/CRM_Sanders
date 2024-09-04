import { z, TypeOf } from "zod";

const payload = {
  body: z.object({
    name: z
      .string({
        required_error: "El nombre  es requerido",
      })
      .min(1, "El nombre tiene que tener al menos 1 caracter"),
    email: z
      .string({
        required_error: "El correo es requerido",
      })
      .email("El correo no es válido"),
  }),
};

const params = {
  params: z.object({
    donatorId: z.string({
      required_error: "donatorId is required",
    }),
  }),
};

export const createDonatorSchema = z.object({
  ...payload,
});
export const updateDonatorSchema = z.object({
  ...payload,
  ...params,
});

export const deleteDonatorSchema = z.object({
  ...params,
});

export const getDonatorSchema = z.object({
  ...params,
});

export type CreateDonatorInput = TypeOf<typeof createDonatorSchema>;
export type UpdateDonatorInput = TypeOf<typeof updateDonatorSchema>;
export type ReadDonatorInput = TypeOf<typeof getDonatorSchema>;
export type DeleteDonatorInput = TypeOf<typeof deleteDonatorSchema>;
