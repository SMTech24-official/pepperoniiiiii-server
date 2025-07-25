"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const CreateProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Product name is required"),
    price: zod_1.z.number().positive("Price is required"),
    description: zod_1.z.string().min(1, "Description is required"),
    weight: zod_1.z.number().positive("Weight must be positive"),
    category: (0, zod_1.nativeEnum)(client_1.ProductCategory),
    stock: zod_1.z.number().int().nonnegative().optional(),
});
const ProductUpdateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Product name is required").optional(),
    price: zod_1.z.number().positive("Price is required").optional(),
    description: zod_1.z.string().min(1, "Description is required").optional(),
    weight: zod_1.z.number().positive("Weight must be positive").optional(),
    category: (0, zod_1.nativeEnum)(client_1.ProductCategory).optional(),
    stock: zod_1.z.number().int().nonnegative().optional(),
});
exports.ProductValidation = {
    CreateProductSchema,
    ProductUpdateSchema,
};
