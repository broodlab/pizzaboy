import { type FC, useEffect, useRef } from "react";
import type { Entity } from "~/types/entities";
import { generatePath, useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { capitalize } from "~/utils/strings";

const toastDuration = 10_000;

export const Toasts: FC<{ editionPath: string; entity: Entity }> = ({
  editionPath,
  entity,
}) => {
  const [searchParams] = useSearchParams();
  const lastNotificationRef = useRef<null | string>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const creationSuccess =
      searchParams.has("cs_mid") &&
      searchParams.has("cs_eid") &&
      searchParams.has("cs_ena");
    const editionSuccess =
      searchParams.has("es_mid") &&
      searchParams.has("es_eid") &&
      searchParams.has("es_ena");
    const deletionSuccess =
      searchParams.has("ds_mid") && searchParams.has("ds_ena");

    if (!creationSuccess && !editionSuccess && !deletionSuccess) return;

    const messageId = (searchParams.get("cs_mid") ||
      searchParams.get("es_mid") ||
      searchParams.get("ds_mid"))!;

    if (messageId === lastNotificationRef.current) return;

    lastNotificationRef.current = messageId;

    if (creationSuccess) {
      const creationPathWithId = generatePath(editionPath, {
        id: searchParams.get("cs_eid"),
      });

      toast("Creation Success", {
        action: {
          label: "Edit",
          onClick: () => navigate(creationPathWithId),
        },
        description: `${capitalize(entity)} '${searchParams.get("cs_ena")}' has been successfully created.`,
        duration: toastDuration,
      });
    }

    if (editionSuccess) {
      const editionPathWithId = generatePath(editionPath, {
        id: searchParams.get("es_eid"),
      });

      toast("Edition Success", {
        action: {
          label: "Edit",
          onClick: () => navigate(editionPathWithId),
        },
        description: `${capitalize(entity)} '${searchParams.get("es_ena")}' has been successfully updated.`,
        duration: toastDuration,
      });
    }

    if (deletionSuccess) {
      toast("Deletion Success", {
        description: `${capitalize(entity)} '${searchParams.get("ds_ena")}' has been successfully deleted.`,
        duration: toastDuration,
      });
    }
  }, [
    searchParams.get("cs_mid"),
    searchParams.get("es_mid"),
    searchParams.get("ds_mid"),
  ]);

  return null;
};
