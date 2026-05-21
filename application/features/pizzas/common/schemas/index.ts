import { z } from "zod/v4";
import { descriptionMaxLength, nameMaxLength } from "~/configs/schema-rules";
import { recipeItemsSchema } from "~/types/schemas";

export const pizzaNameSchema = z.string().max(nameMaxLength);

export const pizzaSchema = z.object({
  description: z.string().max(descriptionMaxLength).optional(),
  name: pizzaNameSchema,
  recipeItems: recipeItemsSchema,
});
