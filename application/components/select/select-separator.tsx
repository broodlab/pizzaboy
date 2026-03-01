import type { ComponentProps, FC } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "~/utils/create-class-name";

export const SelectSeparator: FC<
  ComponentProps<typeof SelectPrimitive.Separator>
> = ({ className, ...props }) => {
  return (
    <SelectPrimitive.Separator
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      data-slot="select-separator"
      {...props}
    />
  );
};
