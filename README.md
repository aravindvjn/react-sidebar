# @aravindvjn/react-sidebar

A flexible, responsive React sidebar component built with the Context API.
Supports nested menus, hover expansion, mobile drawer behavior, and smooth animations, without being tied to any routing or styling library.

---

## Features

* Lightweight and reusable
* Built with React Context API
* Works in both mobile and desktop layouts
* Router agnostic (Next.js, React Router, etc.)
* Smooth animations powered by Motion
* Nested menu and submenu support
* Fully customizable
* Ships with default CSS (no Tailwind required)

---

## Installation

```bash
npm install @aravindvjn/react-sidebar
```

or

```bash
pnpm add @aravindvjn/react-sidebar
```

---

## Peer Dependencies

```bash
npm install react react-dom motion
```

---

## Usage

### 1. Import styles (required)

```tsx
import "@aravindvjn/react-sidebar/styles.css";
```

### 2. Use components

```tsx
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
} from "@aravindvjn/react-sidebar";

import { useState } from "react";

const items = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    id: "users",
    label: "Users",
    children: [
      {
        id: "all-users",
        label: "All Users",
        path: "/users",
      },
      {
        id: "pending-users",
        label: "Pending Users",
        path: "/users/pending",
      },
    ],
  },
];

export default function App() {
  const [pathname, setPathname] = useState("/dashboard");

  return (
    <SidebarProvider
      items={items}
      pathname={pathname}
      onNavigate={(path) => setPathname(path)}
    >
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar
          renderHeader={
            <div
              style={{
                padding: "20px 16px",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              My App
            </div>
          }
        />

        <main style={{ flex: 1, padding: 24 }}>
          <SidebarTrigger>
            Toggle Sidebar
          </SidebarTrigger>

          <p style={{ marginTop: 16 }}>
            Current path: {pathname}
          </p>
        </main>
      </div>
    </SidebarProvider>
  );
}
```

---

## Menu Item Structure

```ts
type SidebarItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  path?: string;
  children?: SidebarItem[];
  disabled?: boolean;
};
```

---

## SidebarProvider Props

| Prop              | Type                     | Description            |
| ----------------- | ------------------------ | ---------------------- |
| `items`           | `SidebarItem[]`          | Sidebar menu items     |
| `pathname`        | `string`                 | Current active path    |
| `onNavigate`      | `(path: string) => void` | Navigation handler     |
| `defaultExpanded` | `boolean`                | Initial expanded state |
| `defaultPinned`   | `boolean`                | Keep sidebar expanded  |
| `collapseMode`    | `"hover" \| "toggle"`    | Expansion behavior     |

---

## Sidebar Props

| Prop             | Type              | Description             |
| ---------------- | ----------------- | ----------------------- |
| `className`      | `string`          | Custom container styles |
| `renderHeader`   | `React.ReactNode` | Custom header content   |
| `expandedWidth`  | `number`          | Width when expanded     |
| `collapsedWidth` | `number`          | Width when collapsed    |

---

## Styling

This package ships with a default stylesheet.

You can override styles in two ways:

### 1. Override className

```tsx
<Sidebar className="my-sidebar" />
```

### 2. Override CSS variables

```css
:root {
  --rv-sidebar-bg: #111827;
  --rv-sidebar-active-bg: #22c55e;
  --rv-sidebar-active-text: #04130a;
}
```

---

## Behavior

* Hover to expand (when `collapseMode="hover"`)
* Click to toggle submenu
* Automatically highlights active menu using `pathname`
* Mobile drawer with overlay
* Closes on navigation (mobile)

---

## Mobile Support

* Automatic breakpoint detection
* Slide-in sidebar
* Background overlay
* Click outside to close

---

## Animations

Animations are powered by Motion:

* Sidebar expand/collapse
* Submenu open/close
* Mobile drawer transitions

---

## Advanced Usage

Access internal state using the hook:

```tsx
import { useSidebar } from "@aravindvjn/react-sidebar";

const { isExpanded, isMobile } = useSidebar();
```

---

## Versioning

* `patch` → bug fixes
* `minor` → new features
* `major` → breaking changes

---

## Roadmap

* Controlled state mode
* Render prop support
* Headless (unstyled) version
* Improved accessibility

---

## License

MIT

---

## Author

Aravind Vijayan
# react-sidebar
