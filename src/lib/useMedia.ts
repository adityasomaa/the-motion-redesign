"use client";

import { useSyncExternalStore } from "react";

/** Live media-query match. Returns `server` during SSR and the first hydration pass. */
export function useMedia(query: string, server = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => server,
  );
}
