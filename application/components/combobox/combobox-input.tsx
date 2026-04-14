import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import type { FC, ReactNode } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "~/components/input-group";
import { cn } from "~/utils/create-class-name";
import { ComboboxTrigger } from "./combobox-trigger";
import { ComboboxClear } from "./combobox-clear";

export const ComboboxInput: FC<
  ComboboxPrimitive.Input.Props & {
    children?: ReactNode;
    disabled?: boolean;
    showClear?: boolean;
    showTrigger?: boolean;
  }
> = ({
  className,
  children,
  disabled = false,
  showClear = false,
  showTrigger = true,
  ...props
}) => (
  <InputGroup className={cn("w-auto", className)}>
    <ComboboxPrimitive.Input
      render={<InputGroupInput disabled={disabled} />}
      {...props}
    />
    <InputGroupAddon align="inline-end">
      {showTrigger && (
        <InputGroupButton
          className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
          data-slot="input-group-button"
          disabled={disabled}
          render={<ComboboxTrigger />}
          size="icon-xs"
          variant="ghost"
        />
      )}
      {showClear && <ComboboxClear disabled={disabled} />}
    </InputGroupAddon>
    {children}
  </InputGroup>
);
