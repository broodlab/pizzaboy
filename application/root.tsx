import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./application.css";
import { SidebarProvider, SidebarTrigger } from "~/components/sidebar";
import { PizzaboySidebar } from "~/components/pizzaboy-sidebar";
import type { ReactNode } from "react";

export const meta: Route.MetaFunction = () => [
  {
    title: "pizzaboy",
  },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <SidebarProvider>
      <PizzaboySidebar />
      <header className="flex h-12 items-center justify-between px-4">
        <SidebarTrigger />
      </header>
      <main>
        <Outlet />
      </main>
    </SidebarProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    if (error.status === 404 && error.data.entity === undefined) {
      details = "Page not found.";
    } else if (error.status === 404 && error.data.entity !== undefined) {
      details = `${error.data.entity.toUpperCase()} not found.`;
    } else if (error.status !== 404) {
      details = error.statusText || details;
    }
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
