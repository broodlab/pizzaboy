import prisma from "~/utils/prisma";
import type { Route } from "./+types";

export const loader = () => {
  return prisma.dough.findMany({});
};

export default function Doughs({ loaderData }: Route.ComponentProps) {
  return (
    <ul>
      {loaderData.map(({ name }) => (
        <li>{name}</li>
      ))}
    </ul>
  );
}
