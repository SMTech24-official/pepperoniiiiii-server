"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseProductValidation = void 0;
const zod_1 = require("zod");
const CreatePurchaseProductSchema = zod_1.z.object({
    quantity: zod_1.z.number().int().min(1, "Quantity must be at least 1"),
    name: zod_1.z.string().min(1, "Name is required"),
    phoneNumber: zod_1.z.string().min(10, "Phone number is required"),
    deliveryAddress: zod_1.z.string().min(1, "Delivery address is required"),
    paymentId: zod_1.z.string().min(1, "Payment ID is required"),
    productId: zod_1.z.string(),
});
exports.PurchaseProductValidation = {
    CreatePurchaseProductSchema,
};
