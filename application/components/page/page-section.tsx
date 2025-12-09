import type { ComponentProps, FC, PropsWithChildren } from "react";

export const PageSection: FC<PropsWithChildren<ComponentProps<"div">>> = ({
  children,
  ...props
}) => {
  return <div {...props}>{children}</div>;
};
