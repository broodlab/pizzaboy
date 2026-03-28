import { Page, PageHeader, PageIntro, PageTitle } from "~/components/page";
import { Form, Link, redirect } from "react-router";
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
import { Input } from "~/components/input";
import { Button } from "~/components/button";
import { parseWithZod } from "@conform-to/zod/v4";
import { doughSchema } from "~/features/doughs/common/schemas";
import type { Route } from "./+types";
import prisma from "~/utils/prisma.server";
import { Textarea } from "~/components/textarea";
import { PlusIcon, SearchIcon, Trash2 as DeleteIcon } from "lucide-react";
import { Fragment } from "react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "~/components/field";

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

export default function CreateDough({ actionData }: Route.ComponentProps) {
  const [form, fields] = useForm({
    lastResult: actionData,
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: doughSchema }),
    shouldValidate: "onBlur",
  });
  const recipeItemsFields = fields.recipeItems.getFieldList();

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
              <FieldGroup>
                <FieldSet>
                  <FieldGroup>
                    <Field data-invalid={!fields.name.valid}>
                      <FieldLabel htmlFor={fields.name.id} required>
                        Name
                      </FieldLabel>
                      <Input
                        {...getInputProps(fields.name, { type: "text" })}
                        autoFocus
                      />
                      <FieldError errors={fields.name.errors} />
                    </Field>
                    <Field data-invalid={!fields.description.valid}>
                      <FieldLabel htmlFor={fields.description.id}>
                        Description
                      </FieldLabel>
                      <Textarea {...getTextareaProps(fields.description)} />
                      <FieldError errors={fields.description.errors} />
                    </Field>
                  </FieldGroup>
                </FieldSet>
              </FieldGroup>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
              <CardDescription>
                Assign ingredients to the dough. You can add as many ingredients
                as you like.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                {recipeItemsFields.map((recipeItemsField, index) => {
                  const recipeItemFieldSet = recipeItemsField.getFieldset();
                  return (
                    <Fragment key={recipeItemsField.key}>
                      <FieldSet>
                        <FieldGroup>
                          <div className="grid grid-cols-12 gap-x-1 gap-y-3">
                            <div className="col-span-11 grid gap-3 border-r pr-6">
                              <div className="flex flex-row items-end">
                                <Field className="grid basis-2/3 gap-3">
                                  <FieldLabel required>Ingredient</FieldLabel>
                                  <Input
                                    {...getInputProps(
                                      recipeItemFieldSet.ingredientId,
                                      {
                                        type: "text",
                                      },
                                    )}
                                  />
                                  <FieldError
                                    errors={
                                      recipeItemFieldSet.ingredientId.errors
                                    }
                                  />
                                </Field>
                                <Button
                                  className="basis-1/3"
                                  render={
                                    <Link className="text-gray-600" to="/mama">
                                      <SearchIcon className="size-6 text-gray-600 md:size-5" />
                                      <span>Advanced Search</span>
                                    </Link>
                                  }
                                  variant="link"
                                />
                              </div>
                              <Field>
                                <FieldLabel>Quantity</FieldLabel>
                                <Input
                                  {...getInputProps(
                                    recipeItemFieldSet.quantity,
                                    {
                                      type: "text",
                                    },
                                  )}
                                />
                                <FieldError
                                  errors={recipeItemFieldSet.quantity.errors}
                                />
                              </Field>
                            </div>
                            <div className="col-span-1 flex flex-row items-center">
                              <Button
                                {...form.remove.getButtonProps({
                                  name: fields.recipeItems.name,
                                  index,
                                })}
                                type="submit"
                                variant="ghost"
                              >
                                <DeleteIcon className="size-6 text-gray-600 md:size-5" />
                              </Button>
                            </div>
                          </div>
                        </FieldGroup>
                      </FieldSet>
                      <FieldSeparator />
                    </Fragment>
                  );
                })}
                <Field orientation="responsive">
                  <Button
                    {...form.insert.getButtonProps({
                      name: fields.recipeItems.name,
                    })}
                    type="submit"
                    variant="outline"
                  >
                    <PlusIcon className="size-6 text-gray-600 md:size-5" />
                    <span>Add</span>
                  </Button>
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
          <FieldGroup>
            <Field orientation="responsive">
              <Button type="submit">Save</Button>
            </Field>
          </FieldGroup>
        </div>
      </Form>
    </Page>
  );
}
