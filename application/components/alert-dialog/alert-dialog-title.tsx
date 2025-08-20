import type { ComponentProps, FC } from "react";
import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "~/utils/create-class-name";

export const AlertDialogTitle: FC<
  ComponentProps<typeof AlertDialogPrimitive.Title>
> = ({ className, ...props }) => {
  return (
    <AlertDialogPrimitive.Title
      className={cn("text-lg font-semibold", className)}
      data-slot="alert-dialog-title"
      {...props}
    />
  );
};
