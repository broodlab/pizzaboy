import { PrismaClient, type User } from "~/prisma/client";

export const seedSizes = async (prisma: PrismaClient, pizzaboy: User) => {
  await prisma.size.create({
    data: {
      name: "Default",
      user: {
        connect: pizzaboy,
      },
    },
  });
};
