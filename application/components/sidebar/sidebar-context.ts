import { createContext } from "react";
import type { SidebarContextProps } from "~/components/sidebar/types";

export const SidebarContext = createContext<SidebarContextProps | null>(null);
