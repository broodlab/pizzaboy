import "dotenv/config";
import { PrismaClient } from "~/prisma/client";
import { cleanup } from "./cleanup";
import { seedPizzaboyUser } from "./seed-pizzaboy-user";
import { seedIngredients } from "./seed-ingredients";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { seedSizes } from "./seed-sizes";

const adapter = new PrismaBetterSqlite3({ url: `${process.env.DATABASE_URL}` });
const prisma = new PrismaClient({ adapter });

const seed = async () => {
  console.log("🌱 Seeding...");
  console.time("🌱 Database has been seeded");

  await cleanup(prisma);
  const pizzaboy = await seedPizzaboyUser(prisma);
  await seedIngredients(prisma, pizzaboy);
  await seedSizes(prisma, pizzaboy);

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
