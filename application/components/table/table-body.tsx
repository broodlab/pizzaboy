import type { ComponentProps, FC } from "react";
import { cn } from "~/utils/create-class-name";

export const TableBody: FC<ComponentProps<"tbody">> = ({
  className,
  ...props
}) => {
  return (
    <tbody
      className={cn("[&_tr:last-child]:border-0", className)}
      data-slot="table-body"
      {...props}
    />
  );
};
