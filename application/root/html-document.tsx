import type { ReactNode } from "react";
import {
  type GetScrollRestorationKeyFunction,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
} from "react-router";

export const HtmlDocument = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {/* The 'children' prop can either be the main or the error content. */}
        {children}
        <ScrollRestoration getKey={getScrollRestorationKey} />
        <Scripts />
      </body>
    </html>
  );
};

const getScrollRestorationKey: GetScrollRestorationKeyFunction = (location) => {
  if (location.state?.navigationIntent === "back") return location.pathname;
  return location.key;
};
