import type { ComponentProps, FC } from "react";
import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "~/utils/create-class-name";

export const Separator: FC<ComponentProps<typeof SeparatorPrimitive.Root>> = ({
  className,
  decorative = true,
  orientation = "horizontal",
  ...props
}) => {
  return (
    <SeparatorPrimitive.Root
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className,
      )}
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      {...props}
    />
  );
};
