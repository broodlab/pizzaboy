import type { ComponentProps, FC } from "react";
import { cn } from "~/utils/create-class-name";

export const TableHeader: FC<ComponentProps<"thead">> = ({
  className,
  ...props
}) => {
  return (
    <thead
      className={cn("[&_tr]:border-b", className)}
      data-slot="table-header"
      {...props}
    />
  );
};
