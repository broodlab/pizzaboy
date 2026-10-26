import { cn } from "~/utils/create-class-name";
import type { ComponentProps, FC } from "react";

export const SidebarMenu: FC<ComponentProps<"ul">> = ({
  className,
  ...props
}) => {
  return (
    <ul
      className={cn("flex w-full min-w-0 flex-col gap-0", className)}
      data-sidebar="menu"
      data-slot="sidebar-menu"
      {...props}
    />
  );
};
