import { z } from "zod";
import type { Route } from "./+types/";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import prisma from "~/utils/prisma";
import { data, redirect } from "react-router";
import { foodCategories } from "~/types/food-categories";

const ingredientSchema = z.object({
  category: z.string().optional(),
  description: z.string().optional(),
  name: z.string().refine(async (name) => {
    const count = await prisma.ingredient.count({
      where: { name },
    });
    return count === 0;
  }, "Unique"),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const submission = await parseWithZod(formData, {
    async: true,
    schema: ingredientSchema,
  });

  if (submission.value === undefined) {
    return data({ submission } as const, {
      status: 400,
    });
  }

  const { category, description, name } = submission.value;
  await prisma.ingredient.create({
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

  return redirect("/ingredients");
};

export default function IngredientCreation({
  actionData,
}: Route.ComponentProps) {
  const [form, fields] = useForm({
    lastResult: actionData?.submission,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ingredientSchema });
    },
    shouldValidate: "onBlur",
  });

  return (
    <form id={form.id} method="post" onSubmit={form.onSubmit}>
      <div>{form.errors}</div>
      <div>
        <label>Name</label>
        <input
          className="border-1 border-gray-200"
          name={fields.name.name}
          type="text"
        />
        <div>{fields.name.errors}</div>
      </div>
      <div>
        <label>Category</label>
        <select id={fields.category.id} name={fields.category.name}>
          {foodCategories.map((category) => (
            <option value={category}>{category}</option>
          ))}
        </select>
        <div>{fields.category.errors}</div>
      </div>
      <div>
        <label>Description</label>
        <textarea
          className="border-1 border-gray-200"
          name={fields.description.name}
        />
        <div>{fields.description.errors}</div>
      </div>
      <button type="submit">Save</button>
    </form>
  );
}