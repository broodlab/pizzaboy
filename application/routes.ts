import { type RouteConfig } from "@react-router/dev/routes";
import { ingredientsRoutes } from "./features/ingredients/routes";
import { doughsRoutes } from "./features/doughs/routes";
import { pizzasRoutes } from "./features/pizzas/routes";

export default [
  ...doughsRoutes,
  ...ingredientsRoutes,
  ...pizzasRoutes,
] satisfies RouteConfig;
