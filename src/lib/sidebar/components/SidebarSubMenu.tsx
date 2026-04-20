"use client";

import { motion } from "motion/react";
import { useSidebar } from "../context/SidebarContext";
import type { SidebarItem } from "../types";

type Props = {
  items: SidebarItem[];
  isExpanded: boolean;
  isOpen: boolean;
  activeItemId: string | null;
};

const SUBMENU_EASE: [number, number, number, number] = [0.25, 0.8, 0.25, 1];

export function SidebarSubMenu({
  items,
  isExpanded,
  isOpen,
  activeItemId,
}: Props) {
  const { navigate } = useSidebar();

  const visible = isExpanded && isOpen;

  return (
    <motion.div
      initial={false}
      animate={{
        height: visible ? "auto" : 0,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        height: {
          duration: 0.22,
          ease: SUBMENU_EASE,
        },
        opacity: {
          duration: 0.16,
          ease: "linear",
        },
      }}
      className="rv-sidebar__submenu"
      style={{
        willChange: "height, opacity",
        backfaceVisibility: "hidden",
      }}
    >
      <div className="rv-sidebar__submenu-inner">
        <div className="rv-sidebar__submenu-list">
          {items.map((item) => {
            const isActive = item.id === activeItemId;

            return (
              <motion.button
                key={item.id}
                type="button"
                className={`rv-sidebar__submenu-item ${
                  isActive ? "rv-sidebar__submenu-item--active" : ""
                }`}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(item)}
              >
                <span className="rv-sidebar__submenu-dot" />
                <span className="rv-sidebar__submenu-text">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}