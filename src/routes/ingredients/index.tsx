import type { Route } from "./+types/";
import { PrismaClient } from "@prisma/client";

export const loader = async () => {
  const prisma = new PrismaClient();
  return await prisma.ingredient.findMany();
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
