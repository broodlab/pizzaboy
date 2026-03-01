import type { Route } from "./+types";
import {
  getFormProps,
  getInputProps,
  getSelectProps,
  useForm,
} from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { z } from "zod/v4";
import { foodCategories } from "~/types/food-categories";
import { Form, Link, redirect } from "react-router";
import { ErrorList } from "~/components/error-list";
import { Label } from "~/components/label";
import { Input } from "~/components/input";
import { NativeSelect as Select } from "~/components/native-select";
import { Button } from "~/components/button";
import { backNavigationIntent } from "~/types";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/card";
import { useNotificationlessSearchParams } from "~/utils/notifications";

const schema = z.object({
  category: z
    .union(foodCategories.map((foodCategory) => z.literal(foodCategory)))
    .optional(),
  name: z.string().optional(),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const submission = await parseWithZod(formData, {
    schema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const filterSearchParams = new URLSearchParams();

  if (submission.status === "success") {
    const { category, name } = submission.value;
    if (category) filterSearchParams.append("category", category);
    if (name) filterSearchParams.append("name", name);
  }

  return redirect(`/ingredients?${filterSearchParams.toString()}`);
};

export default function FilterIngredients({
  actionData,
}: Route.ComponentProps) {
  const [searchParams] = useNotificationlessSearchParams();
  const [form, fields] = useForm({
    defaultValue: {
      category: searchParams.get("category"),
      name: searchParams.get("name"),
    },
    lastResult: actionData,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: schema });
    },
    shouldValidate: "onBlur",
  });

  return (
    <Card className="mt-4 mb-5">
      <CardHeader>
        <CardTitle>Filter</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...getFormProps(form)} method="post" onSubmit={form.onSubmit}>
          <div className="mb-4 flex flex-col gap-6 md:mb-0">
            <ErrorList errors={form.errors} id={form.id} />
            <div className="grid gap-3">
              <Label htmlFor={fields.name.id}>Name</Label>
              <Input
                {...getInputProps(fields.name, { type: "text" })}
                autoFocus
              />
              <ErrorList errors={fields.name.errors} id={fields.name.errorId} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor={fields.category.id}>Category</Label>
              <Select {...getSelectProps(fields.category)}>
                {[
                  <option key="none" value="">
                    Select a category
                  </option>,
                  ...foodCategories.map((category) => (
                    <option
                      key={category}
                      selected={category === fields.category.defaultValue}
                      value={category}
                    >
                      {category}
                    </option>
                  )),
                ]}
              </Select>
              <ErrorList
                errors={fields.category.errors}
                id={fields.category.errorId}
              />
            </div>
            <div className="flex flex-col-reverse justify-end gap-2 md:flex-col md:flex-row">
              <Button
                render={
                  <Link
                    state={{ ...backNavigationIntent }}
                    to={{
                      pathname: "/ingredients",
                      search: searchParams.toString(),
                    }}
                  >
                    Cancel
                  </Link>
                }
                variant="outline"
              />
              <Button type="submit" variant="default">
                Apply
              </Button>
            </div>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
