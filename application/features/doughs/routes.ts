import { prefix, route, type RouteConfigEntry } from "@react-router/dev/routes";

export const doughsRoutes: RouteConfigEntry[] = [
  ...prefix("doughs", [route("", "./features/doughs/view-all/index.tsx")]),
];
