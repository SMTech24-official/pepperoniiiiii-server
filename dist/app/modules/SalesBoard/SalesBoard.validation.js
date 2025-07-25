"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesBoardValidation = void 0;
const zod_1 = require("zod");
const CreateSalesBoardSchema = zod_1.z.object({
    description: zod_1.z.string().min(1, "Description is required"),
    price: zod_1.z.number().nonnegative("Price must be a non-negative number"),
    quantity: zod_1.z
        .number()
        .int()
        .nonnegative("Quantity must be a non-negative integer"),
});
const UpdateSalesBoardSchema = zod_1.z.object({
    description: zod_1.z.string().min(1, "Description is required").optional(),
    price: zod_1.z
        .number()
        .nonnegative("Price must be a non-negative number")
        .optional(),
    quantity: zod_1.z
        .number()
        .int()
        .nonnegative("Quantity must be a non-negative integer")
        .optional(),
});
exports.SalesBoardValidation = {
    CreateSalesBoardSchema,
    UpdateSalesBoardSchema,
};
