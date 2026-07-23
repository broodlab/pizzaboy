import type { Notification } from "~/utils/notifications.v2/types";

export const requestNotification = ({
  id,
  parameters,
  searchParams = new URLSearchParams(),
}: {
  id: string;
  parameters?: Record<string, string>;
  searchParams?: URLSearchParams;
}) => {
  const notification: Notification = {
    id,
    requestId: crypto.randomUUID(),
    parameters,
  };

  searchParams.set("n", JSON.stringify(notification));

  return searchParams;
};
