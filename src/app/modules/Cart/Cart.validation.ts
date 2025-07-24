import { z } from "zod";

const CreateCartSchema = z.object({
  productId: z.string(),
});

export const CartValidation = {
  CreateCartSchema,
};
