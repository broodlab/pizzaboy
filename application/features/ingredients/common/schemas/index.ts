import { z } from "zod/v4";
import { foodCategories } from "~/types/food-categories";
import { descriptionMaxLength, nameMaxLength } from "~/configs/schema-rules";

export const ingredientNameSchema = z.string().max(nameMaxLength);

export const ingredientSchema = z.object({
  category: z
    .union(foodCategories.map((foodCategory) => z.literal(foodCategory)))
    .optional(),
  description: z.string().max(descriptionMaxLength).optional(),
  name: ingredientNameSchema,
});
