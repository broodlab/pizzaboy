import type { Route } from "./+types/";
import { PrismaClient } from "@prisma/client";
import prisma from "~/utils/prisma";

export const loader = () => {
  return prisma.ingredient.findMany();
};

export default function Ingredients({ loaderData }: Route.ComponentProps) {
  return (
    <ul>
      {loaderData.map(({ category, id, name }) => (
        <li key={id}>
          {name} ({category})
        </li>
      ))}
    </ul>
  );
}
