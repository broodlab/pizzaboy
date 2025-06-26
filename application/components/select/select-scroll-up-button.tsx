import type { ComponentProps, FC } from "react";
import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronUpIcon } from "lucide-react";
import { cn } from "~/utils/create-class-name";

export const SelectScrollUpButton: FC<
  ComponentProps<typeof SelectPrimitive.ScrollUpButton>
> = ({ className, ...props }) => {
  return (
    <SelectPrimitive.ScrollUpButton
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      data-slot="select-scroll-up-button"
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
};
