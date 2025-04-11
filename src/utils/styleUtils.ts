import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

/**
 * Combines class names using clsx and then merges Tailwind CSS classes using tailwind-merge
 * This allows for conditional styling while properly handling Tailwind class conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
