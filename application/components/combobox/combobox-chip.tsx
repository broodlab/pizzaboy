import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { XIcon } from "lucide-react";
import type { FC, ReactNode } from "react";
import { Button } from "~/components/button";
import { cn } from "~/utils/create-class-name";

export const ComboboxChip: FC<
  ComboboxPrimitive.Chip.Props & {
    children?: ReactNode;
    showRemove?: boolean;
  }
> = ({ children, className, showRemove = true, ...props }) => (
  <ComboboxPrimitive.Chip
    className={cn(
      "bg-muted text-foreground flex h-[calc(--spacing(5.25))] w-fit items-center justify-center gap-1 rounded-sm px-1.5 text-xs font-medium whitespace-nowrap has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pr-0",
      className,
    )}
    data-slot="combobox-chip"
    {...props}
  >
    {children}
    {showRemove && (
      <ComboboxPrimitive.ChipRemove
        className="-ml-1 opacity-50 hover:opacity-100"
        data-slot="combobox-chip-remove"
        render={
          <Button size="icon-xs" variant="ghost">
            <XIcon className="pointer-events-none" />
          </Button>
        }
      />
    )}
  </ComboboxPrimitive.Chip>
);
