import { useSearchParams } from "react-router";
import { useMemo } from "react";
import { z } from "zod";
import type { Notification } from "~/utils/notifications.v2/types";
import { jsonCodec } from "~/utils/json-codec";

const notificationSchema = z.object({
  id: z.string(),
  parameters: z.record(z.string(), z.string()).optional(),
  requestId: z.string(),
});

const notificationJsonCodec = jsonCodec(notificationSchema);

export const useNotification = (): null | Notification => {
  const [searchParams] = useSearchParams();
  const rawNotification = searchParams.get("n");

  return useMemo(() => {
    if (rawNotification === null) {
      return null;
    }

    let notification: null | Notification = null;
    try {
      notification = notificationJsonCodec.decode(rawNotification);
    } catch {
      throw new Error(
        "The notification query parameter value has an invalid format.",
      );
    }

    return notification;
  }, [rawNotification]);
};
