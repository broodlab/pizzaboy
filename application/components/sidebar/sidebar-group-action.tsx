import type { ComponentProps, FC } from "react";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "~/utils/create-class-name";

export const SidebarGroupAction: FC<
  ComponentProps<"button"> & { asChild?: boolean }
> = ({ asChild = false, className, ...props }) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      data-sidebar="group-action"
      data-slot="sidebar-group-action"
      {...props}
    />
  );
};
