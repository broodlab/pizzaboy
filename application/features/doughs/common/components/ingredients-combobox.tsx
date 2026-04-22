import type { FC } from "react";
import {
  type FieldMetadata,
  getInputProps,
  useInputControl,
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
import type { Ingredient } from "~/prisma/client";

type RecipeItemFieldMetadata = FieldMetadata<
  string,
  z.infer<typeof doughSchema>,
  string[]
>;

export const IngredientsCombobox: FC<{
  recipeItemFieldSet: Required<{
    ingredientId: RecipeItemFieldMetadata;
    name: RecipeItemFieldMetadata;
    quantity?: RecipeItemFieldMetadata | undefined;
  }>;
  ingredients: Array<{ id: string; name: string }>;
}> = ({ ingredients, recipeItemFieldSet }) => {
  const idInputControl = useInputControl(recipeItemFieldSet.ingredientId);

  return (
    <>
      <input
        {...getInputProps(recipeItemFieldSet.ingredientId, {
          type: "hidden",
        })}
      />
      <Combobox
        items={ingredients}
        itemToStringLabel={({ name }: Ingredient) => name}
        onValueChange={(value) => idInputControl.change(value!.id)}
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
