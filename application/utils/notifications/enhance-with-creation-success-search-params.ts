export const enhanceWithCreationSuccessSearchParams = (
  id: string,
  name: string,
  searchParams = new URLSearchParams(),
) => {
  searchParams.set("cs_mid", crypto.randomUUID());
  searchParams.set("cs_eid", id);
  searchParams.set("cs_ena", name);
  return searchParams;
};
