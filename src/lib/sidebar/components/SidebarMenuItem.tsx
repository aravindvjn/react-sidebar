"use client";

import { motion } from "motion/react";
import type { SidebarItem } from "../types";

type Props = {
  item: SidebarItem;
  isExpanded: boolean;
  isActive: boolean;
  onClick: () => void;
};

const ITEM_EASE: [number, number, number, number] = [0.25, 0.8, 0.25, 1];

export function SidebarMenuItem({
  item,
  isExpanded,
  isActive,
  onClick,
}: Props) {
  return (
    <motion.button
      type="button"
      layout="position"
      className={`rv-sidebar__menu-item ${
        isActive ? "rv-sidebar__menu-item--active" : ""
      }`}
      whileTap={{ scale: 0.985 }}
      transition={{
        layout: {
          duration: 0.18,
        },
      }}
      onClick={onClick}
      disabled={item.disabled}
      style={{
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
    >
      <span className="rv-sidebar__menu-icon">{item.icon}</span>

      <motion.span
        initial={false}
        animate={{
          opacity: isExpanded ? 1 : 0,
          x: isExpanded ? 0 : -6,
        }}
        transition={{ duration: 0.2, ease: ITEM_EASE }}
        className="rv-sidebar__menu-label"
        style={{
          pointerEvents: isExpanded ? "auto" : "none",
          willChange: "opacity, transform",
        }}
      >
        {item.label}
      </motion.span>

      {isActive ? <div className="rv-sidebar__menu-active-indicator" /> : null}
    </motion.button>
  );
}