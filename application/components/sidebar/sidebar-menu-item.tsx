import type { ComponentProps, FC } from "react";
import { cn } from "~/utils/create-class-name";

export const SidebarMenuItem: FC<ComponentProps<"li">> = ({
  className,
  ...props
}) => {
  return (
    <li
      className={cn("group/menu-item relative", className)}
      data-sidebar="menu-item"
      data-slot="sidebar-menu-item"
      {...props}
    />
  );
};
