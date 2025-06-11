import type { FC, PropsWithChildren, SelectHTMLAttributes } from "react";
import { createClassName } from "~/utils/create-class-name";

export const Select: FC<
  PropsWithChildren<SelectHTMLAttributes<HTMLSelectElement>>
> = ({ className, children, ...props }) => {
  return (
    <select
      className={createClassName("border-1 border-gray-200", className)}
      {...props}
    >
      {children}
    </select>
  );
};
