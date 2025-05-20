import { faker } from "@faker-js/faker";
import { PrismaClient, type User } from "@prisma/client";
import { UniqueEnforcer } from "enforce-unique";

export const seedIngredients = async (prisma: PrismaClient, pizzaboy: User) => {
  const uniqueEnforcer = new UniqueEnforcer();

  await Promise.all(
    Array.from({ length: 50 }, () =>
      prisma.ingredient.create({
        data: {
          name: uniqueEnforcer.enforce(() => faker.food.ingredient()),
          user: {
            connect: pizzaboy,
          },
        },
      }),
    ),
  );
};
