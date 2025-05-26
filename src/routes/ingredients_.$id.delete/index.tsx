import { Link, redirect } from "react-router";
import type { Route } from "./+types/";
import prisma from "~/utils/prisma";

export const action = async ({ params: { id } }: Route.ActionArgs) => {
  await prisma.ingredient.delete({
    where: { id },
  });

  return redirect("/ingredients");
};

export default function IngredientsDeletion() {
  return (
    <>
      <Link to="/ingredients" relative="route">
        Back
      </Link>
      <form method="post">
        <button type="submit">Delete</button>
      </form>
    </>
  );
}
