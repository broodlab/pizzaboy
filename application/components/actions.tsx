import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/utils/create-class-name";
import type { ComponentProps, FC } from "react";

const buttonContainerVariants = cva(
  "flex flex-col-reverse gap-2 sm:flex-row [&_svg]:invisible sm:[&_svg]:visible",
  {
    defaultVariants: {
      alignment: "left",
    },
    variants: {
      alignment: {
        left: "sm:justify-start",
        right: "sm:justify-end",
      },
    },
  },
);

export const Actions: FC<
  ComponentProps<"div"> & VariantProps<typeof buttonContainerVariants>
> = ({ className, alignment = "left", ...props }) => {
  return (
    <div
      className={cn(buttonContainerVariants({ alignment }), className)}
      data-slot="button-container"
      role="group"
      {...props}
    />
  );
};
