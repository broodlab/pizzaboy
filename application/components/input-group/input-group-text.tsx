import type { ComponentProps, FC } from "react";
import { cn } from "~/utils/create-class-name";

export const InputGroupText: FC<ComponentProps<"span">> = ({
  className,
  ...props
}) => (
  <span
    className={cn(
      "text-muted-foreground flex items-center gap-2 text-sm [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
      className,
    )}
    {...props}
  />
);
