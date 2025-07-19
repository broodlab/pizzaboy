import { cn } from "~/utils/create-class-name";
import type { ComponentProps, FC } from "react";

export const Card: FC<ComponentProps<"div">> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className,
      )}
      data-slot="card"
      {...props}
    />
  );
};
