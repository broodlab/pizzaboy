import { type RouteConfig } from "@react-router/dev/routes";
import { ingredientsRoutes } from "./features/ingredients/routes";
import { doughsRoutes } from "./features/doughs/routes";
import { pizzasRoutes } from "./features/pizzas/routes";
import { sizesRoutes } from "./features/sizes/routes";
import { playgroundRoutes } from "./features/playground/routes";

export default [
  ...doughsRoutes,
  ...ingredientsRoutes,
  ...pizzasRoutes,
  ...playgroundRoutes,
  ...sizesRoutes,
] satisfies RouteConfig;
