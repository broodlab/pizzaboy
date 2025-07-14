import type { Route } from "./+types/root";
import "./application.css";
import {
  Pizzaboy,
  PizzaboyErrorBoundary,
  PizzaboyLayout,
  pizzaboyMeta,
} from "~/core";

export const ErrorBoundary = PizzaboyErrorBoundary;

export const Layout = PizzaboyLayout;

export const meta: Route.MetaFunction = pizzaboyMeta;

export default function App() {
  return <Pizzaboy />;
}
