import type { ComponentProps, FC } from "react";
import { Input } from "~/components/input";
import { cn } from "~/utils/create-class-name";

export const SidebarInput: FC<ComponentProps<typeof Input>> = ({
  className,
  ...props
}) => {
  return (
    <Input
      className={cn("bg-background h-8 w-full shadow-none", className)}
      data-sidebar="input"
      data-slot="sidebar-input"
      {...props}
    />
  );
};