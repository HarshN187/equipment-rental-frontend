import { z } from "zod"; // Add new import

export const userSchema = z.object({
  user_id: z.string().optional(),
  name: z.string().trim().min(2, { message: "please enter name" }),
  email: z.string().email(),
  phone: z
    .string()
    .min(10, { message: "Num is too short" })
    .max(13, { message: "Num is too long" }),
});

export type UserData = z.infer<typeof userSchema>;
