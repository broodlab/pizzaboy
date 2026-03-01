import { type FC } from "react";
import { cn } from "~/utils/create-class-name";
import { AlertDialogPortal } from "~/components/alert-dialog/alert-dialog-portal";
import { AlertDialogOverlay } from "~/components/alert-dialog/alert-dialog-overlay";
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";

export const AlertDialogContent: FC<
  AlertDialogPrimitive.Popup.Props & {
    size?: "default" | "sm";
  }
> = ({ className, size = "default", ...props }) => {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Popup
        data-slot="alert-dialog-content"
        data-size={size}
        className={cn(
          "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 bg-background ring-foreground/10 group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl p-4 ring-1 duration-100 outline-none data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm",
          className,
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
};
