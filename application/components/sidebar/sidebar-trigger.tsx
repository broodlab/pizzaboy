import type { ComponentProps, FC } from "react";
import * as React from "react";
import { Button } from "~/components/button";
import { cn } from "~/utils/create-class-name";
import { PanelLeftIcon } from "lucide-react";
import { useSidebar } from "~/components/sidebar";

export const SidebarTrigger: FC<ComponentProps<typeof Button>> = ({
  className,
  onClick,
  ...props
}) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      className={cn("size-7", className)}
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      size="icon"
      variant="ghost"
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
};
