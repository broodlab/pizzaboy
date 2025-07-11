import type { ComponentProps, FC } from "react";
import * as React from "react";
import { Separator } from "~/components/separator";
import { cn } from "~/utils/create-class-name";

export const SidebarSeparator: FC<ComponentProps<typeof Separator>> = ({
  className,
  ...props
}) => {
  return (
    <Separator
      className={cn("bg-sidebar-border mx-2 w-auto", className)}
      data-sidebar="separator"
      data-slot="sidebar-separator"
      {...props}
    />
  );
};
