import { type FC } from "react";
import type { Entity } from "~/types/entities";
import { generatePath, Link, useSearchParams } from "react-router";
import { SuccessAlert } from "~/components/alerts/success-alert";
import { capitalize } from "~/utils/strings";
import { clearNotificationSearchParams } from "~/utils/notifications/search-params/clear-notification-search-params";

export const Alerts: FC<{ editionPath: string; entity: Entity }> = ({
  editionPath,
  entity,
}) => {
  const [searchParams] = useSearchParams();

  if (searchParams.has("cs_eid") && searchParams.has("cs_ena")) {
    const name = searchParams.get("cs_ena");
    const creationPathWithId = generatePath(editionPath, {
      id: searchParams.get("cs_eid"),
    });
    const clearedSearchParams = clearNotificationSearchParams(searchParams);

    return (
      <SuccessAlert title="Creation Success">
        <span>
          <span>{capitalize(entity)} </span>
          <Link
            className="font-medium underline underline-offset-4"
            to={{
              pathname: creationPathWithId,
              search: clearedSearchParams.toString(),
            }}
          >
            {name}
          </Link>
          <span> has been successfully created.</span>
        </span>
      </SuccessAlert>
    );
  }

  if (
    searchParams.has("editionSuccessId") &&
    searchParams.has("editionSuccessName")
  ) {
    const name = searchParams.get("editionSuccessName");
    const editionPathWithId = generatePath(editionPath, {
      id: searchParams.get("editionSuccessId"),
    });
    const clearedSearchParams = clearNotificationSearchParams(searchParams);

    return (
      <SuccessAlert title="Edition Success">
        <span>
          <span>{capitalize(entity)} </span>
          <Link
            className="font-medium underline underline-offset-4"
            to={{
              pathname: editionPathWithId,
              search: clearedSearchParams.toString(),
            }}
          >
            {name}
          </Link>
          <span> has been successfully updated.</span>
        </span>
      </SuccessAlert>
    );
  }

  if (searchParams.has("deletionSuccessName")) {
    return (
      <SuccessAlert title="Deletion Success">
        <span>
          <span>{capitalize(entity)} </span>
          <span className="font-bold">
            {searchParams.get("deletionSuccessName")}
          </span>
          <span> has been successfully deleted.</span>
        </span>
      </SuccessAlert>
    );
  }
};
