import type { ComponentProps, FC } from "react";
import * as React from "react";
import { cn } from "~/utils/create-class-name";

export const AlertDialogHeader: FC<ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      data-slot="alert-dialog-header"
      {...props}
    />
  );
};
