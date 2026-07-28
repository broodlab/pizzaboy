import { useMemo } from "react";
import { alertFactories } from "~/utils/notifications.v2/factories/alert-factories";
import { toastFactories } from "~/utils/notifications.v2/factories/toast-factories";
import type { Notification } from "~/utils/notifications.v2/types";
import { useNavigate } from "react-router";
import { useNotificationlessSearchParams } from "~/utils/notifications.v2";

export const useNotificationFactories = (notification: Notification) => {
  const [searchParams] = useNotificationlessSearchParams();
  const navigate = useNavigate();

  return useMemo(() => {
    const alertFactory = alertFactories[notification.id];
    if (alertFactory === undefined) {
      throw new Error(
        `No alert factory registered for notification id '${notification.id}'.`,
      );
    }

    const toastFactory = toastFactories[notification.id];
    if (toastFactory === undefined) {
      throw new Error(
        `No toast factory registered for notification id '${notification.id}'.`,
      );
    }

    return [
      () =>
        alertFactory({
          parameters: notification.parameters,
          searchParams,
        }),
      () =>
        toastFactory({
          navigate,
          parameters: notification.parameters,
          searchParams,
        }),
    ] as const;
  }, [notification.id]);
};
