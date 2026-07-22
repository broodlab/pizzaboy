import { type FC, type PropsWithChildren } from "react";
import type { Entity } from "~/types/entities";
import { generatePath, Link, useSearchParams } from "react-router";
import { SuccessAlert } from "~/components/alerts/success-alert";
import { capitalize } from "~/utils/strings";
import { clearNotificationSearchParams } from "~/utils/notifications/search-params/clear-notification-search-params";
import type { Notification } from "~/utils/notifications.v2/types";

export const Alerts: FC<{ notification: Notification }> = ({
  notification,
}) => {
  return <div>Alerts {JSON.stringify(notification)}</div>;
};
