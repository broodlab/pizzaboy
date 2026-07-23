import { SuccessAlert } from "~/components/alerts/success-alert";
import type { AlertFactory } from "~/utils/notifications.v2/types";

export const alertFactories: Record<string, AlertFactory> = {
  "sizes.storageSucceeded": () => (
    <SuccessAlert title={"Storage Success"}>
      The size(s) have been successfully saved.
    </SuccessAlert>
  ),
};
