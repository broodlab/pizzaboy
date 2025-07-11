import type { ComponentProps, FC } from "react";
import * as React from "react";
import { cn } from "~/utils/create-class-name";

export const SheetHeader: FC<ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn("flex flex-col gap-1.5 p-4", className)}
      data-slot="sheet-header"
      {...props}
    />
  );
};
