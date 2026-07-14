'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { profile, primaryEmail } from '@/data/site';
import { DURATION, EASE_EDITORIAL, STAGGER } from '@/lib/motion';
import { Icon } from '@/components/ui/Icon';

/**
 * The hero does one job: state who she is, at a scale that demonstrates typographic
 * confidence, then get out of the way of the work.
 *
 * Note what is absent compared to the previous build — no mousemove listener, no
 * cursor trail, no gradient blobs, no floating shapes. That listener re-rendered
 * the entire tree on every pixel of pointer movement; deleting it is the single
 * biggest performance win on the page.
 */
export function Hero() {

  // Each headline line rises out of its own clipping mask — the classic editorial
  // reveal. It runs exactly once, on load.
  const line = {
    hidden: { y: '110%' },
    visible: (i: number) => ({
      y: '0%',
      transition: {
        duration: DURATION.slow,
        ease: EASE_EDITORIAL,
        delay: 0.1 + i * STAGGER * 2,
      },
    }),
  };

  return (
    <section
      id="home"
      className="relative isolate flex min-h-dvh flex-col overflow-hidden pb-12 pt-28 md:pt-32"
    >
      {/*
        ── The portrait, as the hero itself ──────────────────────────────────
        The source is only 434×351, so full-bleed it is upscaled roughly 3×. No
        amount of CSS makes those pixels sharper — so the treatment stops
        pretending it is a crisp photograph and turns it into a texture instead:
        fully desaturated, contrast pushed, film grain over the top.

        The grain is the load-bearing trick. Upscaling artefacts read as softness
        precisely because the image carries no high-frequency detail; grain
        supplies some, and the eye stops reading "blurry photo" and starts reading
        "printed halftone". The scrim then does double duty — it keeps the headline
        legible, and it pushes the photograph back into being a ground rather than
        a subject.

        `alt=""` and aria-hidden: this is decoration here, and the descriptive alt
        would only interrupt a screen-reader user on their way to the headline.
        ──────────────────────────────────────────────────────────────────────
      */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src={profile.portrait.src}
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover object-right grayscale contrast-[1.35] brightness-105 dark:brightness-90"
        />

        {/* Scrim, so body copy clears 4.5:1 over the brightest part of the photo. */}
        <div className="absolute inset-0 bg-canvas/[0.82] dark:bg-canvas/[0.78]" />

        {/* Fade the image away from the type, so the copy and CTAs sit on clean canvas. */}
        <div className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/20 to-transparent" />

        {/* Film grain: an inline SVG turbulence, so it costs no network request. */}
        <div
          className="absolute inset-0 opacity-[0.18] mix-blend-overlay dark:opacity-[0.25]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
          }}
        />

      </div>

      <div className="shell flex flex-1 flex-col justify-between">
        <div className="flex flex-1 flex-col justify-center">
          <motion.p
            className="label mb-6 md:mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DURATION.base, ease: EASE_EDITORIAL }}
          >
            {profile.firstName} {profile.lastName} — Portfolio
          </motion.p>

          <h1 className="font-display text-hero font-semibold">
            {profile.headline.map((text, i) => (
              <span key={text} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  custom={i}
                  variants={line}
                  initial="hidden"
                  animate="visible"
                >
                  {/* The ampersand is the only accent-coloured glyph on the page. */}
                  {text.startsWith('&') ? (
                    <>
                      <span className="text-accent">&amp;</span>
                      {text.slice(1)}
                    </>
                  ) : (
                    text
                  )}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        <motion.div
          className="mt-10 grid shrink-0 gap-8 border-t border-rule pt-8 md:mt-14 md:grid-cols-[1fr_auto] md:items-end md:gap-16"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.base, ease: EASE_EDITORIAL, delay: 0.5 }}
        >
          <div className="max-w-measure">
            {/* items-start, not items-center: when the line wraps on a narrow screen
                the dot must stay level with the FIRST line, not drift to the vertical
                middle of the wrapped block. */}
            <p className="flex items-start gap-2.5 text-small text-ink-muted">
              <span
                className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                aria-hidden="true"
              />
              {profile.availability} · {profile.location}
            </p>
            <p className="mt-4 text-body-lg">{profile.intro}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="inline-flex h-12 items-center gap-2 bg-ink px-6 text-small font-medium text-canvas transition-colors duration-300 ease-editorial hover:bg-accent hover:text-accent-ink"
            >
              View the work
              <Icon name="arrow-down" className="h-4 w-4" />
            </a>
            <a
              href={primaryEmail}
              className="inline-flex h-12 items-center gap-2 border border-rule bg-surface/60 px-6 text-small font-medium backdrop-blur-sm transition-colors duration-300 ease-editorial hover:border-ink"
            >
              Get in touch
              <Icon name="arrow-up-right" className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
