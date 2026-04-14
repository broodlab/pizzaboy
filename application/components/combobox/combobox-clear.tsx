import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { XIcon } from "lucide-react";
import { InputGroupButton } from "~/components/input-group";
import { cn } from "~/utils/create-class-name";

export const ComboboxClear = ({
  className,
  ...props
}: ComboboxPrimitive.Clear.Props) => (
  <ComboboxPrimitive.Clear
    className={cn(className)}
    data-slot="combobox-clear"
    render={
      <InputGroupButton size="icon-xs" variant="ghost">
        <XIcon className="pointer-events-none" />
      </InputGroupButton>
    }
    {...props}
  />
);
