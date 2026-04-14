import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { cn } from "~/utils/create-class-name";

export const ComboboxGroup = ({
  className,
  ...props
}: ComboboxPrimitive.Group.Props) => (
  <ComboboxPrimitive.Group
    className={cn(className)}
    data-slot="combobox-group"
    {...props}
  />
);
