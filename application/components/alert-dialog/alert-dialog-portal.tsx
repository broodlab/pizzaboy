import type { ComponentProps, FC } from "react";
import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

export const AlertDialogPortal: FC<
  ComponentProps<typeof AlertDialogPrimitive.Portal>
> = ({ ...props }) => {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  );
};
