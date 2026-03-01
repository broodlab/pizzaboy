import type { ComponentProps, FC } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export const TooltipTrigger: FC<
  ComponentProps<typeof TooltipPrimitive.Trigger>
> = ({ ...props }) => {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
};
