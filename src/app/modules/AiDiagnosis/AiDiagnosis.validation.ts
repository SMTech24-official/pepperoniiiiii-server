import { z } from "zod";

const CreateAiDiagnosisSchema = z.object({
  problemCount: z.number().int().nonnegative("Problem count must be zero or more"),
  description: z.array(z.string().min(1, "Each description must be a non-empty string")),
});



export const AiDiagnosisValidation = {
  CreateAiDiagnosisSchema,
};
