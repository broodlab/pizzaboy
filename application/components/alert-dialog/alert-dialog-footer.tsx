import type { ComponentProps, FC } from "react";
import * as React from "react";
import { cn } from "~/utils/create-class-name";

export const AlertDialogFooter: FC<ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      data-slot="alert-dialog-footer"
      {...props}
    />
  );
};
