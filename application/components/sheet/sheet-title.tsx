import type { ComponentProps, FC } from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cn } from "~/utils/create-class-name";

export const SheetTitle: FC<ComponentProps<typeof SheetPrimitive.Title>> = ({
  className,
  ...props
}) => {
  return (
    <SheetPrimitive.Title
      className={cn("text-foreground font-semibold", className)}
      data-slot="sheet-title"
      {...props}
    />
  );
};
