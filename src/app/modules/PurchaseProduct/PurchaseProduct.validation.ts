import { z } from "zod";

const CreatePurchaseProductSchema = z.object({
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  totalPrice: z.number().int().min(1, "price must be at least 1"),
  name: z.string().min(1, "Name is required"),
  phoneNumber: z.string().min(10, "Phone number is required"),
  deliveryAddress: z.string().min(1, "Delivery address is required"),
  paymentId: z.string().min(1, "Payment ID is required"),
  productId: z.string(),
});

const UpdateOrderStatusSchema = z.object({
  status: z.enum(["PENDING", "PROCESSING", "COMPLETED", "CANCELLED"]),
});

export const PurchaseProductValidation = {
  CreatePurchaseProductSchema,
  UpdateOrderStatusSchema,
};
