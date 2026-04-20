import type { SidebarItem } from "../types";

export function findActivePath(
  items: SidebarItem[],
  pathname: string,
): {
  activeItemId: string | null;
  activeParentId: string | null;
} {
  for (const item of items) {
    if (item.path && isPathActive(item.path, pathname)) {
      return {
        activeItemId: item.id,
        activeParentId: null,
      };
    }

    if (item.children?.length) {
      for (const child of item.children) {
        if (child.path && isPathActive(child.path, pathname)) {
          return {
            activeItemId: child.id,
            activeParentId: item.id,
          };
        }
      }
    }
  }

  return {
    activeItemId: null,
    activeParentId: null,
  };
}

export function isPathActive(itemPath: string, pathname: string) {
  if (!itemPath) return false;
  if (itemPath === pathname) return true;

  return pathname.startsWith(itemPath + "/");
}