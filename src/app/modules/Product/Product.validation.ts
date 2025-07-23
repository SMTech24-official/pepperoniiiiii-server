import { ProductCategory } from "@prisma/client";
import { nativeEnum, z } from "zod";

const CreateProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().positive("Price is required"),
  description: z.string().min(1, "Description is required"),
  weight: z.number().positive("Weight must be positive"),
  category: nativeEnum(ProductCategory),
  stock: z.number().int().nonnegative().optional(),
});

const ProductUpdateSchema = z.object({
  name: z.string().min(1, "Product name is required").optional(),
  price: z.number().positive("Price is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  weight: z.number().positive("Weight must be positive").optional(),
  category: nativeEnum(ProductCategory).optional(),
  stock: z.number().int().nonnegative().optional(),
});

export const ProductValidation = {
  CreateProductSchema,
  ProductUpdateSchema,
};
