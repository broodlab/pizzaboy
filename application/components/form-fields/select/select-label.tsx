import type { ComponentProps, FC } from "react";
import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "~/utils/create-class-name";

export const SelectLabel: FC<ComponentProps<typeof SelectPrimitive.Label>> = ({
  className,
  ...props
}) => {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  );
};