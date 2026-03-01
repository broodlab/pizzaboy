import { type ComponentProps, type FC } from "react";

export const NativeSelect: FC<ComponentProps<"select">> = ({
  defaultValue,
  ...props
}) => {
  return (
    <select
      className="border-input focus-visible:outline-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:outline-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-full rounded-md border-r-8 border-transparent bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs outline outline-gray-200 transition-[color,box-shadow] focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8"
      data-slot="select"
      {...props}
    />
  );
};
