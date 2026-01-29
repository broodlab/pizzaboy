import { Page, PageHeader, PageIntro, PageTitle } from "~/components/page";
import { Form, redirect } from "react-router";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { Card, CardContent } from "~/components/card";
import { Label } from "~/components/label";
import { Input } from "~/components/input";
import { Button } from "~/components/button";
import { parseWithZod } from "@conform-to/zod/v4";
import { doughSchema } from "~/features/doughs/common/schemas";
import type { Route } from "./+types";
import prisma from "~/utils/prisma.server";
import { ErrorList } from "~/components/error-list";

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
    const { name } = submission.value;

    const { id } = await prisma.dough.create({
      data: {
        name,
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

export default function CreateDough({ actionData }: Route.ComponentProps) {
  const [form, fields] = useForm({
    lastResult: actionData,
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: doughSchema }),
    shouldValidate: "onBlur",
  });

  return (
    <Page>
      <PageHeader>
        <PageTitle>Create Dough</PageTitle>
        <PageIntro>
          Please use a unique name for the dough. On the next page you will be
          able to specify a description and assign ingredients.
        </PageIntro>
      </PageHeader>
      <Form {...getFormProps(form)} method="post" onSubmit={form.onSubmit}>
        <div className="grid gap-6">
          <Card>
            <CardContent>
              <div className="grid gap-3">
                <Label htmlFor={fields.name.id}>Name</Label>
                <Input
                  {...getInputProps(fields.name, { type: "text" })}
                  autoFocus
                />
                <ErrorList
                  errors={fields.name.errors}
                  id={fields.name.errorId}
                />
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-end">
            <Button
              className="w-full sm:w-auto"
              type="submit"
              variant="default"
            >
              Next
            </Button>
          </div>
        </div>
      </Form>
    </Page>
  );
}
