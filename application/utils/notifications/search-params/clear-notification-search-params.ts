const searchParamNames = [
  "cs_mid",
  "cs_eid",
  "cs_ena",
  "es_mid",
  "es_eid",
  "es_ena",
  "ds_mid",
  "ds_ena",
];

export const clearNotificationSearchParams = (
  searchParams: URLSearchParams,
) => {
  const clearedSearchParams = new URLSearchParams(searchParams);

  searchParamNames.forEach((searchParamName) =>
    clearedSearchParams.delete(searchParamName),
  );

  return clearedSearchParams;
};
