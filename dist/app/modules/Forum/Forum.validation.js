"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumValidation = void 0;
const zod_1 = require("zod");
const CreateForumSchema = zod_1.z.object({
    description: zod_1.z.string().min(1, "Description is required"),
});
const UpdateForumSchema = zod_1.z.object({
    description: zod_1.z.string().min(1, "Description is required").optional(),
});
exports.ForumValidation = {
    CreateForumSchema,
    UpdateForumSchema,
};
