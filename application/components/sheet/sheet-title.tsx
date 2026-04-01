import type { FC } from "react";
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { cn } from "~/utils/create-class-name";

export const SheetTitle: FC<SheetPrimitive.Title.Props> = ({
  className,
  ...props
}) => {
  return (
    <SheetPrimitive.Title
      className={cn(
        "cn-font-heading text-foreground text-base font-medium",
        className,
      )}
      data-slot="sheet-title"
      {...props}
    />
  );
};
