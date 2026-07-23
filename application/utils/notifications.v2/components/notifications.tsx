import { type FC, useRef } from "react";
import { useScripting } from "~/hooks/use-scripting";
import { useAlertVisibility } from "~/utils/notifications.v2/hooks/use-alert-visibility";
import { useNotificationFactories } from "~/utils/notifications.v2/hooks/use-notification-factories";
import { useNotification } from "~/utils/notifications.v2/hooks/use-notification";
import type { Notification } from "~/utils/notifications.v2/types";

export const Notifications: FC = () => {
  const notification = useNotification();

  if (notification === null) {
    return null;
  }

  return <NotificationRenderer notification={notification} />;
};

const NotificationRenderer: FC<{ notification: Notification }> = ({
  notification,
}) => {
  const isScripting = useScripting();
  const [alertId, alertVisible] = useAlertVisibility();
  const displayAlert =
    (!isScripting && !alertVisible) || (isScripting && alertVisible);
  const displayToast = !displayAlert;
  const lastNotificationRequestIdRef = useRef<null | string>(null);
  const [alertFactory, toastFactory] = useNotificationFactories(notification);

  if (displayAlert) {
    return (
      <div className="deferredVisibility" id={alertId}>
        {alertFactory()}
      </div>
    );
  }

  if (
    displayToast &&
    lastNotificationRequestIdRef.current !== notification.requestId
  ) {
    lastNotificationRequestIdRef.current = notification.requestId;
    toastFactory();
  }

  return null;
};
