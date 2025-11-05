import { useEffect, useId, useState } from "react";

export const useAlertsVisibility = (): [string, boolean] => {
  const alertsId = useId();
  const getAlerts = () => document.getElementById(alertsId);
  const [alertsHasHeight, setAlertsHasHeight] = useState(false);
  const inspectAlertsHeight = (alerts: null | Element) => {
    const height = (alerts ?? getAlerts())?.getBoundingClientRect().height ?? 0;
    setAlertsHasHeight(height > 0);
  };

  useEffect(() => {
    inspectAlertsHeight(getAlerts());

    let alertsResizeObserver: null | ResizeObserver = null;
    const alerts = getAlerts();
    if (alerts !== null) {
      alertsResizeObserver = new ResizeObserver(() =>
        inspectAlertsHeight(alerts),
      );
      alertsResizeObserver.observe(alerts);
    }

    return () => {
      alertsResizeObserver?.disconnect();
    };
  }, []);

  return [alertsId, alertsHasHeight];
};
