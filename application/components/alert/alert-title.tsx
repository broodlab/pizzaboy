import type { FC } from "react";
import * as React from "react";
import { cn } from "~/utils/create-class-name";

export const AlertTitle: FC<React.ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className,
      )}
      data-slot="alert-title"
      {...props}
    />
  );
};
