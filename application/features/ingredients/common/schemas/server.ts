import prisma from "~/utils/prisma";
import {
  ingredientSchema,
  nameSchema,
} from "~/features/ingredients/common/schemas/index";

export const ingredientCreationServerSchema = ingredientSchema.extend({
  name: nameSchema.refine(async (name) => {
    const sameNameCount = await prisma.ingredient.count({
      where: { name },
    });
    return sameNameCount === 0;
  }, "Unique"),
});

export const createIngredientEditionServerSchema = (id: string) =>
  ingredientSchema.extend({}).refine(async ({ name }) => {
    const sameNameCount = await prisma.ingredient.count({
      where: {
        AND: [
          {
            id: {
              not: id,
            },
          },
          { name },
        ],
      },
    });
    return sameNameCount === 0;
  }, "Unique");
