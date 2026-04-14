import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { cn } from "~/utils/create-class-name";

export const ComboboxSeparator = ({
  className,
  ...props
}: ComboboxPrimitive.Separator.Props) => (
  <ComboboxPrimitive.Separator
    className={cn("bg-border -mx-1 my-1 h-px", className)}
    data-slot="combobox-separator"
    {...props}
  />
);
