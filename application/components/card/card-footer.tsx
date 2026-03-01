import type { ComponentProps, FC } from "react";
import { cn } from "~/utils/create-class-name";

export const CardFooter: FC<ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "bg-muted/50 flex items-center rounded-b-xl border-t p-4 group-data-[size=sm]/card:p-3",
        className,
      )}
      data-slot="card-footer"
      {...props}
    />
  );
};
