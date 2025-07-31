import type { ComponentProps, FC } from "react";
import { cn } from "~/utils/create-class-name";

export const TableRow: FC<ComponentProps<"tr">> = ({ className, ...props }) => {
  return (
    <tr
      className={cn(
        "data-[state=selected]:bg-muted hover:bg-muted/50 border-b transition-colors",
        className,
      )}
      data-slot="table-row"
      {...props}
    />
  );
};
