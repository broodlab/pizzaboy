import { data, Form, Link, redirect } from "react-router";
import type { Route } from "./+types/";
import prisma from "~/utils/prisma";
import type { EntityData } from "~/types/entities";

export const action = async ({ params: { id } }: Route.ActionArgs) => {
  await prisma.ingredient.delete({
    where: { id },
  });

  return redirect("/ingredients");
};

export const loader = async ({ params: { id } }: Route.LoaderArgs) => {
  const ingredient = await prisma.ingredient.findFirst({
    where: { id },
  });
  if (ingredient === null) {
    throw data({ entity: "ingredient" } satisfies EntityData, {
      status: 404,
    });
  }
};

export default function DeleteIngredient() {
  return (
    <>
      <Link to="/ingredients" relative="route">
        Back
      </Link>
      <Form method="post">
        <button type="submit">Delete</button>
      </Form>
    </>
  );
}
