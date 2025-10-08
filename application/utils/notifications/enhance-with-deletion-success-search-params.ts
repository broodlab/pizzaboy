export const enhanceWithDeletionSuccessSearchParams = (
  name: string,
  searchParams = new URLSearchParams(),
) => {
  searchParams.set("deletionSuccessName", name);
  return searchParams;
};
