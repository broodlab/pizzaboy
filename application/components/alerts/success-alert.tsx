import type { FC, PropsWithChildren } from "react";
import { Alert, AlertDescription, AlertTitle } from "~/components/alert";
import { CheckCircle2Icon as SuccessIcon } from "lucide-react";

export const SuccessAlert: FC<PropsWithChildren<{ title: string }>> = ({
  children,
  title,
}) => (
  <Alert className="text-green-600">
    <SuccessIcon />
    <AlertTitle>{title}</AlertTitle>
    <AlertDescription>{children}</AlertDescription>
  </Alert>
);
