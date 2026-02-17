import { type ComponentProps, type FC } from "react";
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";

export const AlertDialog: FC<
  ComponentProps<typeof AlertDialogPrimitive.Root>
> = ({ ...props }) => {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
};
