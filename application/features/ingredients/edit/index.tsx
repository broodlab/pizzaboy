import type { Route } from "./+types";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import prisma from "~/utils/prisma";
import { data, redirect } from "react-router";
import {
  ingredientNameSchema,
  ingredientSchema,
} from "~/features/ingredients/common/schemas";
import { IngredientForm } from "~/features/ingredients/common/components/ingredient-form";
import type { EntityData } from "~/types/entities";
import { enhanceWithEditionSuccessSearchParams } from "~/utils/notifications";
import { Page, PageHeader, PageIntro, PageTitle } from "~/components/page";

export const action = async ({ params: { id }, request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const submission = await parseWithZod(formData, {
    async: true,
    schema: ingredientSchema.extend({
      name: ingredientNameSchema.refine(async (name) => {
        const sameNameCount = await prisma.ingredient.count({
          where: {
            AND: [
              {
                id: {
                  not: id,
                },
              },
              { name },
            ],
          },
        });
        return sameNameCount === 0;
      }, "Unique"),
    }),
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  if (submission.status === "success") {
    const { category, description, name } = submission.value;
    await prisma.ingredient.update({
      data: {
        category,
        description,
        name,
      },
      where: {
        id,
      },
    });

    const searchParams = enhanceWithEditionSuccessSearchParams(
      id,
      name,
      new URL(request.url).searchParams,
    );
    return redirect(`/ingredients?${searchParams.toString()}`);
  }
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

  return ingredient;
};

export default function EditIngredient({
  actionData,
  loaderData: { name, description, category },
}: Route.ComponentProps) {
  const formConfig = useForm({
    defaultValue: {
      category,
      description,
      name,
    },
    lastResult: actionData,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ingredientSchema });
    },
    shouldValidate: "onBlur",
  });

  return (
    <Page>
      <PageHeader>
        <PageTitle>Edit Ingredient</PageTitle>
        <PageIntro>
          Use an unique name and assign a suitable category. A description is
          optional, but might be useful for exotic ingredients.
        </PageIntro>
      </PageHeader>
      <IngredientForm formConfig={formConfig} />
    </Page>
  );
}
