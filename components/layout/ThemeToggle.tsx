'use client';

import { useSyncExternalStore } from 'react';
import { Icon } from '@/components/ui/Icon';

type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'sr-theme';

/**
 * Runs before paint (see layout.tsx) to apply the stored or system theme.
 * Without this, the page renders light and then flips — the classic dark-mode flash.
 * It is a string because it must be inlined into the document head verbatim.
 */
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {
    /* localStorage can throw in private mode — the light default is fine. */
  }
})();
`;

/**
 * The source of truth for the theme is the `dark` class on <html> — put there by
 * themeInitScript before paint, and toggled by the button below. That is state
 * living OUTSIDE React, which is exactly what useSyncExternalStore is for.
 *
 * The obvious alternative — read the class in a useEffect and copy it into
 * useState — commits one render with the wrong value, then re-renders. React 19
 * lints that as a cascading render, and it is genuinely wrong: the label would
 * briefly disagree with the actual theme.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light';

/** The server cannot know the visitor's theme; light is the documented default. */
const getServerSnapshot = (): Theme => 'light';

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    // Flipping the class is the whole update — the store above observes it and
    // re-renders this component. No local state to keep in sync.
    document.documentElement.classList.toggle('dark', next === 'dark');
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* localStorage can throw in private mode. The toggle still works this session. */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className="flex h-11 w-11 items-center justify-center text-ink transition-colors duration-200 hover:text-accent"
    >
      {/* Both icons are rendered and cross-faded with CSS, so the control never
          shows the wrong glyph during hydration. */}
      <Icon
        name="sun"
        className="absolute h-5 w-5 rotate-0 scale-100 transition-transform duration-300 ease-editorial dark:-rotate-90 dark:scale-0"
      />
      <Icon
        name="moon"
        className="h-5 w-5 rotate-90 scale-0 transition-transform duration-300 ease-editorial dark:rotate-0 dark:scale-100"
      />
    </button>
  );
}
