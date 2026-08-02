import {z} from "zod";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().positive("Price must be a positive number"),
  subcategory: z.string().min(1, "Subcategory is required"),
});

export { productSchema };