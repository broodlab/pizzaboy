import { cn } from "~/utils/create-class-name";
import type { ComponentProps, FC } from "react";

export const SidebarFooter: FC<ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn("flex flex-col gap-2 p-2", className)}
      data-sidebar="footer"
      data-slot="sidebar-footer"
      {...props}
    />
  );
};
