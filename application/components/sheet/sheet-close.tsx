import type { FC } from "react";
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";

export const SheetClose: FC<SheetPrimitive.Close.Props> = ({ ...props }) => {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
};
