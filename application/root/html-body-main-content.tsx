import { Outlet } from "react-router";
import type { FC } from "react";
import { Layout } from "./layout";

export const HtmlBodyMainContent: FC = () => (
  <Layout>
    <Outlet />
  </Layout>
);
