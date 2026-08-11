import type { ToastFactory } from "~/utils/notifications/types";
import { toast } from "sonner";
import { capitalize } from "~/utils/strings";

const defaultNavigate = () => {};
const toastDuration = 10_000;

export const toastFactories: Record<string, ToastFactory> = {
  creationSuccess: ({ navigate = defaultNavigate, parameters }) => {
    const editionPath = parameters?.editionPath ?? "";
    const entity = parameters?.entity ?? "";
    const name = parameters?.name ?? "";

    toast("Creation Success", {
      action: {
        label: "Edit",
        onClick: () => navigate(editionPath),
      },
      description: `${capitalize(entity)} '${name}' has been successfully created.`,
      duration: toastDuration,
    });
  },
  deletionSuccess: ({ parameters }) => {
    const entity = parameters?.entity ?? "";
    const name = parameters?.name ?? "";

    toast("Deletion Success", {
      description: `${capitalize(entity)} '${name}' has been successfully deleted.`,
      duration: toastDuration,
    });
  },
  editionSuccess: ({ navigate = defaultNavigate, parameters }) => {
    const editionPath = parameters?.editionPath ?? "";
    const entity = parameters?.entity ?? "";
    const name = parameters?.name ?? "";

    toast("Edition Success", {
      action: {
        label: "Edit",
        onClick: () => navigate(editionPath),
      },
      description: `${capitalize(entity)} '${name}' has been successfully updated.`,
      duration: toastDuration,
    });
  },
  entityNotFound: ({ parameters }) => {
    const entity = parameters?.entity ?? "";

    toast(`${capitalize(entity)} Not Found`, {
      description: `The ${entity} does not exist (anymore).`,
      duration: toastDuration,
    });
  },
  "sizes.storageSuccess": () => {
    toast("Storage Success", {
      description: "The size(s) have been successfully saved.",
      duration: toastDuration,
    });
  },
};
