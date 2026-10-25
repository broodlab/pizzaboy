import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import type { FC } from "react";
import { cn } from "~/utils/create-class-name";

export const ToastViewport: FC<ToastPrimitive.Viewport.Props> = ({
  className,
  ...props
}) => {
  return (
    <ToastPrimitive.Viewport
      className={cn(
        "pointer-events-none fixed inset-x-4 bottom-4 z-50 mx-auto w-auto max-w-sm outline-none sm:right-4 sm:left-auto sm:mx-0 sm:w-full",
        className,
      )}
      data-slot="toast-viewport"
      {...props}
    />
  );
};
