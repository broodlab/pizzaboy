import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import type { FC } from "react";
import { Button } from "~/components/button";
import { cn } from "~/utils/create-class-name";

export const ToastAction: FC<ToastPrimitive.Action.Props> = ({
  className,
  render = <Button size="sm" variant="outline" />,
  ...props
}) => {
  return (
    <ToastPrimitive.Action
      className={cn("shrink-0", className)}
      data-slot="toast-action"
      render={render}
      {...props}
    />
  );
};
