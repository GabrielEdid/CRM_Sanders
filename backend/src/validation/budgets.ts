import { z, TypeOf } from "zod";

const payload = {
  body: z.object({
    title: z
      .string({
        required_error: "El título  es requerido",
      })
      .min(1, "El título tiene que tener al menos 1 caracter"),
    totalAmount: z
      .number({
        required_error: "El monto es obligatorio",
      })
      .positive(),

    description: z
      .string({
        required_error: "La descripción  es requerida",
      })
      .min(1, "la descripción tiene que tener al menos 1 caracter"),
    startDate: z.coerce.date({
      required_error: "La fecha de inicio es requerida",
    }),
    endDate: z.coerce.date({
      required_error: "La fecha de término es requerida",
    }),
  }),
};

const params = {
  params: z.object({
    id: z.string(),
  }),
};

export const createBudgetSchema = z.object({
  ...payload,
});
export const updateBudgetSchema = z.object({
  ...payload,
  ...params,
});

export const deleteBudgetSchema = z.object({
  ...params,
});

export const getBudgetSchema = z.object({
  ...params,
});

export type CreateBudgetInput = TypeOf<typeof createBudgetSchema>;
export type UpdateBudgetInput = TypeOf<typeof updateBudgetSchema>;
export type ReadBudgetInput = TypeOf<typeof getBudgetSchema>;
export type DeleteBudgetInput = TypeOf<typeof deleteBudgetSchema>;
