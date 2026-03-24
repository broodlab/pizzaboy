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
import { Card, CardContent } from "~/components/card";
import { Form } from "react-router";
import { Input } from "~/components/input";
import { NativeSelect as Select } from "~/components/native-select";
import { foodCategories } from "~/types/food-categories";
import { Textarea } from "~/components/textarea";
import { Button } from "~/components/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "~/components/field";

type IngredientFormProps = {
  formConfig: ReturnType<typeof useForm<z.infer<typeof ingredientSchema>>>;
};

export const IngredientForm: FC<IngredientFormProps> = ({
  formConfig: [form, fields],
}) => (
  <Card>
    <CardContent>
      <Form {...getFormProps(form)} method="post" onSubmit={form.onSubmit}>
        <FieldGroup>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldError errors={form.errors} />
              </Field>
              <Field data-invalid={!fields.name.valid}>
                <FieldLabel htmlFor={fields.name.id} required>
                  Name
                </FieldLabel>
                <Input
                  {...getInputProps(fields.name, { type: "text" })}
                  autoFocus
                />
                <FieldDescription>Use a unique name</FieldDescription>
                <FieldError errors={fields.name.errors}></FieldError>
              </Field>
              <Field data-invalid={!fields.category.valid}>
                <FieldLabel htmlFor={fields.category.id} required>
                  Category
                </FieldLabel>
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
                <FieldError errors={fields.category.errors} />
              </Field>
              <Field data-invalid={!fields.description.valid}>
                <FieldLabel htmlFor={fields.description.id}>
                  Description
                </FieldLabel>
                <Textarea {...getTextareaProps(fields.description)} />
                <FieldError errors={fields.description.errors} />
              </Field>
              <Field orientation="responsive">
                <Button
                  className="w-full sm:w-auto"
                  type="submit"
                  variant="default"
                >
                  Save
                </Button>
              </Field>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </Form>
    </CardContent>
  </Card>
);
