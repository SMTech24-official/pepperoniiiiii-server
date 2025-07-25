"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsValidation = void 0;
const zod_1 = require("zod");
const CreateNewsSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    description: zod_1.z.string().min(1, "Description is required"),
});
const UpdateNewsSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required").optional(),
    description: zod_1.z.string().min(1, "Description is required").optional(),
});
exports.NewsValidation = {
    CreateNewsSchema,
    UpdateNewsSchema,
};
