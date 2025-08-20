import type { ComponentProps, FC } from "react";
import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { buttonVariants } from "~/components/button";
import { cn } from "~/utils/create-class-name";

export const AlertDialogAction: FC<
  ComponentProps<typeof AlertDialogPrimitive.Action>
> = ({ className, ...props }) => {
  return (
    <AlertDialogPrimitive.Action
      className={cn(buttonVariants(), className)}
      {...props}
    />
  );
};
