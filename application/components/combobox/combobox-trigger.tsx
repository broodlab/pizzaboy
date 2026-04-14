import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { ChevronDownIcon } from "lucide-react";
import type { FC } from "react";
import { cn } from "~/utils/create-class-name";

export const ComboboxTrigger: FC<ComboboxPrimitive.Trigger.Props> = ({
  children,
  className,
  ...props
}) => (
  <ComboboxPrimitive.Trigger
    className={cn("[&_svg:not([class*='size-'])]:size-4", className)}
    data-slot="combobox-trigger"
    {...props}
  >
    {children}
    <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4" />
  </ComboboxPrimitive.Trigger>
);
