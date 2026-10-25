import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import type { FC } from "react";

export const ToastProvider: FC<ToastPrimitive.Provider.Props> = ({
  ...props
}) => {
  return <ToastPrimitive.Provider {...props} />;
};
