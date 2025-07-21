import { z, ZodType } from "zod"; // Add new import

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(1, { message: "Password is too short" })
    .max(20, { message: "Password is too long" }),
});

export type LoginData = z.infer<typeof LoginSchema>;
