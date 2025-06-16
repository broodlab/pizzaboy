import prisma from "~/utils/prisma";
import {
  ingredientSchema,
  nameSchema,
} from "~/features/ingredients/common/schemas/index";

export const ingredientServerSchema = ingredientSchema.extend({
  name: nameSchema.refine(async (name) => {
    const sameNameCount = await prisma.ingredient.count({
      where: { name },
    });
    return sameNameCount === 0;
  }, "Unique"),
});
