import type { ComponentProps, FC } from "react";
import { Button } from "~/components/button";
import { cn } from "~/utils/create-class-name";

export const AlertDialogAction: FC<ComponentProps<typeof Button>> = ({
  className,
  ...props
}) => {
  return (
    <Button
      className={cn(className)}
      data-slot="alert-dialog-action"
      {...props}
    />
  );
};
