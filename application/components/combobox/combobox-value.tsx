import { Combobox as ComboboxPrimitive } from "@base-ui/react";

export const ComboboxValue = (props: ComboboxPrimitive.Value.Props) => (
  <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />
);
