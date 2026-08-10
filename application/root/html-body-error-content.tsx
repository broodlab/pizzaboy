import { type ErrorResponse, isRouteErrorResponse } from "react-router";
import type { FC } from "react";
import type { Route } from "../+types/root";
import { Layout } from "./layout";
import { ErrorAlert } from "~/components/alerts/error-alert";

export const HtmlBodyErrorContent: FC<Route.ErrorBoundaryProps> = ({
  error,
}) => {
  let title, description: string;
  let stack: undefined | string;

  if (isRouteErrorResponse(error)) {
    const errorSpecification = specifyRouteResponseError(error);
    title = errorSpecification.title;
    description = errorSpecification.description;
  } else if (import.meta.env.DEV && error instanceof Error) {
    title = "Oops!";
    description = error.message;
    stack = error.stack;
  } else {
    title = "Oops!";
    description = "An unexpected error occurred.";
  }

  return (
    <Layout>
      <ErrorAlert title={title}>
        <span>{description}</span>
      </ErrorAlert>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </Layout>
  );
};

const specifyRouteResponseError = (error: ErrorResponse) => {
  let title: string;
  let description: string;

  if (error.status === 404) {
    title = "Not Found";
    if (error.data.entity === undefined) {
      description = "The page you are looking for does not exist (anymore).";
    } else {
      description = `The ${error.data.entity} you are looking for does not exist (anymore).`;
    }
  } else {
    title = "Error";
    description = error.statusText;
  }

  return { title, description };
};
