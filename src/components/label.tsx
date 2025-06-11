import type { FC, LabelHTMLAttributes, PropsWithChildren } from "react";
import { createClassName } from "~/utils/create-class-name";

export const Label: FC<
  PropsWithChildren<LabelHTMLAttributes<HTMLLabelElement>>
> = ({ className, children, ...props }) => {
  return (
    <label className={createClassName("font-semibold", className)} {...props}>
      {children}
    </label>
  );
};
