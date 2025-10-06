export const enhanceWithCreationSuccessSearchParams = (
  id: string,
  name: string,
  searchParams = new URLSearchParams(),
) => {
  searchParams.set("creationSuccessId", id);
  searchParams.set("creationSuccessName", name);
  return searchParams;
};
