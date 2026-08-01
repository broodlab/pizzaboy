import { requestNotification } from "~/utils/notifications.v2/request-notification";
import type { Entity } from "~/types/entities";

export const requestDeletionSuccessNotification = ({
  entity,
  name,
  searchParams,
}: {
  entity: Entity;
  name: string;
  searchParams?: URLSearchParams;
}) =>
  requestNotification({
    id: "deletionSuccess",
    parameters: {
      entity,
      name,
    },
    searchParams,
  });
