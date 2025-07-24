import { z } from "zod";

const CreateForumSchema = z.object({
  description: z.string().min(1, "Description is required"),
});

const UpdateForumSchema = z.object({
  description: z.string().min(1, "Description is required").optional(),
});

export const ForumValidation = {
  CreateForumSchema,
  UpdateForumSchema,
};
