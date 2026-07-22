import { type FC, useEffect, useRef } from "react";
import type { Entity } from "~/types/entities";
import { generatePath, useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { capitalize } from "~/utils/strings";
import type { Notification } from "~/utils/notifications.v2/types";

export const Toasts: FC<{ notification: Notification }> = ({
  notification,
}) => {
  return <div>Toasts {JSON.stringify(notification)}</div>;
};
