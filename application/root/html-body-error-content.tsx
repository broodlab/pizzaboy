import { isRouteErrorResponse } from "react-router";
import type { FC } from "react";
import type { Route } from "../+types/root";

export const HtmlBodyErrorContent: FC<Route.ErrorBoundaryProps> = ({
  error,
}) => {
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
};
