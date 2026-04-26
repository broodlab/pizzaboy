import { Page, PageHeader, PageIntro, PageTitle } from "~/components/page";
import { redirect } from "react-router";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { doughSchema } from "~/features/doughs/common/schemas";
import { DoughForm } from "~/features/doughs/common/components/dough-form";
import type { Route } from "./+types";
import prisma from "~/utils/prisma.server";

export const action = async ({ request }: Route.ActionArgs) => {
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

    const { id } = await prisma.dough.create({
      data: {
        description,
        name,
        recipeItems: {
          create: recipeItems.map(({ ingredientId, quantity }) => ({
            ingredient: { connect: { id: ingredientId } },
            quantity,
          })),
        },
        user: {
          connect: {
            name: "pizzaboy",
          },
        },
      },
    });

    return redirect("/doughs");
  }
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  return prisma.ingredient.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });
};

export default function CreateDough({
  actionData,
  loaderData: ingredients,
}: Route.ComponentProps) {
  const formConfig = useForm({
    lastResult: actionData,
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: doughSchema }),
    shouldValidate: "onBlur",
  });

  return (
    <Page>
      <PageHeader>
        <PageTitle>Create Dough</PageTitle>
        <PageIntro>A dough is an integral part of a pizza.</PageIntro>
      </PageHeader>
      <DoughForm formConfig={formConfig} ingredients={ingredients} />
    </Page>
  );
}
