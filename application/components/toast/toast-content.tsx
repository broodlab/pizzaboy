import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import type { FC } from "react";
import { cn } from "~/utils/create-class-name";

export const ToastContent: FC<ToastPrimitive.Content.Props> = ({
  className,
  ...props
}) => {
  return (
    <ToastPrimitive.Content
      className={cn(
        "flex h-full items-center gap-3 overflow-hidden p-4 transition-opacity duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] data-behind:opacity-0 data-expanded:opacity-100",
        className,
      )}
      data-slot="toast-content"
      {...props}
    />
  );
};
