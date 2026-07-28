import type { ReactElement } from "react";
import type { NavigateFunction } from "react-router";

export type AlertFactory = (options: {
  parameters?: Record<string, string>;
  searchParams?: URLSearchParams;
}) => ReactElement;

export type ToastFactory = (options: {
  navigate?: NavigateFunction;
  parameters?: Record<string, string>;
  searchParams?: URLSearchParams;
}) => void;

export type Notification = {
  id: string;
  parameters?: Record<string, string>;
  requestId: string;
};
