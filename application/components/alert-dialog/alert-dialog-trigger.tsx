import type { ComponentProps, FC } from "react";
import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

export const AlertDialogTrigger: FC<
  ComponentProps<typeof AlertDialogPrimitive.Trigger>
> = ({ ...props }) => {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
};
