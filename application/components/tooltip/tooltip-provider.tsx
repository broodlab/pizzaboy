import type { ComponentProps, FC } from "react";
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export const TooltipProvider: FC<
  ComponentProps<typeof TooltipPrimitive.Provider>
> = ({ delayDuration = 0, ...props }) => {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
};
