import type { ComponentProps, FC } from "react";
import { cn } from "~/utils/create-class-name";

export const TableCaption: FC<ComponentProps<"caption">> = ({
  className,
  ...props
}) => {
  return (
    <caption
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      data-slot="table-caption"
      {...props}
    />
  );
};
