import * as React from "react";
import { type ComponentProps, type FC } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

export const SelectGroup: FC<ComponentProps<typeof SelectPrimitive.Group>> = ({
  ...props
}) => {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
};
