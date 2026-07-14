import type { Config } from 'tailwindcss';

/**
 * Colours are declared as `R G B` triplets in globals.css so a single token can
 * serve both themes and still accept Tailwind opacity modifiers (`text-ink/60`).
 */
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ['./components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './data/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: token('canvas'),
        surface: token('surface'),
        ink: token('ink'),
        'ink-muted': token('ink-muted'),
        rule: token('rule'),
        accent: token('accent'),
        'accent-ink': token('accent-ink'),
      },
      fontFamily: {
        // These MUST reference the CSS variables injected by next/font. Naming the
        // family directly ('Archivo') silently falls back to system-ui, because
        // next/font registers a hashed, scoped family name instead.
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      fontSize: {
        // Fluid editorial scale. Clamp removes the need for per-breakpoint size soup.
        label: ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.14em' }],
        small: ['0.875rem', { lineHeight: '1.6' }],
        body: ['1rem', { lineHeight: '1.65' }],
        'body-lg': ['clamp(1.0625rem, 0.95rem + 0.5vw, 1.25rem)', { lineHeight: '1.6' }],
        title: ['clamp(1.5rem, 1.2rem + 1.4vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        section: ['clamp(2rem, 1.4rem + 3vw, 4rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
        // Capped at 7.5rem so the three-line headline plus the intro block still
        // clear a 900px-tall laptop viewport — the CTA must never sit below the fold.
        hero: ['clamp(2.5rem, 1rem + 7.5vw, 7.5rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
      },
      maxWidth: {
        measure: '68ch',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
