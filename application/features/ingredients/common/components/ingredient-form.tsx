import type { FC } from "react";
import { Form } from "react-router";
import {
  getFormProps,
  getInputProps,
  getSelectProps,
  getTextareaProps,
  type useForm,
} from "@conform-to/react";
import { ErrorList } from "~/components/error-list";
import { Label } from "~/components/label";
import { Input } from "~/components/form-fields/input";
import { Select } from "~/components/form-fields/select";
import { foodCategories } from "~/types/food-categories";
import { Textarea } from "~/components/form-fields/textarea";
import { Button } from "~/components/button";
import type { ingredientSchema } from "~/features/ingredients/common/schemas";
import type { z } from "zod/v4";

type IngredientFormProps = {
  formConfig: ReturnType<typeof useForm<z.infer<typeof ingredientSchema>>>;
};

export const IngredientForm: FC<IngredientFormProps> = ({
  formConfig: [form, fields],
}) => (
  <Form {...getFormProps(form)} method="post" onSubmit={form.onSubmit}>
    <ErrorList errors={form.errors} id={form.id} />
    <div>
      <Label htmlFor={fields.name.id}>Name</Label>
      <Input {...getInputProps(fields.name, { type: "text" })} autoFocus />
      <ErrorList errors={fields.name.errors} id={fields.name.errorId} />
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
      <ErrorList errors={fields.category.errors} id={fields.category.errorId} />
    </div>
    <div>
      <Label htmlFor={fields.description.id}>Description</Label>
      <Textarea {...getTextareaProps(fields.description)} />
      <ErrorList
        errors={fields.description.errors}
        id={fields.description.errorId}
      />
    </div>
    <Button type="submit" variant="default">
      Save
    </Button>
  </Form>
);
