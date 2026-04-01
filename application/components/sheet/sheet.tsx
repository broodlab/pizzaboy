import type { FC } from "react";
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";

export const Sheet: FC<SheetPrimitive.Root.Props> = ({ ...props }) => {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
};
