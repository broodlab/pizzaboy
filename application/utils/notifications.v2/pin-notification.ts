export const pinNotification = ({
  notificationId,
  parameters,
  searchParams = new URLSearchParams(),
}: {
  notificationId: string;
  parameters?: Record<string, string>;
  searchParams?: URLSearchParams;
}) => {
  searchParams.set("nid", notificationId);

  if (parameters !== undefined) {
    searchParams.set("npa", JSON.stringify(parameters));
  }

  return searchParams;
};
