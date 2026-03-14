import type { FC } from "react";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

export const TooltipTrigger: FC<TooltipPrimitive.Trigger.Props> = ({
  ...props
}) => {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
};
