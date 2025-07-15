import { SidebarProvider, SidebarTrigger } from "~/components/sidebar";
import { PizzaboySidebar } from "~/components/pizzaboy-sidebar";
import { Outlet } from "react-router";
import type { FC } from "react";

export const HtmlBodyMainContent: FC = () => (
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
