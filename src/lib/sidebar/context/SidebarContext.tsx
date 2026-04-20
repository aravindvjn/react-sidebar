"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {
  SidebarContextValue,
  SidebarItem,
  SidebarProviderProps,
} from "../types";
import { findActivePath, isPathActive } from "../utils/sidebar.utils";
import { useMediaQuery } from "../hooks/useMediaQuery";

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({
  items,
  pathname = "",
  onNavigate,
  defaultExpanded = false,
  defaultPinned = false,
  defaultMobileOpen = false,
  defaultOpenMenus = {},
  collapseMode = "hover",
  autoExpandActiveParent = true,
  mobileBreakpoint = 768,
  children,
}: SidebarProviderProps) {
  const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint - 1}px)`);

  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isPinned, setIsPinned] = useState(defaultPinned);
  const [isMobileOpen, setIsMobileOpen] = useState(defaultMobileOpen);
  const [openMenus, setOpenMenus] =
    useState<Record<string, boolean>>(defaultOpenMenus);

  const { activeItemId, activeParentId } = useMemo(() => {
    return findActivePath(items, pathname);
  }, [items, pathname]);

  useEffect(() => {
    if (autoExpandActiveParent && activeParentId) {
      setOpenMenus((prev) => ({
        ...prev,
        [activeParentId]: true,
      }));
    }
  }, [activeParentId, autoExpandActiveParent]);

  useEffect(() => {
    if (isMobile) {
      setIsExpanded(true);
    }
  }, [isMobile]);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  const togglePinned = () => {
    setIsPinned((prev) => !prev);
  };

  const toggleMobileOpen = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const toggleMenu = (id: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const openMenu = (id: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const closeMenu = (id: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [id]: false,
    }));
  };

  const navigate = (item: SidebarItem) => {
    if (!item.path || item.disabled) return;
    onNavigate?.(item.path, item);
    if (isMobile) setIsMobileOpen(false);
  };

  const isItemActive = (item: SidebarItem) => {
    if (item.path && isPathActive(item.path, pathname)) return true;
    return (
      item.children?.some(
        (child) => child.path && isPathActive(child.path, pathname),
      ) ?? false
    );
  };

  const value: SidebarContextValue = {
    items,
    pathname,
    isExpanded,
    isPinned,
    isMobile,
    isMobileOpen,
    openMenus,
    activeItemId,
    activeParentId,
    collapseMode,

    setExpanded: setIsExpanded,
    toggleExpanded,

    setPinned: setIsPinned,
    togglePinned,

    setMobileOpen: setIsMobileOpen,
    toggleMobileOpen,

    toggleMenu,
    openMenu,
    closeMenu,

    navigate,
    isItemActive,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }

  return context;
}
