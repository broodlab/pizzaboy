import { cn } from "~/utils/create-class-name";
import type { ComponentProps, FC } from "react";

export const SidebarContent: FC<ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className,
      )}
      data-sidebar="content"
      data-slot="sidebar-content"
      {...props}
    />
  );
};
