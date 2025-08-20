import type { ComponentProps, FC } from "react";
import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { buttonVariants } from "~/components/button";
import { cn } from "~/utils/create-class-name";

export const AlertDialogCancel: FC<
  ComponentProps<typeof AlertDialogPrimitive.Cancel>
> = ({ className, ...props }) => {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: "outline" }), className)}
      {...props}
    />
  );
};
