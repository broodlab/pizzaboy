import type { ComponentProps, FC } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { TooltipProvider } from "~/components/tooltip";

export const Tooltip: FC<ComponentProps<typeof TooltipPrimitive.Root>> = ({
  ...props
}) => {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
};
