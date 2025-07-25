"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartValidation = void 0;
const zod_1 = require("zod");
const CreateCartSchema = zod_1.z.object({
    productId: zod_1.z.string(),
});
exports.CartValidation = {
    CreateCartSchema,
};
