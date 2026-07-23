import { useMemo } from "react";
import { alertFactories } from "~/utils/notifications.v2/factories/alert-factories";
import { toastFactories } from "~/utils/notifications.v2/factories/toast-factories";
import type { Notification } from "~/utils/notifications.v2/types";

export const useNotificationFactories = (notification: Notification) =>
  useMemo(() => {
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

    return [alertFactory, toastFactory] as const;
  }, [notification.id]);
