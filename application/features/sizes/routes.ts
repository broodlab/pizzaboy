import { prefix, route, type RouteConfigEntry } from "@react-router/dev/routes";

export const sizesRoutes: RouteConfigEntry[] = [
  ...prefix("sizes", [route("", "./features/sizes/view-all/index.tsx")]),
];
