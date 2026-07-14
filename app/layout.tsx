import type { Metadata, Viewport } from 'next';
import { Archivo, Inter, JetBrains_Mono, Instrument_Serif } from 'next/font/google';
import { seo, profile } from '@/data/site';
import { themeInitScript } from '@/components/layout/ThemeToggle';
import { MotionProvider } from '@/components/layout/MotionProvider';
import './globals.css';

/**
 * Four faces, each with exactly one job:
 *   display — headlines, at scale, tightly tracked
 *   sans    — body copy
 *   mono    — the uppercase micro-labels that give the layout its editorial grid
 *   serif   — a single pull quote, and nothing else
 *
 * Each exposes a CSS variable that tailwind.config.ts consumes via var(). Naming
 * the family directly in Tailwind (the previous bug) silently falls back to
 * system-ui, because next/font registers a hashed, scoped family name.
 */
const display = Archivo({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(seo.url),
  title: {
    default: seo.title,
    template: `%s — ${profile.firstName} ${profile.lastName}`,
  },
  description: seo.description,
  keywords: [
    'graphic designer',
    'UI/UX designer',
    'brand identity',
    'print design',
    'embroidery digitising',
    'Tirupur',
    'Tamil Nadu',
    `${profile.firstName} ${profile.lastName}`,
  ],
  authors: [{ name: `${profile.firstName} ${profile.lastName}` }],
  creator: `${profile.firstName} ${profile.lastName}`,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: seo.url,
    title: seo.title,
    description: seo.description,
    siteName: `${profile.firstName} ${profile.lastName}`,
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Never disable zoom — pinch-to-zoom is an accessibility requirement.
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF9F6' },
    { media: '(prefers-color-scheme: dark)', color: '#0E0E0E' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} ${serif.variable}`}
      // The theme class is applied by the script below before paint; React must
      // not warn about the server/client mismatch this deliberately creates.
      suppressHydrationWarning
    >
      <head>
        {/*
          themeInitScript is a module-level string literal with no interpolation and
          no request-, user- or props-derived data, so there is no XSS surface here.
          It must be inlined and run before paint to avoid the dark-mode flash —
          any deferred/external script is too late by definition.
        */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />

        {/*
          Without JavaScript, Framer Motion's inline `opacity: 0` is never
          animated back to 1 and the whole portfolio renders blank. This forces
          every revealed element visible. Inline styles outrank classes, so
          !important is the only lever available.
        */}
        <noscript>
          <style>{`[style*="opacity"],[style*="transform"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        {/* Keyboard users can jump the header. Visible only when focused. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-50 focus:bg-ink focus:px-4 focus:py-3 focus:text-small focus:text-canvas"
        >
          Skip to content
        </a>
        {/* Handles reduced-motion globally, at animation time rather than render
            time — see MotionProvider for why that distinction matters. */}
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
