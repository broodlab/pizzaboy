import { type FC } from "react";
import type { Entity } from "~/types/entities";
import { useScripting } from "~/hooks/use-scripting";
import { Alerts } from "~/utils/notifications/components/alerts";
import { Toasts } from "~/utils/notifications/components/toasts";
import { useAlertsVisibility } from "~/utils/notifications/components/use-alerts-visibility";

export const Notifications: FC<{ editionPath: string; entity: Entity }> = ({
  editionPath,
  entity,
}) => {
  const isScripting = useScripting();
  const [alertsId, alertsVisible] = useAlertsVisibility();
  const displayAlerts =
    (!isScripting && !alertsVisible) || (isScripting && alertsVisible);
  const displayToasts = !displayAlerts;

  return (
    <>
      {displayAlerts && (
        <div className="deferredVisibility" id={alertsId}>
          <Alerts editionPath={editionPath} entity={entity} />
        </div>
      )}
      {displayToasts && <Toasts editionPath={editionPath} entity={entity} />}
    </>
  );
};
