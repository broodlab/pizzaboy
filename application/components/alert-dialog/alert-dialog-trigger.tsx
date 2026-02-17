import type { FC } from "react";
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";

export const AlertDialogTrigger: FC<AlertDialogPrimitive.Trigger.Props> = ({
  ...props
}) => {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
};
