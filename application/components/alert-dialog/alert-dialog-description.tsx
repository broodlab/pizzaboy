import type { ComponentProps, FC } from "react";
import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "~/utils/create-class-name";

export const AlertDialogDescription: FC<
  ComponentProps<typeof AlertDialogPrimitive.Description>
> = ({ className, ...props }) => {
  return (
    <AlertDialogPrimitive.Description
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="alert-dialog-description"
      {...props}
    />
  );
};
