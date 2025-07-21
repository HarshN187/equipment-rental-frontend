import { z } from "zod"; // Add new import

export const equipmentSchema = z.object({
  name: z.string({ message: "please enter name" }),
  description: z.string().trim().min(5, { message: "please enter name" }),
  rent_per_day: z.number(),
  total_quntity: z.number(),
  category: z.string(),
});

export type EquipmentData = z.infer<typeof equipmentSchema>;
