import type { FC } from "react";
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { cn } from "~/utils/create-class-name";

export const SheetDescription: FC<SheetPrimitive.Description.Props> = ({
  className,
  ...props
}) => {
  return (
    <SheetPrimitive.Description
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="sheet-description"
      {...props}
    />
  );
};
