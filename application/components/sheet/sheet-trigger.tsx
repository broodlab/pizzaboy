import type { FC } from "react";
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";

export const SheetTrigger: FC<SheetPrimitive.Trigger.Props> = ({
  ...props
}) => {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
};
