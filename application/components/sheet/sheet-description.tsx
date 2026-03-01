import type { ComponentProps, FC } from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cn } from "~/utils/create-class-name";

export const SheetDescription: FC<
  ComponentProps<typeof SheetPrimitive.Description>
> = ({ className, ...props }) => {
  return (
    <SheetPrimitive.Description
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="sheet-description"
      {...props}
    />
  );
};
