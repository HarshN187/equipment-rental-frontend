import { z } from "zod";

export const rentalSchema = z
  .object({
    id: z.number().optional(),
    user: z.number({ message: "please select user" }),
    equipment: z.number({ message: "please select equipment" }),
    quantity: z
      .number({
        error: "Quantity is required",
      })
      .min(1, { message: "Quantity must be at least 1" }),
    start_date: z.string({}),
    end_date: z.string({}),
    payment_status: z
      .string({ error: "Payment status is required" })
      .min(1, { message: "Payment status cannot be empty" }),
  })
  .refine((data) => data.start_date < data.end_date, {
    message: "End date must be after start date",
    path: ["end_date"],
  });

export type RentalData = z.infer<typeof rentalSchema>;
