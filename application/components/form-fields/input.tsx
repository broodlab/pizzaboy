import type { FC, InputHTMLAttributes } from "react";
import { cn } from "~/utils/create-class-name";

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  type,
  ...props
}) => {
  return (
    <input
      className={cn("border-1 border-gray-200", className)}
      type={type}
      {...props}
    />
  );
};
