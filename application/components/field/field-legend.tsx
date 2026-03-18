import type { ComponentProps, FC } from "react";
import { cn } from "~/utils/create-class-name";

export const FieldLegend: FC<
  ComponentProps<"legend"> & { variant?: "legend" | "label" }
> = ({ className, variant = "legend", ...props }) => {
  return (
    <legend
      className={cn(
        "mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base",
        className,
      )}
      data-slot="field-legend"
      data-variant={variant}
      {...props}
    />
  );
};
