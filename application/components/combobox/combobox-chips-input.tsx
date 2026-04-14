import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { cn } from "~/utils/create-class-name";

export const ComboboxChipsInput = ({
  className,
  ...props
}: ComboboxPrimitive.Input.Props) => (
  <ComboboxPrimitive.Input
    className={cn("min-w-16 flex-1 outline-none", className)}
    data-slot="combobox-chip-input"
    {...props}
  />
);
