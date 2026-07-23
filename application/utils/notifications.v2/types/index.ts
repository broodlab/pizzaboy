import type { ReactElement } from "react";

export type AlertFactory = (
  parameters?: Record<string, string>,
) => ReactElement;

export type ToastFactory = (parameters?: Record<string, string>) => void;

export type Notification = {
  id: string;
  parameters?: Record<string, string>;
  requestId: string;
};
