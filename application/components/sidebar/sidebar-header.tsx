import type { ComponentProps, FC } from "react";
import { cn } from "~/utils/create-class-name";

export const SidebarHeader: FC<ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn("flex flex-col gap-2 p-2", className)}
      data-sidebar="header"
      data-slot="sidebar-header"
      {...props}
    />
  );
};
