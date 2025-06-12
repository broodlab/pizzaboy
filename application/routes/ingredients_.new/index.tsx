import type { Route } from "./+types/";
import {
  getFormProps,
  getInputProps,
  getSelectProps,
  getTextareaProps,
  useForm,
} from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import prisma from "~/utils/prisma";
import { Form, redirect } from "react-router";
import { foodCategories } from "~/types/food-categories";
import { z } from "zod/v4";
import { descriptionMaxLength, nameMaxLength } from "~/configs/schema-rules";
import { Input } from "~/components/form-fields/input";
import { Select } from "~/components/form-fields/select";
import { Textarea } from "~/components/form-fields/textarea";
import { Label } from "~/components/label";

const ingredientSchema = z.object({
  category: z
    .union(foodCategories.map((foodCategory) => z.literal(foodCategory)))
    .optional(),
  description: z.string().max(descriptionMaxLength).optional(),
  name: z.string().max(nameMaxLength),
});

const ingredientServerSchema = ingredientSchema.refine(async ({ name }) => {
  const sameNameCount = await prisma.ingredient.count({
    where: { name },
  });
  return sameNameCount === 0;
}, "Unique");

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const submission = await parseWithZod(formData, {
    async: true,
    schema: ingredientServerSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  if (submission.status === "success") {
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
  }

  return redirect("/ingredients");
};

export default function IngredientCreation({
  actionData,
}: Route.ComponentProps) {
  const [form, fields] = useForm({
    lastResult: actionData,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ingredientSchema });
    },
    shouldValidate: "onBlur",
  });

  return (
    <Form {...getFormProps(form)} method="post" onSubmit={form.onSubmit}>
      <div>{form.errors}</div>
      <div>
        <Label htmlFor={fields.name.id}>Name</Label>
        <Input {...getInputProps(fields.name, { type: "text" })} autoFocus />
        <div id={fields.name.errorId}>{fields.name.errors}</div>
      </div>
      <div>
        <Label htmlFor={fields.category.id}>Category</Label>
        <Select {...getSelectProps(fields.category)}>
          {foodCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
        <div id={fields.category.errorId}>{fields.category.errors}</div>
      </div>
      <div>
        <Label htmlFor={fields.description.id}>Description</Label>
        <Textarea {...getTextareaProps(fields.description)} />
        <div id={fields.description.errorId}>{fields.description.errors}</div>
      </div>
      <button type="submit">Save</button>
    </Form>
  );
}
