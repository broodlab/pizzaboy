import { prefix, route, type RouteConfigEntry } from "@react-router/dev/routes";

export const playgroundRoutes: RouteConfigEntry[] = [
  ...prefix("playground", [route("", "./features/playground/index.tsx")]),
];
