"use client";

import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSidebar } from "../context/SidebarContext";
import { SidebarContent } from "./SidebarContent";

type SidebarProps = {
  expandedWidth?: number;
  collapsedWidth?: number;
  mobileWidth?: string;
  className?: string;
  mobileClassName?: string;
  desktopClassName?: string;
  renderHeader?: React.ReactNode;
};

const SIDEBAR_EASE: [number, number, number, number] = [0.25, 0.8, 0.25, 1];

export function Sidebar({
  expandedWidth = 240,
  collapsedWidth = 82,
  mobileWidth = "85vw",
  className = "",
  mobileClassName = "",
  desktopClassName = "",
  renderHeader,
}: SidebarProps) {
  const {
    isMobile,
    isMobileOpen,
    isExpanded,
    setExpanded,
    setMobileOpen,
    isPinned,
    collapseMode,
  } = useSidebar();

  const desktopWidth = isExpanded ? expandedWidth : collapsedWidth;
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    if (collapseMode !== "hover") return;
    clearCloseTimer();
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    if (collapseMode !== "hover" || isPinned) return;

    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setExpanded(false);
    }, 120);
  };

  useEffect(() => {
    return () => {
      clearCloseTimer();
    };
  }, []);

  return (
    <AnimatePresence initial={false}>
      {isMobile ? (
        isMobileOpen && (
          <>
            <motion.div
              className="rv-sidebar__overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.aside
              className={`rv-sidebar rv-sidebar__mobile ${className} ${mobileClassName}`}
              style={{
                width: mobileWidth,
                willChange: "transform",
                backfaceVisibility: "hidden",
              }}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.28, ease: SIDEBAR_EASE }}
            >
              {renderHeader}
              <SidebarContent />
            </motion.aside>
          </>
        )
      ) : (
        <motion.aside
          className={`rv-sidebar rv-sidebar__desktop ${className} ${desktopClassName}`}
          style={{
            overflow: "hidden",
            willChange: "width",
            backfaceVisibility: "hidden",
          }}
          animate={{ width: desktopWidth }}
          transition={{ duration: 0.28, ease: SIDEBAR_EASE }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {renderHeader}
          <SidebarContent />
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
