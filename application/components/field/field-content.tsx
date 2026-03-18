import { cn } from "~/utils/create-class-name";
import type { ComponentProps, FC } from "react";

export const FieldContent: FC<ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "group/field-content flex flex-1 flex-col gap-0.5 leading-snug",
        className,
      )}
      data-slot="field-content"
      {...props}
    />
  );
};
