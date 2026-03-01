import type { ComponentProps, FC } from "react";
import { cn } from "~/utils/create-class-name";

export const SidebarMenuSubItem: FC<ComponentProps<"li">> = ({
  className,
  ...props
}) => {
  return (
    <li
      className={cn("group/menu-sub-item relative", className)}
      data-sidebar="menu-sub-item"
      data-slot="sidebar-menu-sub-item"
      {...props}
    />
  );
};
