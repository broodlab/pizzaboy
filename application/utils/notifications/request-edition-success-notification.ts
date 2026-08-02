import { requestNotification } from "~/utils/notifications/request-notification";
import type { Entity } from "~/types/entities";

export const requestEditionSuccessNotification = ({
  editionPath,
  entity,
  name,
  searchParams,
}: {
  editionPath: string;
  entity: Entity;
  name: string;
  searchParams?: URLSearchParams;
}) =>
  requestNotification({
    id: "editionSuccess",
    parameters: {
      editionPath,
      entity,
      name,
    },
    searchParams,
  });
