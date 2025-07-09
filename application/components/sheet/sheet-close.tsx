import type { ComponentProps, FC } from "react";
import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";

export const SheetClose: FC<ComponentProps<typeof SheetPrimitive.Close>> = ({
  ...props
}) => {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
};
