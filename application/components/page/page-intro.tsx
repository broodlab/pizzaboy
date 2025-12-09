import type { ComponentProps, FC, PropsWithChildren } from "react";
import { cn } from "~/utils/create-class-name";

export const PageIntro: FC<PropsWithChildren<ComponentProps<"p">>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p className={cn("text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
};
