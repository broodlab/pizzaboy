import { type FC } from "react";
import type { Entity } from "~/types/entities";
import { useScripting } from "~/hooks/use-scripting";
import { Alerts } from "~/utils/notifications.v2/components/alerts";
import { Toasts } from "~/utils/notifications.v2/components/toasts";
import { useAlertsVisibility } from "~/utils/notifications.v2/hooks/use-alerts-visibility";
import { useNotification } from "~/utils/notifications.v2/hooks/use-notification";

export const Notifications: FC = () => {
  const notification = useNotification();
  const isScripting = useScripting();
  const [alertsId, alertsVisible] = useAlertsVisibility();
  const displayAlerts =
    (!isScripting && !alertsVisible) || (isScripting && alertsVisible);
  const displayToasts = !displayAlerts;

  return (
    <>
      {notification !== null && displayAlerts && (
        <div className="deferredVisibility" id={alertsId}>
          <Alerts notification={notification} />
        </div>
      )}
      {notification !== null && displayToasts && (
        <Toasts notification={notification} />
      )}
    </>
  );
};
