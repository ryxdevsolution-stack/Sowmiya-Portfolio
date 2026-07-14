/**
 * Minimal class-name joiner. Avoids pulling in clsx for the handful of places
 * that need conditional classes.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
