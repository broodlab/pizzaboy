import type { ComponentProps, FC } from "react";
import { cn } from "~/utils/create-class-name";

export const SidebarGroupContent: FC<ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn("w-full text-sm", className)}
      data-sidebar="group-content"
      data-slot="sidebar-group-content"
      {...props}
    />
  );
};
