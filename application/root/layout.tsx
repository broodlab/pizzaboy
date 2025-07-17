import type { FC, PropsWithChildren } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/sidebar";
import { Link } from "react-router";

export const Layout: FC<PropsWithChildren> = ({ children }) => (
  <SidebarProvider>
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/ingredients/create">Create Ingredient</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/ingredients">Ingredients</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
    <header className="flex h-12 items-center justify-between px-4">
      <SidebarTrigger />
    </header>
    <main>{children}</main>
  </SidebarProvider>
);
