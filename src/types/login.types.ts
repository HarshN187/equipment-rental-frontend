import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string({})
    .trim()
    .email({ message: "Please enter a valid email address." }),

  password: z
    .string({})
    .trim()
    .min(1, { message: "Password must be at least 8 characters long." })
    .max(50, { message: "Password must not exceed 50 characters." }),
  // also consider adding more complex regex validations here
  // .regex(/\d/, { message: "Password must contain at least one number." })
  // .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character." })
});

export type LoginData = z.infer<typeof LoginSchema>;
