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
import { Actions } from "~/components/actions";
import { IngredientsCombobox } from "~/features/doughs/common/components/ingredients-combobox";

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
                            <div className="col-span-12 grid gap-3 sm:col-span-11 sm:border-r sm:pr-6">
                              <div className="flex flex-row items-end">
                                <Field className="grid basis-2/3 gap-3">
                                  <FieldLabel required>Ingredient</FieldLabel>
                                  <IngredientsCombobox
                                    ingredients={ingredients}
                                    recipeItemFieldSet={recipeItemFieldSet}
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
                                      <span>Browse Ingredients</span>
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
                            <div className="col-span-12 sm:col-span-1 sm:flex sm:flex-row sm:items-center">
                              <Button
                                {...form.remove.getButtonProps({
                                  name: fields.recipeItems.name,
                                  index,
                                })}
                                className="block w-full sm:hidden"
                                type="submit"
                                variant="outline"
                              >
                                Delete
                              </Button>
                              <Button
                                {...form.remove.getButtonProps({
                                  name: fields.recipeItems.name,
                                  index,
                                })}
                                className="hidden sm:block"
                                type="submit"
                                variant="ghost"
                              >
                                <DeleteIcon className="hidden size-6 text-gray-600 sm:block md:size-5" />
                              </Button>
                            </div>
                          </div>
                        </FieldGroup>
                      </FieldSet>
                      <FieldSeparator />
                    </Fragment>
                  );
                })}
                <Actions>
                  <Button
                    {...form.insert.getButtonProps({
                      name: fields.recipeItems.name,
                    })}
                    type="submit"
                    variant="outline"
                  >
                    <PlusIcon className="size-5 text-gray-600" />
                    <span>Add</span>
                  </Button>
                </Actions>
              </FieldGroup>
            </CardContent>
          </Card>
          <Actions alignment="right">
            <Button type="submit">Save</Button>
          </Actions>
        </div>
      </Form>
    </Page>
  );
}
