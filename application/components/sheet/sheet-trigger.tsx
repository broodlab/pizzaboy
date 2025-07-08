import type { ComponentProps, FC } from "react";
import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";

export const SheetTrigger: FC<
  ComponentProps<typeof SheetPrimitive.Trigger>
> = ({ ...props }) => {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
};