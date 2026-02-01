import { Page, PageHeader, PageIntro, PageTitle } from "~/components/page";
import { Form, redirect } from "react-router";
import {
  getFormProps,
  getInputProps,
  getTextareaProps,
  useForm,
} from "@conform-to/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/card";
import { Label } from "~/components/label";
import { Input } from "~/components/input";
import { Button } from "~/components/button";
import { parseWithZod } from "@conform-to/zod/v4";
import { doughSchema } from "~/features/doughs/common/schemas";
import type { Route } from "./+types";
import prisma from "~/utils/prisma.server";
import { ErrorList } from "~/components/error-list";
import { Textarea } from "~/components/textarea";

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
    const { description, name } = submission.value;

    const { id } = await prisma.dough.create({
      data: {
        description,
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
        <PageIntro>A dough is an integral part of a pizza.</PageIntro>
      </PageHeader>
      <Form {...getFormProps(form)} method="post" onSubmit={form.onSubmit}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>
                Use a unique name for the dough. A description is optional.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label htmlFor={fields.name.id}>Name*</Label>
                  <Input
                    {...getInputProps(fields.name, { type: "text" })}
                    autoFocus
                  />
                  <ErrorList
                    errors={fields.name.errors}
                    id={fields.name.errorId}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor={fields.description.id}>Description</Label>
                  <Textarea {...getTextareaProps(fields.description)} />
                  <ErrorList
                    errors={fields.description.errors}
                    id={fields.description.errorId}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-end">
            <Button
              className="w-full sm:w-auto"
              type="submit"
              variant="default"
            >
              Save
            </Button>
          </div>
        </div>
      </Form>
    </Page>
  );
}
