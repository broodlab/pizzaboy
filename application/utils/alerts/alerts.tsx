import type { FC } from "react";
import type { Entity } from "~/types/entities";
import { generatePath, Link, useSearchParams } from "react-router";
import { SuccessAlert } from "~/components/alerts/success-alert";

export const Alerts: FC<{ editionPath: string; entity: Entity }> = ({
  editionPath,
  entity,
}) => {
  const [searchParams] = useSearchParams();

  if (
    searchParams.has("creationSuccessId") &&
    searchParams.has("creationSuccessName")
  ) {
    const editionPathWithId = generatePath(editionPath, {
      id: searchParams.get("creationSuccessId"),
    });
    return (
      <SuccessAlert title="Creation Success">
        <span>
          <span>{entity} </span>
          <Link
            className="font-medium underline underline-offset-4"
            to={editionPathWithId}
          >
            {searchParams.get("creationSuccessName")}
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
    const editionPathWithId = generatePath(editionPath, {
      id: searchParams.get("editionSuccessId"),
    });
    return (
      <SuccessAlert title="Edition Success">
        <span>
          <span>{entity} </span>
          <Link
            className="font-medium underline underline-offset-4"
            to={editionPathWithId}
          >
            {searchParams.get("editionSuccessName")}
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
          <span>{entity} </span>
          <span className="font-bold">
            {searchParams.get("deletionSuccessName")}
          </span>
          <span> has been successfully deleted.</span>
        </span>
      </SuccessAlert>
    );
  }
};
