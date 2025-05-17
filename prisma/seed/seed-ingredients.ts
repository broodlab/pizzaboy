import { faker } from "@faker-js/faker";
import { PrismaClient, User } from "@prisma/client";

export const seedIngredients = async (prisma: PrismaClient, pizzaboy: User) => {
  await Promise.all(
    Array.from({ length: 50 }, () =>
      prisma.ingredient.create({
        data: {
          name: faker.food.ingredient(),
          user: {
            connect: pizzaboy,
          },
        },
      }),
    ),
  );
};
