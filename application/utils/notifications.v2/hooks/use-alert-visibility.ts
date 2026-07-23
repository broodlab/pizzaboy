import { useEffect, useId, useState } from "react";

export const useAlertVisibility = (): [string, boolean] => {
  const alertId = useId();
  const getAlert = () => document.getElementById(alertId);
  const [alertHasHeight, setAlertHasHeight] = useState(false);
  const inspectAlertHeight = (alert: null | Element) => {
    const height = (alert ?? getAlert())?.getBoundingClientRect().height ?? 0;
    setAlertHasHeight(height > 0);
  };

  useEffect(() => {
    inspectAlertHeight(getAlert());

    let alertResizeObserver: null | ResizeObserver = null;
    const alert = getAlert();
    if (alert !== null) {
      alertResizeObserver = new ResizeObserver(() => inspectAlertHeight(alert));
      alertResizeObserver.observe(alert);
    }

    return () => {
      alertResizeObserver?.disconnect();
    };
  }, []);

  return [alertId, alertHasHeight];
};
