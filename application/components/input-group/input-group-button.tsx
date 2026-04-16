import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, FC } from "react";
import { Button } from "~/components/button";
import { cn } from "~/utils/create-class-name";

const inputGroupButtonVariants = cva(
  "flex items-center gap-2 text-sm shadow-none",
  {
    defaultVariants: {
      size: "xs",
    },
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
        sm: "",
        "icon-xs":
          "size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0",
        "icon-sm": "size-8 p-0 has-[>svg]:p-0",
      },
    },
  },
);

export const InputGroupButton: FC<
  Omit<ComponentProps<typeof Button>, "size" | "type"> &
    VariantProps<typeof inputGroupButtonVariants> & {
      type?: "button" | "reset" | "submit";
    }
> = ({
  className,
  size = "xs",
  type = "button",
  variant = "ghost",
  ...props
}) => (
  <Button
    className={cn(inputGroupButtonVariants({ size }), className)}
    data-size={size}
    type={type}
    variant={variant}
    {...props}
  />
);
