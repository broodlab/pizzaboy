import type { FC, LabelHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "~/utils/create-class-name";

export const Label: FC<
  PropsWithChildren<LabelHTMLAttributes<HTMLLabelElement>>
> = ({ className, children, ...props }) => {
  return (
    <label className={cn("font-semibold", className)} {...props}>
      {children}
    </label>
  );
};
