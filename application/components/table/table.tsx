import type { ComponentProps, FC } from "react";
import { cn } from "~/utils/create-class-name";

export const Table: FC<ComponentProps<"table">> = ({ className, ...props }) => {
  return (
    <div
      className="relative w-full overflow-x-auto"
      data-slot="table-container"
    >
      <table
        className={cn("w-full caption-bottom text-sm", className)}
        data-slot="table"
        {...props}
      />
    </div>
  );
};
