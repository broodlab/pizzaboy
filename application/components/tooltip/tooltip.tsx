import type { FC } from "react";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

export const Tooltip: FC<TooltipPrimitive.Root.Props> = ({ ...props }) => {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
};
