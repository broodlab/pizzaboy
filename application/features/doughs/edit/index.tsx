import type { Route } from "./+types";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import prisma from "~/utils/prisma.server";
import { data, redirect } from "react-router";
import { doughSchema } from "~/features/doughs/common/schemas";
import { DoughForm } from "~/features/doughs/common/components/dough-form";
import type { EntityData } from "~/types/entities";
import { Page, PageHeader, PageIntro, PageTitle } from "~/components/page";

export const action = async ({ params: { id }, request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const submission = await parseWithZod(formData, {
    async: true,
    schema: doughSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  if (submission.status === "success") {
    const { description, name, recipeItems } = submission.value;

    await prisma.dough.update({
      data: {
        description,
        name,
        recipeItems: {
          create: recipeItems.map(({ ingredientId, quantity }) => ({
            ingredient: { connect: { id: ingredientId } },
            quantity,
          })),
          deleteMany: {},
        },
      },
      where: { id },
    });

    return redirect("/doughs");
  }
};

export const loader = async ({ params: { id } }: Route.LoaderArgs) => {
  const [dough, ingredients] = await Promise.all([
    prisma.dough.findFirst({
      select: {
        description: true,
        name: true,
        recipeItems: {
          select: {
            ingredientId: true,
            ingredient: {
              select: { id: true, name: true },
            },
            quantity: true,
          },
        },
      },
      where: { id },
    }),
    prisma.ingredient.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  if (dough === null) {
    throw data({ entity: "dough" } satisfies EntityData, {
      status: 404,
    });
  }

  return {
    dough,
    ingredients,
  };
};

export default function EditDough({
  actionData,
  loaderData: { dough, ingredients },
}: Route.ComponentProps) {
  const { description, name, recipeItems } = dough;

  const formConfig = useForm({
    defaultValue: {
      description,
      name,
      recipeItems: recipeItems.map(({ ingredient, quantity }) => ({
        ingredientId: ingredient.id,
        name: ingredient.name,
        quantity,
      })),
    },
    lastResult: actionData,
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: doughSchema }),
    shouldValidate: "onBlur",
  });

  return (
    <Page>
      <PageHeader>
        <PageTitle>Edit Dough</PageTitle>
        <PageIntro>A dough is an integral part of a pizza.</PageIntro>
      </PageHeader>
      <DoughForm formConfig={formConfig} ingredients={ingredients} />
    </Page>
  );
}
