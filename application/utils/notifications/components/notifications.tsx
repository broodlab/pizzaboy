import { type FC } from "react";
import type { Entity } from "~/types/entities";
import { useScripting } from "~/hooks/use-scripting";
import { Alerts } from "~/utils/notifications/components/alerts";
import { Toasts } from "~/utils/notifications/components/toasts";

export const Notifications: FC<{ editionPath: string; entity: Entity }> = ({
  editionPath,
  entity,
}) => {
  const isScripting = useScripting();

  return (
    <>
      {!isScripting && (
        <div className="deferredVisibility">
          <Alerts editionPath={editionPath} entity={entity} />
        </div>
      )}
      {isScripting && <Toasts editionPath={editionPath} entity={entity} />}
    </>
  );
};
