import type { Route } from "./+types/";
import prisma from "~/utils/prisma";
import { Link } from "react-router";

export const loader = () => {
  return prisma.ingredient.findMany();
};

export default function Ingredients({ loaderData }: Route.ComponentProps) {
  return (
    <ul>
      {loaderData.map(({ category, id, name }) => (
        <li key={id}>
          <span>
            {name} ({category})
          </span>
          <span>&nbsp;</span>
          <Link to={`${id}/edit`} relative="route">
            Edit
          </Link>
          <span>&nbsp;</span>
          <Link to={`${id}/delete`} relative="route">
            Delete
          </Link>
        </li>
      ))}
    </ul>
  );
}
