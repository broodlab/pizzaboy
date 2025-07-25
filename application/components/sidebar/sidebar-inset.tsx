import type { ComponentProps, FC } from "react";
import * as React from "react";
import { cn } from "~/utils/create-class-name";

export const SidebarInset: FC<ComponentProps<"main">> = ({
  className,
  ...props
}) => {
  return (
    <main
      className={cn(
        "bg-background relative flex h-full w-full flex-1 flex-col p-6 pt-0 md:p-10 md:pt-0",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className,
      )}
      data-slot="sidebar-inset"
      {...props}
    />
  );
};
