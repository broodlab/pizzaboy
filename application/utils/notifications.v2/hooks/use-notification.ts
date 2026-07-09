import { useSearchParams } from "react-router";
import { useMemo, useRef } from "react";
import { notifications } from "~/i18n/notifications";

export const useNotification = () => {
  const [searchParams] = useSearchParams();
  const notificationId = searchParams.get("nid");

  return useMemo(
    () => (notificationId !== null ? notifications[notificationId] : null),
    [notificationId],
  );
};
