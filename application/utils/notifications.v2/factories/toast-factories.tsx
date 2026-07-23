import type { ToastFactory } from "~/utils/notifications.v2/types";
import { toast } from "sonner";

const toastDuration = 10_000;

export const toastFactories: Record<string, ToastFactory> = {
  "sizes.storageSucceeded": () => {
    toast("Storage Success", {
      description: "The size(s) have been successfully saved.",
      duration: toastDuration,
    });
  },
};
