import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { cn } from "~/utils/create-class-name";

export const ComboboxLabel = ({
  className,
  ...props
}: ComboboxPrimitive.GroupLabel.Props) => (
  <ComboboxPrimitive.GroupLabel
    className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
    data-slot="combobox-label"
    {...props}
  />
);
