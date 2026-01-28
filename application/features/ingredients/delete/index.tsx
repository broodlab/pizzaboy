import { data, Form, Link, redirect } from "react-router";
import type { Route } from "./+types";
import prisma from "~/utils/prisma.server";
import type { EntityData } from "~/types/entities";
import { Button } from "~/components/button";
import { backNavigationIntent } from "~/types";
import { enhanceWithDeletionSuccessSearchParams } from "~/utils/notifications";
import { Page, PageHeader, PageIntro, PageTitle } from "~/components/page";

export const action = async ({ params: { id }, request }: Route.ActionArgs) => {
  await prisma.ingredient.delete({
    where: { id },
  });

  const searchParams = enhanceWithDeletionSuccessSearchParams(
    id,
    new URL(request.url).searchParams,
  );
  return redirect(`/ingredients?${searchParams.toString()}`);
};

export const loader = async ({ params: { id } }: Route.LoaderArgs) => {
  const ingredient = await prisma.ingredient.findFirst({
    select: { name: true },
    where: { id },
  });

  if (ingredient === null) {
    throw data({ entity: "ingredient" } satisfies EntityData, {
      status: 404,
    });
  }

  return ingredient;
};

export default function DeleteIngredient({
  loaderData: { name },
}: Route.ComponentProps) {
  return (
    <Page>
      <PageHeader>
        <PageTitle>Delete Ingredient</PageTitle>
        <PageIntro>
          Are you sure you want to delete ingredient{" "}
          <span className="font-bold">{name}</span>? This action cannot be
          undone.
        </PageIntro>
      </PageHeader>
      <Form method="post">
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="destructive">Delete</Button>
          <Button asChild variant="outline">
            <Link state={{ ...backNavigationIntent }} to="/ingredients">
              Cancel
            </Link>
          </Button>
        </div>
      </Form>
    </Page>
  );
}
