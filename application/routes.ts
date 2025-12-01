import { type RouteConfig } from "@react-router/dev/routes";
import { ingredientsRoutes } from "./features/ingredients/routes";
import { doughsRoutes } from "./features/doughs/routes";

export default [...doughsRoutes, ...ingredientsRoutes] satisfies RouteConfig;
