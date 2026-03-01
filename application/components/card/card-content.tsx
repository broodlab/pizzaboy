import type { ComponentProps, FC } from "react";
import { cn } from "~/utils/create-class-name";

export const CardContent: FC<ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn("px-4 group-data-[size=sm]/card:px-3", className)}
      data-slot="card-content"
      {...props}
    />
  );
};
