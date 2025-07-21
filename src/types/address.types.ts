import { z, ZodType } from "zod"; // Add new import

export const addressSchema = z.object({
  user: z.string({ message: "please select user" }),
  address: z.string().trim().min(5, { message: "please enter name" }),
  city: z.string().min(3, { message: "please select city" }),
  state: z.string().min(5, { message: "please select state" }),
  country: z.string().min(5, { message: "please select country" }),
  zipcode: z.string().length(6, { message: "please select valid zipcode" }),
});

export type AddressData = z.infer<typeof addressSchema>;
