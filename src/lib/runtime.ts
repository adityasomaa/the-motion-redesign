import type Lenis from "lenis";

/**
 * Tiny shared runtime for things that live outside React's tree:
 * the Lenis instance and the "page is visible" signal that intro animations wait for.
 */

let lenis: Lenis | null = null;
export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};
export const getLenis = () => lenis;

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  window.scrollTo(0, 0);
}

let revealed = false;
const listeners = new Set<() => void>();

/** Called by the loader / curtain the moment the page starts to show. */
export function markRevealed() {
  revealed = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
}

/** Called when the curtain covers the page, so the next page's intros wait for it to open. */
export function markCovered() {
  revealed = false;
}

/** Run `fn` once the page is visible. Returns a cleanup. */
export function onRevealed(fn: () => void) {
  if (revealed) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => listeners.delete(fn);
}
