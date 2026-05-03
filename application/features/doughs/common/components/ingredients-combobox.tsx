import type { FC } from "react";
import {
  type FieldMetadata,
  getInputProps,
  type useForm,
} from "@conform-to/react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "~/components/combobox";
import { z } from "zod/v4";
import type { doughSchema } from "~/features/doughs/common/schemas";

type RecipeItemFieldMetadata = FieldMetadata<
  string,
  z.infer<typeof doughSchema>,
  string[]
>;

export const IngredientsCombobox: FC<{
  form: ReturnType<typeof useForm<z.infer<typeof doughSchema>>>[0];
  recipeItemFieldSet: Required<{
    ingredientId: RecipeItemFieldMetadata;
    name: RecipeItemFieldMetadata;
    quantity?: RecipeItemFieldMetadata | undefined;
  }>;
  ingredients: Array<{ id: string; name: string }>;
}> = ({ form, ingredients, recipeItemFieldSet }) => {
  const defaultValue =
    recipeItemFieldSet.ingredientId.defaultValue !== undefined &&
    recipeItemFieldSet.name.defaultValue !== undefined
      ? {
          id: recipeItemFieldSet.ingredientId.defaultValue,
          name: recipeItemFieldSet.name.defaultValue,
        }
      : undefined;

  return (
    <>
      <input
        {...getInputProps(recipeItemFieldSet.ingredientId, {
          type: "hidden",
        })}
      />
      <Combobox
        defaultValue={defaultValue}
        isItemEqualToValue={(item, value) => item.id === value.id}
        itemToStringLabel={({ name }: (typeof ingredients)[number]) => name}
        items={ingredients}
        onValueChange={(value) => {
          form.update({
            name: recipeItemFieldSet.ingredientId.name,
            value: value!.id,
          });
        }}
      >
        <ComboboxInput
          {...getInputProps(recipeItemFieldSet.name, {
            type: "text",
          })}
          placeholder="Select an ingredient"
        />
        <ComboboxContent>
          <ComboboxEmpty>No ingredients found.</ComboboxEmpty>
          <ComboboxList>
            {(ingredient) => (
              <ComboboxItem key={ingredient.id} value={ingredient}>
                {ingredient.name}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </>
  );
};
