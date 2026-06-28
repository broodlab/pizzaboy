import { getFormProps, getInputProps, type useForm } from "@conform-to/react";
import { sizesSchema } from "~/features/sizes/view-all/schemas";
import { z } from "zod/v4";
import { type FC } from "react";
import { Form } from "react-router";
import { Card, CardContent } from "~/components/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "~/components/field";
import { Input } from "~/components/input";
import { Button } from "~/components/button";
import { PlusIcon, Trash2 as DeleteIcon, Save as SaveIcon } from "lucide-react";
import { Actions } from "~/components/actions";

type SizeFormProps = {
  formConfig: ReturnType<typeof useForm<z.infer<typeof sizesSchema>>>;
};

export const SizeForm: FC<SizeFormProps> = ({ formConfig: [form, fields] }) => {
  const sizeFields = fields.sizes.getFieldList();

  return (
    <Form {...getFormProps(form)} method="post" onSubmit={form.onSubmit}>
      <div className="grid gap-6">
        <Card>
          <CardContent>
            <FieldGroup>
              {sizeFields.map((sizeField, index) => {
                const sizeFieldSet = sizeField.getFieldset();
                const isOnly = sizeFields.length === 1;
                const isLast = index === sizeFields.length - 1;

                return (
                  <FieldSet>
                    <FieldGroup>
                      <div className="grid grid-cols-12 gap-x-1 gap-y-3">
                        <div className="col-span-12 grid gap-3 sm:col-span-11 sm:border-r sm:pr-6">
                          <input
                            {...getInputProps(sizeFieldSet.id, {
                              type: "hidden",
                            })}
                          />
                          <Field data-invalid={!sizeFieldSet.name.valid}>
                            <FieldLabel required>Name</FieldLabel>
                            <Input
                              {...getInputProps(sizeFieldSet.name, {
                                type: "text",
                              })}
                            />
                            <FieldError errors={sizeFieldSet.name.errors} />
                          </Field>
                          <Field data-invalid={!sizeFieldSet.description.valid}>
                            <FieldLabel required>Description</FieldLabel>
                            <Input
                              {...getInputProps(sizeFieldSet.description, {
                                type: "text",
                              })}
                            />
                            <FieldError
                              errors={sizeFieldSet.description.errors}
                            />
                          </Field>
                        </div>
                        <div className="col-span-12 flex flex-row gap-1 sm:col-span-1 sm:flex-col sm:justify-evenly">
                          <Button
                            {...form.remove.getButtonProps({
                              name: fields.sizes.name,
                              index,
                            })}
                            className="hidden flex-1 sm:flex"
                            disabled={isOnly}
                            type="submit"
                            variant="ghost"
                          >
                            <DeleteIcon className="hidden size-6 text-red-400 sm:block md:size-6" />
                          </Button>
                          <Button
                            {...form.remove.getButtonProps({
                              name: fields.sizes.name,
                              index,
                            })}
                            className="flex-1 sm:hidden"
                            disabled={isOnly}
                            type="submit"
                            variant="destructive"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </FieldGroup>
                    <FieldSeparator className={isLast ? "" : "mb-2"} />
                  </FieldSet>
                );
              })}
              <Actions>
                <Button
                  {...form.insert.getButtonProps({
                    name: fields.sizes.name,
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
          <Button type="submit">
            <SaveIcon />
            <span>Save</span>
          </Button>
        </Actions>
      </div>
    </Form>
  );
};
