import { cn } from "~/utils/create-class-name";
import type { ComponentProps, FC } from "react";

export const Skeleton: FC<ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn("bg-accent animate-pulse rounded-md", className)}
      data-slot="skeleton"
      {...props}
    />
  );
};
