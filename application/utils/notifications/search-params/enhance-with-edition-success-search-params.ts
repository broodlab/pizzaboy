export const enhanceWithEditionSuccessSearchParams = (
  id: string,
  name: string,
  searchParams = new URLSearchParams(),
) => {
  searchParams.set("editionSuccessId", id);
  searchParams.set("editionSuccessName", name);
  return searchParams;
};
