export const clearNotificationSearchParams = (
  searchParams: URLSearchParams,
) => {
  const clearedSearchParams = new URLSearchParams(searchParams);
  clearedSearchParams.delete("creationSuccessId");
  clearedSearchParams.delete("creationSuccessName");
  clearedSearchParams.delete("editionSuccessId");
  clearedSearchParams.delete("editionSuccessName");
  clearedSearchParams.delete("deletionSuccessName");
  return clearedSearchParams;
};
