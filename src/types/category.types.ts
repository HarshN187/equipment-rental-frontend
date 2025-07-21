import z from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Category Name is required"),
  description: z.string().optional(), // Description can be optional
});

export type CategoryFormData = z.infer<typeof categorySchema>;
