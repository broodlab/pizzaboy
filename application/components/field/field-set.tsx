import type { ComponentProps, FC } from "react";
import { cn } from "~/utils/create-class-name";

export const FieldSet: FC<ComponentProps<"fieldset">> = ({
  className,
  ...props
}) => {
  return (
    <fieldset
      className={cn(
        "flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className,
      )}
      data-slot="field-set"
      {...props}
    />
  );
};
