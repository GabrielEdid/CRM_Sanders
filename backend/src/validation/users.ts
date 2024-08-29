import { object, string, TypeOf, z } from "zod";

export const createUserSchema = object({
  body: object({
    username: string({
      required_error: "El nombre de usuario es requerido",
    }).min(1, "El nombre de usuario tiene que tener al menos 1 caracter"),
    password: string({
      required_error: "La contraseña es requerida",
    }).min(6, "La contraseña es muy corta, debe tener al menos 6 caracteres"),
    passwordConfirmation: string({
      required_error: "Confirmación de password es requerida",
    }),
    email: string({
      required_error: "El correo es requerido",
    }).email("El correo no es válido"),
    role: z.enum(["usuario", "admin"]).default("usuario"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Las contraseñas no coinciden",
    path: ["passwordConfirmation"],
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;
