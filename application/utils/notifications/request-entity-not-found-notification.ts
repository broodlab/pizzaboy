import { requestNotification } from "~/utils/notifications/request-notification";
import type { Entity } from "~/types/entities";

export const requestEntityNotFoundNotification = ({
  entity,
  searchParams,
}: {
  entity: Entity;
  searchParams?: URLSearchParams;
}) =>
  requestNotification({
    id: "entityNotFound",
    parameters: {
      entity,
    },
    searchParams,
  });
