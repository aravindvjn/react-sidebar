"use client";

import { useSidebar } from "../context/SidebarContext";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { SidebarSubMenu } from "./SidebarSubMenu";

export function SidebarContent() {
  const {
    items,
    isExpanded,
    openMenus,
    activeItemId,
    navigate,
    toggleMenu,
    isItemActive,
  } = useSidebar();

  return (
    <div className="rv-sidebar__content">
      {items.map((item) => {
        const isActive = isItemActive(item);
        const isOpen = openMenus[item.id];

        return (
          <div key={item.id} className="rv-sidebar__section">
            <SidebarMenuItem
              item={item}
              isExpanded={isExpanded}
              isActive={isActive}
              onClick={() => {
                if (item.children?.length) {
                  toggleMenu(item.id);
                } else {
                  navigate(item);
                }
              }}
            />

            {item.children?.length ? (
              <SidebarSubMenu
                items={item.children}
                isExpanded={isExpanded}
                isOpen={!!isOpen}
                activeItemId={activeItemId}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}