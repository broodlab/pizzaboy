import { type RouteConfig } from "@react-router/dev/routes";
import { ingredientsRoutes } from "./features/ingredients/routes";

export default [...ingredientsRoutes] satisfies RouteConfig;
