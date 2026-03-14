import type { FC } from "react";
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";

import { cn } from "~/utils/create-class-name";

export const Separator: FC<SeparatorPrimitive.Props> = ({
  className,
  orientation = "horizontal",
  ...props
}) => {
  return (
    <SeparatorPrimitive
      className={cn(
        "bg-border shrink-0 data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className,
      )}
      data-slot="separator"
      orientation={orientation}
      {...props}
    />
  );
};
