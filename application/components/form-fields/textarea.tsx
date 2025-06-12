import type { FC, TextareaHTMLAttributes } from "react";
import { createClassName } from "~/utils/create-class-name";

export const Textarea: FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  className,
  ...props
}) => {
  return (
    <textarea
      className={createClassName("border-1 border-gray-200", className)}
      {...props}
    />
  );
};
