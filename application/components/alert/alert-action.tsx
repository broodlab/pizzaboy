import type { ComponentProps, FC } from "react";
import { cn } from "~/utils/create-class-name";

export const AlertAction: FC<ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn("absolute top-2 right-2", className)}
      data-slot="alert-title"
      {...props}
    />
  );
};
