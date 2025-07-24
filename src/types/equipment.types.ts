import { z } from "zod";

export const equipmentSchema = z.object({
  e_id: z.number().optional(),

  name: z
    .string({
      error: "Equipment name is required.",
    })
    .trim()
    .min(3, { message: "Equipment name must be at least 3 characters long." })
    .max(100, { message: "Equipment name must not exceed 100 characters." }),

  description: z
    .string({})
    .trim()
    .min(10, { message: "Description must be at least 10 characters long." })
    .max(500, { message: "Description must not exceed 500 characters." }),

  rent_per_day: z
    .number({})
    .min(0.01, { message: "Rent per day must be a positive value." })
    .max(1000000, { message: "Rent per day value is too high." })
    .multipleOf(0.01, {
      message: "Rent per day must be a valid currency amount.",
    }),

  total_quntity: z
    .number({})
    .int({ message: "Total quantity must be a whole number." })
    .min(1, { message: "Total quantity must be at least 1." })
    .max(10000, { message: "Total quantity cannot exceed 10,000." }),

  category: z.union(
    [
      z.string().trim().min(1, "Category cannot be empty."),
      z.number().int().min(1, "Category ID must be a positive integer."),
    ],
    {
      error: "Category is required.",
    }
  ),
});

export type EquipmentData = z.infer<typeof equipmentSchema>;
