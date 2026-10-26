import { cn } from "~/utils/create-class-name";
import { PanelLeftIcon } from "lucide-react";
import { Button } from "~/components/button";
import type { ComponentProps, FC } from "react";
import { useSidebar } from "~/components/sidebar/use-sidebar";

export const SidebarTrigger: FC<ComponentProps<typeof Button>> = ({
  className,
  onClick,
  ...props
}) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      className={cn(className)}
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      size="icon-sm"
      variant="ghost"
      {...props}
    >
      <PanelLeftIcon className="cn-rtl-flip" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
};
