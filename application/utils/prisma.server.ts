import "dotenv/config";
import { PrismaClient } from "~/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { singleton } from "~/utils/singleton.server";

const prismaServer = singleton(
  "prisma",
  () =>
    new PrismaClient({
      adapter: new PrismaBetterSqlite3({ url: `${process.env.DATABASE_URL}` }),
    }),
);

export default prismaServer;
