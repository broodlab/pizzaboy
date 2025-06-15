import { prefix, route, type RouteConfigEntry } from "@react-router/dev/routes";

export const ingredientsRoutes: RouteConfigEntry[] = [
  ...prefix("ingredients", [
    route("", "./features/ingredients/view-all/index.tsx"),
    route("create", "./features/ingredients/create/index.tsx"),
    route(":id/delete", "./features/ingredients/delete/index.tsx"),
  ]),
];
