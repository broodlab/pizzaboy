import type { FC, PropsWithChildren } from "react";
import { Alert, AlertDescription, AlertTitle } from "~/components/alert";
import { AlertCircleIcon } from "lucide-react";

export const ErrorAlert: FC<PropsWithChildren<{ title: string }>> = ({
  children,
  title,
}) => (
  <Alert variant="destructive">
    <AlertCircleIcon />
    <AlertTitle>{title}</AlertTitle>
    <AlertDescription>{children}</AlertDescription>
  </Alert>
);
