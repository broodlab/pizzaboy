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
import { Label } from "~/components/label";
import { Input } from "~/components/input";
import { Button } from "~/components/button";
import { parseWithZod } from "@conform-to/zod/v4";
import { doughSchema } from "~/features/doughs/common/schemas";
import type { Route } from "./+types";
import prisma from "~/utils/prisma.server";
import { ErrorList } from "~/components/error-list";
import { Textarea } from "~/components/textarea";
import {
  Plus as PlusIcon,
  SearchIcon,
  Trash2 as DeleteIcon,
} from "lucide-react";
import { Separator } from "~/components/separator";
import { Fragment } from "react";

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
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label htmlFor={fields.name.id} required>
                    Name
                  </Label>
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
          <Card>
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
              <CardDescription>
                Assign ingredients to the dough. You can add as many ingredients
                as you like.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {recipeItemsFields.map((recipeItemsField, index) => {
                  const recipeItemFieldSet = recipeItemsField.getFieldset();
                  return (
                    <Fragment key={recipeItemsField.key}>
                      <div
                        className="grid grid-cols-12 gap-x-1 gap-y-3"
                        key={recipeItemsField.key}
                      >
                        <div className="col-span-11 grid gap-3 border-r pr-6">
                          <div className="flex flex-row items-end">
                            <div className="grid basis-2/3 gap-3">
                              <Label required>Ingredient</Label>
                              <Input
                                {...getInputProps(
                                  recipeItemFieldSet.ingredientId,
                                  {
                                    type: "text",
                                  },
                                )}
                              />
                            </div>
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
                          <div className="grid gap-3">
                            <Label>Quantity</Label>
                            <Input
                              {...getInputProps(recipeItemFieldSet.quantity, {
                                type: "text",
                              })}
                            />
                          </div>
                        </div>
                        <div className="col-span-1 flex flex-row items-center">
                          <Button
                            {...form.remove.getButtonProps({
                              name: fields.recipeItems.name,
                              index,
                            })}
                            variant="ghost"
                          >
                            <DeleteIcon className="size-6 text-gray-600 md:size-5" />
                          </Button>
                        </div>
                      </div>
                      <Separator />
                    </Fragment>
                  );
                })}
                <div className="flex justify-start">
                  <Button
                    {...form.insert.getButtonProps({
                      name: fields.recipeItems.name,
                    })}
                    variant="outline"
                  >
                    <PlusIcon className="size-6 text-gray-600 md:size-5" />
                    <span>Add</span>
                  </Button>
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
