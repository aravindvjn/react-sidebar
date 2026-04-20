"use client";

import { useSidebar } from "../context/SidebarContext";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export function SidebarTrigger({ children, className = "" }: Props) {
  const { isMobile, toggleMobileOpen, toggleExpanded } = useSidebar();

  return (
    <button
      type="button"
      onClick={isMobile ? toggleMobileOpen : toggleExpanded}
      className={`rv-sidebar__trigger ${className}`}
    >
      {children ?? "Toggle Sidebar"}
    </button>
  );
}