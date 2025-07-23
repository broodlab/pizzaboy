import type { FC } from "react";
import {
  getFormProps,
  getInputProps,
  getSelectProps,
  getTextareaProps,
  type useForm,
} from "@conform-to/react";
import type { ingredientSchema } from "~/features/ingredients/common/schemas";
import type { z } from "zod/v4";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/card";
import { Form } from "react-router";
import { ErrorList } from "~/components/error-list";
import { Label } from "~/components/label";
import { Input } from "~/components/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/select";
import { foodCategories } from "~/types/food-categories";
import { Textarea } from "~/components/textarea";
import { Button } from "~/components/button";

type IngredientFormProps = {
  formConfig: ReturnType<typeof useForm<z.infer<typeof ingredientSchema>>>;
};

export const IngredientForm: FC<IngredientFormProps> = ({
  formConfig: [form, fields],
}) => (
  <Card className="w-full max-w-md">
    <CardHeader>
      <CardTitle>Create Ingredient</CardTitle>
      <CardDescription>
        Use an unique name and assign a suitable category. A description is
        optional, but might be useful for exotic ingredients.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Form {...getFormProps(form)} method="post" onSubmit={form.onSubmit}>
        <div className="flex flex-col gap-6">
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
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {foodCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <ErrorList
              errors={fields.category.errors}
              id={fields.category.errorId}
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
          <div className="grid gap-3">
            <Button type="submit" variant="default">
              Save
            </Button>
          </div>
        </div>
      </Form>
    </CardContent>
  </Card>
);
