import type { ComponentProps, FC } from "react";
import { cn } from "~/utils/create-class-name";

export const SheetFooter: FC<ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      data-slot="sheet-footer"
      {...props}
    />
  );
};
