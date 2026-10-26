import { useRender } from "@base-ui/react/use-render";
import { mergeProps } from "@base-ui/react/merge-props";
import { cn } from "~/utils/create-class-name";
import type { ComponentProps, FC } from "react";

export const SidebarGroupLabel: FC<
  useRender.ComponentProps<"div"> & ComponentProps<"div">
> = ({ className, render, ...props }) => {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      sidebar: "group-label",
      slot: "sidebar-group-label",
    },
  });
};
