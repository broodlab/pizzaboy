import type { ComponentProps, FC } from "react";
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "~/utils/create-class-name";
import { AsteriskIcon } from "lucide-react";

export const Label: FC<
  ComponentProps<typeof LabelPrimitive.Root> & { required?: boolean }
> = ({ children, className, required, ...props }) => {
  return (
    <LabelPrimitive.Root
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      data-slot="label"
      {...props}
    >
      {children}
      {required && (
        <AsteriskIcon className="-mt-2 -ml-2 text-red-500" size={12} />
      )}
    </LabelPrimitive.Root>
  );
};
