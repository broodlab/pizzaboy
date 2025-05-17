import { PrismaClient } from "@prisma/client";

export const cleanup = async (prisma: PrismaClient) => {
  console.time("🧹 Cleaned up the database...");

  await prisma.user.deleteMany();

  console.timeEnd("🧹 Cleaned up the database...");
};
