import * as React from "react";
import { type ComponentProps, type FC } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

export const Select: FC<ComponentProps<typeof SelectPrimitive.Root>> = ({
  ...props
}) => {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
};