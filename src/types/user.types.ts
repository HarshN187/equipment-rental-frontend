import { z } from "zod";

export const userSchema = z.object({
  user_id: z.string().optional(),

  name: z
    .string({})
    .trim()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(100, { message: "Name must not exceed 100 characters." })
    .regex(/^[a-zA-Z\s.'-]+$/, {
      message:
        "Name can only contain letters, spaces, apostrophes, and hyphens.",
    }),

  email: z
    .string({})
    .trim()
    .email({ message: "Please enter a valid email address." }),

  phone: z
    .string({})
    .trim()
    .regex(/^\+?[1-9]\d{9,14}$/, {
      message:
        "Please enter a valid phone number (e.g., +919876543210 or 9876543210).",
    }),
});

export type UserData = z.infer<typeof userSchema>;
