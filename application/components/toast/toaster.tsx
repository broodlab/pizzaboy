import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import type { FC } from "react";
import { ToastList } from "~/components/toast/toast-list";
import { toastManager as sharedToastManager } from "~/components/toast/toast-manager";
import { ToastPortal } from "~/components/toast/toast-portal";
import { ToastProvider } from "~/components/toast/toast-provider";
import { ToastViewport } from "~/components/toast/toast-viewport";

export const Toaster: FC<ToastPrimitive.Provider.Props> = ({
  children,
  toastManager = sharedToastManager,
  ...props
}) => {
  return (
    <ToastProvider toastManager={toastManager} {...props}>
      {children}
      <ToastPortal>
        <ToastViewport>
          <ToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  );
};
