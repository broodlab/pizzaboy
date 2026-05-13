import { prefix, route, type RouteConfigEntry } from "@react-router/dev/routes";

export const doughsRoutes: RouteConfigEntry[] = [
  ...prefix("doughs", [
    route("", "./features/doughs/view-all/index.tsx", [
      route("filter", "./features/doughs/view-all/filter/index.tsx"),
    ]),
    route(":id/delete", "./features/doughs/delete/index.tsx"),
    route(":id/edit", "./features/doughs/edit/index.tsx"),
    route("create", "./features/doughs/create/index.tsx"),
  ]),
];
