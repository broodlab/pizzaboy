import { PrismaClient } from "@prisma/client";
import { cleanup } from "./cleanup";
import { seedPizzaboyUser } from "./seed-pizzaboy-user";
import { seedIngredients } from "./seed-ingredients";

const prisma = new PrismaClient();

const seed = async () => {
  console.log("🌱 Seeding...");
  console.time("🌱 Database has been seeded");

  await cleanup(prisma);
  const pizzaboy = await seedPizzaboyUser(prisma);
  await seedIngredients(prisma, pizzaboy);

  console.timeEnd("🌱 Database has been seeded");
};

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
