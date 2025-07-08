import type { ComponentProps, FC } from "react";
import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";

export const Sheet: FC<ComponentProps<typeof SheetPrimitive.Root>> = ({
  ...props
}) => {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
};