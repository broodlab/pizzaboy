import { z } from "zod/v4";
import { descriptionMaxLength, nameMaxLength } from "~/configs/schema-rules";

export const sizeSchema = z.object({
  description: z.string().max(descriptionMaxLength).optional(),
  name: z.string().max(nameMaxLength),
});

export const sizesSchema = z.object({
  sizes: z.array(sizeSchema),
});
