import { cva, type VariantProps } from "class-variance-authority";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "~/utils/create-class-name";
import { mergeProps } from "@base-ui/react/merge-props";
import { useSidebar } from "~/components/sidebar/use-sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/tooltip";
import type { ComponentProps, FC } from "react";

const sidebarMenuButtonVariants = cva(
  "peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-8 text-sm",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
        sm: "h-7 text-xs",
      },
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]",
      },
    },
  },
);

export const SidebarMenuButton: FC<
  useRender.ComponentProps<"button"> &
    ComponentProps<"button"> & {
      isActive?: boolean;
      tooltip?: string | ComponentProps<typeof TooltipContent>;
    } & VariantProps<typeof sidebarMenuButtonVariants>
> = ({
  className,
  isActive = false,
  render,
  size = "default",
  tooltip,
  variant = "default",
  ...props
}) => {
  const { isMobile, state } = useSidebar();
  const component = useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(sidebarMenuButtonVariants({ size, variant }), className),
      },
      props,
    ),
    render: !tooltip ? render : <TooltipTrigger render={render} />,
    state: {
      active: isActive,
      sidebar: "menu-button",
      size,
      slot: "sidebar-menu-button",
    },
  });

  if (!tooltip) {
    return component;
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      {component}
      <TooltipContent
        align="center"
        hidden={state !== "collapsed" || isMobile}
        side="right"
        {...tooltip}
      />
    </Tooltip>
  );
};
