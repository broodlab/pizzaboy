import type { Route } from "./+types/";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import prisma from "~/utils/prisma";
import { redirect } from "react-router";

import {
  ingredientNameSchema,
  ingredientSchema,
} from "~/features/ingredients/common/schemas";
import { IngredientForm } from "~/features/ingredients/common/components/ingredient-form";
import { enhanceWithSuccessSearchParams } from "~/utils/alerts";

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const submission = await parseWithZod(formData, {
    async: true,
    schema: ingredientSchema.extend({
      name: ingredientNameSchema.refine(async (name) => {
        const sameNameCount = await prisma.ingredient.count({
          where: { name },
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

    const { id } = await prisma.ingredient.create({
      data: {
        category,
        description,
        name,
        user: {
          connect: {
            name: "pizzaboy",
          },
        },
      },
    });

    const searchParams = enhanceWithSuccessSearchParams(id, name);
    return redirect(`/ingredients?${searchParams.toString()}`);
  }
};

export default function CreateIngredient({ actionData }: Route.ComponentProps) {
  const formConfig = useForm({
    lastResult: actionData,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ingredientSchema });
    },
    shouldValidate: "onBlur",
  });

  return <IngredientForm formConfig={formConfig} />;
}
