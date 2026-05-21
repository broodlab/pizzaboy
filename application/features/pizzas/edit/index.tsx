import type { Route } from "./+types";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import prisma from "~/utils/prisma.server";
import { data, redirect } from "react-router";
import { PizzaForm } from "~/features/pizzas/common/components/pizza-form";
import type { EntityData } from "~/types/entities";
import { Page, PageHeader, PageIntro, PageTitle } from "~/components/page";
import { enhanceWithEditionSuccessSearchParams } from "~/utils/notifications";
import { pizzaSchema } from "~/features/pizzas/common/schemas";

export const action = async ({ params: { id }, request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const submission = await parseWithZod(formData, {
    async: true,
    schema: pizzaSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  if (submission.status === "success") {
    const { description, name, recipeItems } = submission.value;

    await prisma.pizza.update({
      data: {
        description,
        name,
        recipeItems: {
          create: recipeItems.map(({ ingredientId, quantity }, index) => ({
            index,
            ingredient: { connect: { id: ingredientId } },
            quantity,
          })),
          deleteMany: {},
        },
      },
      where: { id },
    });

    const searchParams = enhanceWithEditionSuccessSearchParams(
      id,
      name,
      new URL(request.url).searchParams,
    );
    return redirect(`/pizzas?${searchParams.toString()}`);
  }
};

export const loader = async ({ params: { id } }: Route.LoaderArgs) => {
  const [pizza, ingredients] = await Promise.all([
    prisma.pizza.findFirst({
      select: {
        description: true,
        name: true,
        recipeItems: {
          orderBy: { index: "asc" },
          select: {
            index: true,
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

  if (pizza === null) {
    throw data({ entity: "pizza" } satisfies EntityData, {
      status: 404,
    });
  }

  return {
    pizza,
    ingredients,
  };
};

export default function EditPizza({
  actionData,
  loaderData: { pizza, ingredients },
}: Route.ComponentProps) {
  const { description, name, recipeItems } = pizza;

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
      parseWithZod(formData, { schema: pizzaSchema }),
    shouldValidate: "onBlur",
  });

  return (
    <Page>
      <PageHeader>
        <PageTitle>Edit Pizza</PageTitle>
        <PageIntro>A pizza is an integral part of a pizza.</PageIntro>
      </PageHeader>
      <PizzaForm formConfig={formConfig} ingredients={ingredients} />
    </Page>
  );
}
