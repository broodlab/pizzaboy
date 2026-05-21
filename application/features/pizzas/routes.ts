import { prefix, route, type RouteConfigEntry } from "@react-router/dev/routes";

export const pizzasRoutes: RouteConfigEntry[] = [
  ...prefix("pizzas", [
    route("", "./features/pizzas/view-all/index.tsx", [
      route("filter", "./features/pizzas/view-all/filter/index.tsx"),
    ]),
    route(":id/delete", "./features/pizzas/delete/index.tsx"),
    route(":id/edit", "./features/pizzas/edit/index.tsx"),
    route("create", "./features/pizzas/create/index.tsx"),
  ]),
];
