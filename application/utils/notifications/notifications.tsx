import type { FC } from "react";
import type { Entity } from "~/types/entities";
import { Alerts } from "~/utils/notifications/alerts";
import { Toasts } from "~/utils/notifications/toasts";
import { useScripting } from "~/hooks/use-scripting";

export const Notifications: FC<{ editionPath: string; entity: Entity }> = ({
  editionPath,
  entity,
}) => {
  const isScripting = useScripting();

  return (
    <>
      {!isScripting && <Alerts editionPath={editionPath} entity={entity} />}
      {isScripting && <Toasts editionPath={editionPath} entity={entity} />}
    </>
  );
};
