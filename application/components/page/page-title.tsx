import type { ComponentProps, FC, PropsWithChildren } from "react";
import { cn } from "~/utils/create-class-name";

export const PageTitle: FC<PropsWithChildren<ComponentProps<"h1">>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h1 className={cn("text-2xl font-semibold", className)} {...props}>
      {children}
    </h1>
  );
};
