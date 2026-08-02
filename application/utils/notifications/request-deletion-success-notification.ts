import { requestNotification } from "~/utils/notifications/request-notification";
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
