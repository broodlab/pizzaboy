import * as React from "react";
import { type ComponentProps, type FC } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

type ConformJsDefaultValue = undefined | number | readonly string[] | string;

type SelectProps = Omit<
  ComponentProps<typeof SelectPrimitive.Root>,
  "defaultValue"
> & {
  defaultValue?: ConformJsDefaultValue;
};

export const Select: FC<SelectProps> = ({ defaultValue, ...props }) => {
  return (
    <SelectPrimitive.Root
      data-slot="select"
      {...props}
      defaultValue={mapToCorrectType(defaultValue)}
    />
  );
};

const mapToCorrectType = (
  defaultValue: ConformJsDefaultValue,
): undefined | string => {
  if (Array.isArray(defaultValue)) {
    throw new Error("The 'defaultValue' property must not be an array.");
  }
  return defaultValue?.toString();
};
