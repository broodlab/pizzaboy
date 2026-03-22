import { type ComponentProps, type FC, useMemo } from "react";
import { cn } from "~/utils/create-class-name";

export const FieldError: FC<
  ComponentProps<"div"> & {
    errors?: string[];
  }
> = ({ className, children, errors, ...props }) => {
  const content = useMemo(() => {
    if (children) {
      return children;
    }

    if (!errors?.length) {
      return null;
    }

    const uniqueErrors = Array.from(new Set(errors));

    if (uniqueErrors.length == 1) {
      return uniqueErrors[0];
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map(
          (error, index) => error && <li key={index}>{error}</li>,
        )}
      </ul>
    );
  }, [children, errors]);

  if (!content) {
    return null;
  }

  return (
    <div
      className={cn("text-destructive text-sm font-normal", className)}
      data-slot="field-error"
      role="alert"
      {...props}
    >
      {content}
    </div>
  );
};
