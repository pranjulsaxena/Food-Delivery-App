import { z } from "zod";

export const menuSchema = z.object({
  Name: z.string().min(2, "Name is required"),
  Description: z.string().min(5, "Description is required"),
  Price: z.number().min(1, "Price must be greater than 0"),
  MenuImage: z.union([z.instanceof(File), z.string()]).optional(),
});


export type MenuType = z.infer<typeof menuSchema>;
