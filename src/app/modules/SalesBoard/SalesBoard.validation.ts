import { z } from "zod";

const CreateSalesBoardSchema = z.object({
  description: z.string().min(1, "Description is required"),
  price: z.number().nonnegative("Price must be a non-negative number"),
  quantity: z
    .number()
    .int()
    .nonnegative("Quantity must be a non-negative integer"),
});

const UpdateSalesBoardSchema = z.object({
  description: z.string().min(1, "Description is required").optional(),
  price: z
    .number()
    .nonnegative("Price must be a non-negative number")
    .optional(),
  quantity: z
    .number()
    .int()
    .nonnegative("Quantity must be a non-negative integer")
    .optional(),
});

export const SalesBoardValidation = {
  CreateSalesBoardSchema,
  UpdateSalesBoardSchema,
};
