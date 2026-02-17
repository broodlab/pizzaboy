import type { ComponentProps, FC } from "react";
import { Button } from "~/components/button";
import { cn } from "~/utils/create-class-name";
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";

export const AlertDialogCancel: FC<
  AlertDialogPrimitive.Close.Props &
    Pick<ComponentProps<typeof Button>, "size" | "variant">
> = ({ className, size = "default", variant = "outline", ...props }) => {
  return (
    <AlertDialogPrimitive.Close
      className={cn(className)}
      data-slot="alert-dialog-cancel"
      render={<Button variant={variant} size={size} />}
      {...props}
    />
  );
};
