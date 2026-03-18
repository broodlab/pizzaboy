import type { ComponentProps, FC } from "react";
import { Label } from "~/components/label";
import { cn } from "~/utils/create-class-name";

export const FieldLabel: FC<ComponentProps<typeof Label>> = ({
  className,
  ...props
}) => {
  return (
    <Label
      className={cn(
        "has-data-checked:bg-primary/5 has-data-checked:border-primary/30 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10 group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border *:data-[slot=field]:p-2.5",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
        className,
      )}
      data-slot="field-label"
      {...props}
    />
  );
};
