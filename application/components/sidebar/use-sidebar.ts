import { SidebarContext } from "~/components/sidebar/sidebar-context";
import { useContext } from "react";

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar() must be used within a SidebarProvider.");
  }

  return context;
};
