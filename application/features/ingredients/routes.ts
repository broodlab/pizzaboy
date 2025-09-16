import { prefix, route, type RouteConfigEntry } from "@react-router/dev/routes";

export const ingredientsRoutes: RouteConfigEntry[] = [
  ...prefix("ingredients", [
    route("", "./features/ingredients/view-all/index.tsx", [
      route("filter", "./features/ingredients/view-all/filter/index.tsx"),
    ]),
    route(":id/delete", "./features/ingredients/delete/index.tsx"),
    route(":id/edit", "./features/ingredients/edit/index.tsx"),
    route("create", "./features/ingredients/create/index.tsx"),
  ]),
];
