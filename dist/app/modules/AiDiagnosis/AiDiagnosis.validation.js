"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiDiagnosisValidation = void 0;
const zod_1 = require("zod");
const CreateAiDiagnosisSchema = zod_1.z.object({
    problemCount: zod_1.z.number().int().nonnegative("Problem count must be zero or more"),
    description: zod_1.z.array(zod_1.z.string().min(1, "Each description must be a non-empty string")),
});
exports.AiDiagnosisValidation = {
    CreateAiDiagnosisSchema,
};
