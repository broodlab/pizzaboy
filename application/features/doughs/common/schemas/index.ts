import { z } from "zod/v4";
import { descriptionMaxLength, nameMaxLength } from "~/configs/schema-rules";
import { recipeItemsSchema } from "~/types/schemas";

export const doughNameSchema = z.string().max(nameMaxLength);

export const doughSchema = z.object({
  description: z.string().max(descriptionMaxLength).optional(),
  name: doughNameSchema,
  recipeItems: recipeItemsSchema,
});
