import type { Route } from "./+types/root";
import "./root/styles.css";
import { htmlMetadata } from "~/root/html-metadata";
import { HtmlDocument } from "~/root/html-document";
import { HtmlBodyErrorContent } from "~/root/html-body-error-content";
import { HtmlBodyMainContent } from "~/root/html-body-main-content";

export const meta: Route.MetaFunction = htmlMetadata;

export const Layout = HtmlDocument;

export const ErrorBoundary = HtmlBodyErrorContent;

export default function MainContent() {
  return <HtmlBodyMainContent />;
}
