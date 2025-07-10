import type { ComponentProps, FC } from "react";
import * as React from "react";
import { cn } from "~/utils/create-class-name";

export const SidebarGroup: FC<ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      data-sidebar="group"
      data-slot="sidebar-group"
      {...props}
    />
  );
};