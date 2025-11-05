import { type FC, useEffect, useRef } from "react";
import type { Entity } from "~/types/entities";
import { generatePath, useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { capitalize } from "~/utils/strings";

export const Toasts: FC<{ editionPath: string; entity: Entity }> = ({
  editionPath,
  entity,
}) => {
  const [searchParams] = useSearchParams();
  const lastNotificationRef = useRef<null | string>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !searchParams.has("cs_mid") ||
      !searchParams.has("cs_eid") ||
      !searchParams.has("cs_ena")
    )
      return;

    if (searchParams.get("cs_mid") === lastNotificationRef.current) return;

    lastNotificationRef.current = searchParams.get("cs_mid");

    const creationPathWithId = generatePath(editionPath, {
      id: searchParams.get("cs_eid"),
    });

    toast("Creation Success", {
      action: {
        label: "Edit",
        onClick: () => navigate(creationPathWithId),
      },
      description: `${capitalize(entity)} '${searchParams.get("cs_ena")}' has been successfully created.`,
      duration: 10_000,
    });
  }, [searchParams.get("cs_mid")]);

  return null;
};
