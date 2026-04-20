import type { ReactNode } from "react";

export type SidebarItem = {
  id: string;
  label: string;
  icon?: ReactNode;
  path?: string;
  children?: SidebarItem[];
  disabled?: boolean;
  badge?: ReactNode;
};

export type CollapseMode = "hover" | "toggle";

export type SidebarProviderProps = {
  items: SidebarItem[];
  pathname?: string;
  onNavigate?: (path: string, item: SidebarItem) => void;
  defaultExpanded?: boolean;
  defaultPinned?: boolean;
  defaultMobileOpen?: boolean;
  defaultOpenMenus?: Record<string, boolean>;
  collapseMode?: CollapseMode;
  autoExpandActiveParent?: boolean;
  mobileBreakpoint?: number;
  children: React.ReactNode;
};

export type SidebarContextValue = {
  items: SidebarItem[];
  pathname: string;
  isExpanded: boolean;
  isPinned: boolean;
  isMobile: boolean;
  isMobileOpen: boolean;
  openMenus: Record<string, boolean>;
  activeItemId: string | null;
  activeParentId: string | null;
  collapseMode: CollapseMode;

  setExpanded: (value: boolean) => void;
  toggleExpanded: () => void;

  setPinned: (value: boolean) => void;
  togglePinned: () => void;

  setMobileOpen: (value: boolean) => void;
  toggleMobileOpen: () => void;

  toggleMenu: (id: string) => void;
  openMenu: (id: string) => void;
  closeMenu: (id: string) => void;

  navigate: (item: SidebarItem) => void;
  isItemActive: (item: SidebarItem) => boolean;
};