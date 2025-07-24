import { z } from "zod";

const CreateNewsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

const UpdateNewsSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
});

export const NewsValidation = {
  CreateNewsSchema,
  UpdateNewsSchema,
};
