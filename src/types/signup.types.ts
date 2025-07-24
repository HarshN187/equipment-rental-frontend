import { z } from "zod";

export const SignupSchema = z
  .object({
    name: z.string({ message: "enter your name" }),
    email: z.string().email(),
    phone: z
      .string()
      .min(10, { message: "Num is too short" })
      .max(13, { message: "Num is too long" }),
    password: z
      .string()
      .min(3, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupData = z.infer<typeof SignupSchema>;
