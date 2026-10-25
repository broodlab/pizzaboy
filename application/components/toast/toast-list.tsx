import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import type { FC } from "react";
import { ToastAction } from "~/components/toast/toast-action";
import { ToastClose } from "~/components/toast/toast-close";
import { ToastContent } from "~/components/toast/toast-content";
import { ToastDescription } from "~/components/toast/toast-description";
import { ToastIcon } from "~/components/toast/toast-icon";
import { Toast } from "~/components/toast/toast";
import { ToastTitle } from "~/components/toast/toast-title";

export const ToastList: FC = () => {
  const { toasts } = ToastPrimitive.useToastManager();

  return toasts.map((toastItem) => (
    <Toast key={toastItem.id} toast={toastItem}>
      <ToastContent>
        <ToastIcon type={toastItem.type} />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <ToastTitle />
          <ToastDescription />
        </div>
        <ToastAction />
        <ToastClose />
      </ToastContent>
    </Toast>
  ));
};
