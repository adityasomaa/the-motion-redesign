import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Desktop with a real mouse: the only place Lenis, the custom cursor and pinned scenes run. */
export const DESKTOP_POINTER_QUERY = "(min-width: 1025px) and (hover: hover) and (pointer: fine)";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
