import type { FC } from "react";
import { Alert, AlertDescription, AlertTitle } from "~/components/alert";
import { CheckCircle2Icon as SuccessIcon } from "lucide-react";

export const SuccessAlert: FC<{ description: string; title: string }> = ({
  description,
  title,
}) => (
  <Alert className="text-green-600">
    <SuccessIcon />
    <AlertTitle>{title}</AlertTitle>
    <AlertDescription>{description}</AlertDescription>
  </Alert>
);
