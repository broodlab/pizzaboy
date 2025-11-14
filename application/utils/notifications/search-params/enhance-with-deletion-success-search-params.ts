export const enhanceWithDeletionSuccessSearchParams = (
  name: string,
  searchParams = new URLSearchParams(),
) => {
  searchParams.set("ds_mid", crypto.randomUUID());
  searchParams.set("ds_ena", name);
  return searchParams;
};
