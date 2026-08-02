import type { Route } from "./+types";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { z } from "zod/v4";
import { Form, Link, redirect } from "react-router";
import { Input } from "~/components/input";
import { Button } from "~/components/button";
import { backNavigationIntent } from "~/types";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/card";
import { useNotificationlessSearchParams } from "~/utils/notifications";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "~/components/field";
import { Actions } from "~/components/actions";

const schema = z.object({
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
    const { name } = submission.value;
    if (name) filterSearchParams.append("name", name);
  }

  return redirect(`/pizzas?${filterSearchParams.toString()}`);
};

export default function FilterPizzas({ actionData }: Route.ComponentProps) {
  const [searchParams] = useNotificationlessSearchParams();
  const [form, fields] = useForm({
    defaultValue: {
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
          <FieldGroup>
            <FieldSet>
              <FieldGroup>
                <FieldError errors={form.errors} />
                <Field data-invalid={!fields.name.valid}>
                  <FieldLabel htmlFor={fields.name.id}>Name</FieldLabel>
                  <Input
                    {...getInputProps(fields.name, { type: "text" })}
                    autoFocus
                  />
                  <FieldError errors={fields.name.errors} />
                </Field>
                <Actions alignment="right">
                  <Button
                    render={
                      <Link
                        state={{ ...backNavigationIntent }}
                        to={{
                          pathname: "/pizzas",
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
                </Actions>
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </Form>
      </CardContent>
    </Card>
  );
}
