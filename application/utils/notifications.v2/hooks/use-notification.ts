import { useSearchParams } from "react-router";
import { useMemo } from "react";
import type { Notification } from "~/utils/notifications.v2/types";

export const useNotification = (): Notification => {
  const [searchParams] = useSearchParams();
  const rawNotification = searchParams.get("n");

  return useMemo(() => {
    if (rawNotification === null) {
      return null;
    }
    return JSON.parse(rawNotification);
  }, [rawNotification]);
};
