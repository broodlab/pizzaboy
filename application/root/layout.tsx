import type { FC, PropsWithChildren } from "react";
import { SidebarProvider, SidebarTrigger } from "~/components/sidebar";
import { PizzaboySidebar } from "~/components/pizzaboy-sidebar";

export const Layout: FC<PropsWithChildren> = ({ children }) => (
  <SidebarProvider>
    <PizzaboySidebar />
    <header className="flex h-12 items-center justify-between px-4">
      <SidebarTrigger />
    </header>
    <main>{children}</main>
  </SidebarProvider>
);
