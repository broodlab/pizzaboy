import type { ToastFactory } from "~/utils/notifications/types";
import { capitalize } from "~/utils/strings";
import { toastManager } from "~/components/toast";

const defaultNavigate = () => {};
const toastDuration = 10_000;

export const toastFactories: Record<string, ToastFactory> = {
  creationSuccess: ({ navigate = defaultNavigate, parameters }) => {
    const editionPath = parameters?.editionPath ?? "";
    const entity = parameters?.entity ?? "";
    const name = parameters?.name ?? "";

    toastManager.add({
      title: "Creation Success",
      actionProps: {
        children: "Edit",
        onClick: () => navigate(editionPath),
      },
      description: `${capitalize(entity)} '${name}' has been successfully created.`,
      timeout: toastDuration,
    });
  },
  deletionSuccess: ({ parameters }) => {
    const entity = parameters?.entity ?? "";
    const name = parameters?.name ?? "";

    toastManager.add({
      title: "Deletion Success",
      description: `${capitalize(entity)} '${name}' has been successfully deleted.`,
      timeout: toastDuration,
    });
  },
  editionSuccess: ({ navigate = defaultNavigate, parameters }) => {
    const editionPath = parameters?.editionPath ?? "";
    const entity = parameters?.entity ?? "";
    const name = parameters?.name ?? "";

    toastManager.add({
      title: "Edition Success",
      actionProps: {
        children: "Edit",
        onClick: () => navigate(editionPath),
      },
      description: `${capitalize(entity)} '${name}' has been successfully updated.`,
      timeout: toastDuration,
    });
  },
  entityNotFound: ({ parameters }) => {
    const entity = parameters?.entity ?? "";

    toastManager.add({
      title: `${capitalize(entity)} Not Found`,
      description: `The ${entity} does not exist (anymore).`,
      timeout: toastDuration,
    });
  },
  "sizes.storageSuccess": () => {
    toastManager.add({
      title: "Storage Success",
      description: "The size(s) have been successfully saved.",
      timeout: toastDuration,
    });
  },
};
