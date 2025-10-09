import { useSearchParams } from "react-router";
import { useMemo } from "react";
import { clearNotificationSearchParams } from "~/utils/notifications/clear-notification-search-params";

export const useNotificationlessSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return useMemo(() => {
    const clearedSearchParams = clearNotificationSearchParams(searchParams);
    return [clearedSearchParams, setSearchParams];
  }, [searchParams.toString()]);
};
