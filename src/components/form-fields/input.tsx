import type { FC, InputHTMLAttributes } from "react";
import { createClassName } from "~/utils/create-class-name";

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  type,
  ...props
}) => {
  return (
    <input
      className={createClassName("border-1 border-gray-200", className)}
      type={type}
      {...props}
    />
  );
};
