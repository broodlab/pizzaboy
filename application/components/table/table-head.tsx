import type { ComponentProps, FC } from "react";
import { cn } from "~/utils/create-class-name";

export const TableHead: FC<ComponentProps<"th">> = ({
  className,
  ...props
}) => {
  return (
    <th
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        className,
      )}
      data-slot="table-head"
      {...props}
    />
  );
};
