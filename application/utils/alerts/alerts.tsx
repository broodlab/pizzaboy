import type { FC } from "react";
import type { Entity } from "~/types/entities";
import { useSearchParams } from "react-router";
import { SuccessAlert } from "~/components/alerts/success-alert";

export const Alerts: FC<{ entity: Entity }> = ({ entity }) => {
  const [searchParams] = useSearchParams();

  if (
    searchParams.has("creationSuccessId") &&
    searchParams.has("creationSuccessName")
  )
    return (
      <SuccessAlert
        description={`${entity} '${searchParams.get("creationSuccessName")}' has been successfully created.`}
        title="Creation Success"
      />
    );
};
