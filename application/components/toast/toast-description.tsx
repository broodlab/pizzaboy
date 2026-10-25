import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import type { FC } from "react";
import { cn } from "~/utils/create-class-name";

export const ToastDescription: FC<ToastPrimitive.Description.Props> = ({
  className,
  ...props
}) => {
  return (
    <ToastPrimitive.Description
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="toast-description"
      {...props}
    />
  );
};
