import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import type { FC } from "react";
import { cn } from "~/utils/create-class-name";

export const ToastTitle: FC<ToastPrimitive.Title.Props> = ({
  className,
  ...props
}) => {
  return (
    <ToastPrimitive.Title
      className={cn("text-sm font-medium", className)}
      data-slot="toast-title"
      {...props}
    />
  );
};
