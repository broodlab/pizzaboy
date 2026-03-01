import type { ComponentProps, FC } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

export const SelectValue: FC<ComponentProps<typeof SelectPrimitive.Value>> = ({
  ...props
}) => {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
};
