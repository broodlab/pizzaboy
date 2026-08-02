import { type SetURLSearchParams, useSearchParams } from "react-router";
import { useMemo } from "react";

export const useNotificationlessSearchParams = (): [
  URLSearchParams,
  SetURLSearchParams,
] => {
  const [searchParams, setSearchParams] = useSearchParams();
  return useMemo(() => {
    const clearedSearchParams = new URLSearchParams(searchParams);
    clearedSearchParams.delete("n");
    return [clearedSearchParams, setSearchParams];
  }, [searchParams.toString()]);
};
