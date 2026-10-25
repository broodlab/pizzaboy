import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { XIcon } from "lucide-react";
import type { FC } from "react";
import { Button } from "~/components/button";
import { cn } from "~/utils/create-class-name";

export const ToastClose: FC<ToastPrimitive.Close.Props> = ({
  children,
  className,
  render = <Button size="icon-sm" variant="ghost" />,
  ...props
}) => {
  return (
    <ToastPrimitive.Close
      aria-label="Close toast"
      className={cn(
        "text-muted-foreground hover:text-foreground relative shrink-0 after:absolute after:-inset-2 after:content-['']",
        className,
      )}
      data-slot="toast-close"
      render={render}
      {...props}
    >
      {children ?? <XIcon aria-hidden="true" />}
    </ToastPrimitive.Close>
  );
};
