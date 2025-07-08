import type { ComponentProps, FC } from "react";
import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";

export const SheetPortal: FC<ComponentProps<typeof SheetPrimitive.Portal>> = ({
  ...props
}) => {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
};