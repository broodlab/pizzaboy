import type { FC, TextareaHTMLAttributes } from "react";
import { cn } from "~/utils/create-class-name";

export const Textarea: FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  className,
  ...props
}) => {
  return (
    <textarea
      className={cn("border-1 border-gray-200", className)}
      {...props}
    />
  );
};
