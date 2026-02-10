import { z } from "zod/v4";

export const recipeItemSchema = z.object({
  ingredientId: z.string(),
  quantity: z.string(),
});

export const recipeItemsSchema = z.array(recipeItemSchema);
