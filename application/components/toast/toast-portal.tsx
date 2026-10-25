import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import type { FC } from "react";

export const ToastPortal: FC<ToastPrimitive.Portal.Props> = ({ ...props }) => {
  return <ToastPrimitive.Portal data-slot="toast-portal" {...props} />;
};
