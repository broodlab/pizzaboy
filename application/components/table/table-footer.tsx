import type { ComponentProps, FC } from "react";
import { cn } from "~/utils/create-class-name";

export const TableFooter: FC<ComponentProps<"tfoot">> = ({
  className,
  ...props
}) => {
  return (
    <tfoot
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className,
      )}
      data-slot="table-footer"
      {...props}
    />
  );
};
