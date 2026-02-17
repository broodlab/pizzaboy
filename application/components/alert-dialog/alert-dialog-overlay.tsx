import type { FC } from "react";
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { cn } from "~/utils/create-class-name";

export const AlertDialogOverlay: FC<AlertDialogPrimitive.Backdrop.Props> = ({
  className,
  ...props
}) => {
  return (
    <AlertDialogPrimitive.Backdrop
      className={cn(
        "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs",
        className,
      )}
      data-slot="alert-dialog-overlay"
      {...props}
    />
  );
};
