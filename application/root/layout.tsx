import type { FC, PropsWithChildren } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/sidebar";
import { Link } from "react-router";
import { Toaster } from "sonner";

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
    <SidebarInset>
      <header className="flex h-12 items-center justify-between">
        <SidebarTrigger />
      </header>
      {children}
      <Toaster />
    </SidebarInset>
  </SidebarProvider>
);
