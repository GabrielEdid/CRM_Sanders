import { object, string, TypeOf, z } from "zod";

export const createArticleSchema = object({
  body: object({
    title: string({
      required_error: "El título del artículo es requerido",
    }).min(3, "El título del artículo tiene que tener al menos 3 caracteres"),
    body: string({
      required_error: "La contraseña es requerida",
    }).min(6, "El cuerpo del artículo tiene que tener al menos 6 caracteres"),
    readMoreUrl: string({
      required_error: "El enlace de leer más es obligatorio",
    }),
  }),
});

export type CreateArticleInput = Omit<
  TypeOf<typeof createArticleSchema>,
  "body.passwordConfirmation"
>;
