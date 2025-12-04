import { PrismaClient } from "../generated/client";

export const seedPizzaboyUser = async (prisma: PrismaClient) => {
  return await prisma.user.create({
    data: {
      name: "pizzaboy",
      role: "System",
    },
  });
};
