import { z } from "zod";

export const schema = z
  .object({
    name: z
      .string()
      .min(3, "O nome é obrigatório e precisa conter pelo menos 3 caracteres."),
    email: z
      .string()
      .nonempty("O e-mail é obrigatório")
      .email("Digite um e-mail válido"),
    password: z
      .string()
      .min(7, "A senha precisa conter pelo menos 7 caracteres")
      .regex(
        /(?=.*?[#?!@$%^&*-])/,
        "É necessário pelo menos um caracter especial"
      )
      .regex(/(?=.*?[A-Z])/, "É necessário pelo menos uma letra maiúscula")
      .regex(/(?=.*?[a-z])/, "É necessário pelo menos uma letra minúscula")
      .regex(/(?=.*?[0-9])/, "É necessário pelo menos um número "),
    confirm: z.string().nonempty("É obrigatório confirmar a senha"),
  })
  .refine(({ password, confirm }) => password === confirm, {
    message: "A confirmação de senha precisa corresponder com a senha.",
    path: ["confirm"],
  });

export type TRegisterFormValues = z.infer<typeof schema>;
