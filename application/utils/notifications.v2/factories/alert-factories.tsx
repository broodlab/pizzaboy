import { SuccessAlert } from "~/components/alerts/success-alert";
import type { AlertFactory } from "~/utils/notifications.v2/types";
import { capitalize } from "~/utils/strings";
import { Link } from "react-router";

export const alertFactories: Record<string, AlertFactory> = {
  creationSuccess: ({ parameters, searchParams }) => {
    const editionPath = parameters?.editionPath ?? "";
    const entity = parameters?.entity ?? "";
    const name = parameters?.name ?? "";

    return (
      <SuccessAlert title="Creation Success">
        <span>
          <span>{capitalize(entity)} </span>
          <Link
            className="font-medium underline underline-offset-4"
            to={{
              pathname: editionPath,
              search: searchParams?.toString(),
            }}
          >
            {name}
          </Link>
          <span> has been successfully created.</span>
        </span>
      </SuccessAlert>
    );
  },
  deletionSuccess: ({ parameters }) => {
    const entity = parameters?.entity ?? "";
    const name = parameters?.name ?? "";

    return (
      <SuccessAlert title="Deletion Success">
        <span>
          <span>{capitalize(entity)} </span>
          <span className="font-bold">{name}</span>
          <span> has been successfully deleted.</span>
        </span>
      </SuccessAlert>
    );
  },
  editionSuccess: ({ parameters, searchParams }) => {
    const editionPath = parameters?.editionPath ?? "";
    const entity = parameters?.entity ?? "";
    const name = parameters?.name ?? "";

    return (
      <SuccessAlert title="Edition Success">
        <span>
          <span>{capitalize(entity)} </span>
          <Link
            className="font-medium underline underline-offset-4"
            to={{
              pathname: editionPath,
              search: searchParams?.toString(),
            }}
          >
            {name}
          </Link>
          <span> has been successfully updated.</span>
        </span>
      </SuccessAlert>
    );
  },
  "sizes.storageSuccess": () => (
    <SuccessAlert title={"Storage Success"}>
      The size(s) have been successfully saved.
    </SuccessAlert>
  ),
};
