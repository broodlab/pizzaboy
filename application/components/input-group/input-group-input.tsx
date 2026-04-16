import type { ComponentProps, FC } from "react";
import { Input } from "~/components/input";
import { cn } from "~/utils/create-class-name";

export const InputGroupInput: FC<ComponentProps<"input">> = ({
  className,
  ...props
}) => (
  <Input
    className={cn(
      "flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent",
      className,
    )}
    data-slot="input-group-control"
    {...props}
  />
);
