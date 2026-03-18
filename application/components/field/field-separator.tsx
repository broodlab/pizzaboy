import type { ComponentProps, FC, ReactNode } from "react";
import { cn } from "~/utils/create-class-name";
import { Separator } from "~/components/separator";

export const FieldSeparator: FC<
  ComponentProps<"div"> & {
    children?: ReactNode;
  }
> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
        className,
      )}
      data-content={!!children}
      data-slot="field-separator"
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="text-muted-foreground bg-background relative mx-auto block w-fit px-2"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  );
};
