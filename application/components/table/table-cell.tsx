import type { ComponentProps, FC } from "react";
import { cn } from "~/utils/create-class-name";

export const TableCell: FC<ComponentProps<"td">> = ({
  className,
  ...props
}) => {
  return (
    <td
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      data-slot="table-cell"
      {...props}
    />
  );
};
