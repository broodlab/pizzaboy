import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, FC } from "react";
import { cn } from "~/utils/create-class-name";

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
  {
    defaultVariants: {
      align: "inline-start",
    },
    variants: {
      align: {
        "inline-start":
          "order-first pl-2 has-[>button]:ml-[-0.3rem] has-[>kbd]:ml-[-0.15rem]",
        "inline-end":
          "order-last pr-2 has-[>button]:mr-[-0.3rem] has-[>kbd]:mr-[-0.15rem]",
        "block-start":
          "order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2",
        "block-end":
          "order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2",
      },
    },
  },
);

export const InputGroupAddon: FC<
  ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>
> = ({ align = "inline-start", className, ...props }) => (
  <div
    className={cn(inputGroupAddonVariants({ align }), className)}
    data-align={align}
    data-slot="input-group-addon"
    onClick={(e) => {
      if ((e.target as HTMLElement).closest("button")) {
        return;
      }
      e.currentTarget.parentElement?.querySelector("input")?.focus();
    }}
    role="group"
    {...props}
  />
);
