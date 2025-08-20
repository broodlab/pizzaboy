import type { ComponentProps, FC } from "react";
import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

export const AlertDialog: FC<
  ComponentProps<typeof AlertDialogPrimitive.Root>
> = ({ ...props }) => {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
};
