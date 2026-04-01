import type { FC } from "react";
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";

export const SheetPortal: FC<SheetPrimitive.Portal.Props> = ({ ...props }) => {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
};
