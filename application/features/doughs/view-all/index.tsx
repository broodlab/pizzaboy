import prisma from "~/utils/prisma.server";
import type { Route } from "./+types";
import { Link } from "react-router";

export const loader = () => {
  return prisma.dough.findMany({});
};

export default function Doughs({ loaderData }: Route.ComponentProps) {
  return (
    <ul>
      {loaderData.map(({ id, name }) => (
        <li>
          {name} <Link to={`${id}/edit`}>Edit</Link>
        </li>
      ))}
    </ul>
  );
}
