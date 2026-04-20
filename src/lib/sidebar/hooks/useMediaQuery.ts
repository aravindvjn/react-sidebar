"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string, defaultValue = false) {
  const [matches, setMatches] = useState(defaultValue);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const onChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    if (mql.addEventListener) {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    }

    mql.addListener(onChange);
    return () => mql.removeListener(onChange);
  }, [query]);

  return matches;
}