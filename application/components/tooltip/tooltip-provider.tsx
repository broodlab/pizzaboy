import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import type { FC } from "react";

export const TooltipProvider: FC<TooltipPrimitive.Provider.Props> = ({
  delay = 0,
  ...props
}) => {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  );
};
