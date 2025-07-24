import { z } from "zod";

export const addressSchema = z.object({
  user: z
    .string({
      error: "User selection is required.",
    })
    .min(1, { message: "Please select a user." }),

  address: z
    .string({
      error: "Address is required.",
    })
    .trim()
    .min(5, { message: "Address must be at least 5 characters long." })
    .max(255, { message: "Address must not exceed 255 characters." }),

  city: z
    .string({
      error: "City is required.",
    })
    .trim()
    .min(2, { message: "City name must be at least 2 characters long." })
    .max(100, { message: "City name must not exceed 100 characters." }),

  state: z
    .string({
      error: "State is required.",
    })
    .trim()
    .min(2, { message: "State name must be at least 2 characters long." })
    .max(100, { message: "State name must not exceed 100 characters." }),

  country: z
    .string({
      error: "Country is required.",
    })
    .trim()
    .min(2, { message: "Country name must be at least 2 characters long." })
    .max(100, { message: "Country name must not exceed 100 characters." }),

  zipcode: z
    .string({
      error: "Zipcode is required.",
    })
    .trim()
    .length(6, { message: "Zipcode must be exactly 6 digits." })
    .regex(/^\d+$/, { message: "Zipcode must contain only digits." }),
});

export type AddressData = z.infer<typeof addressSchema>;
