import type { ComponentProps, FC } from "react";
import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "~/utils/create-class-name";

export const AlertDialogOverlay: FC<
  ComponentProps<typeof AlertDialogPrimitive.Overlay>
> = ({ className, ...props }) => {
  return (
    <AlertDialogPrimitive.Overlay
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className,
      )}
      data-slot="alert-dialog-overlay"
      {...props}
    />
  );
};
