export const enhanceWithEditionSuccessSearchParams = (
  id: string,
  name: string,
  searchParams = new URLSearchParams(),
) => {
  searchParams.set("es_mid", crypto.randomUUID());
  searchParams.set("es_eid", id);
  searchParams.set("es_ena", name);
  return searchParams;
};
