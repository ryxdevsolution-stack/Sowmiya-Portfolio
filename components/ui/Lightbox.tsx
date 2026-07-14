'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Project } from '@/data/projects';
import { DURATION, DURATION_EXIT, EASE_EDITORIAL } from '@/lib/motion';
import { Icon } from './Icon';

interface LightboxProps {
  project: Project | null;
  onClose: () => void;
}

/** Elements that can hold keyboard focus, used to build the focus trap. */
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Full-screen project viewer.
 *
 * A modal carries real accessibility obligations, all of which are met here:
 * focus is trapped inside while open and returned to the trigger on close,
 * Escape and backdrop clicks dismiss it, arrow keys move between frames, and
 * the page behind is locked without the layout shifting.
 */
export function Lightbox({ project, onClose }: LightboxProps) {
  const [frame, setFrame] = useState(0);
  /** Which project the `frame` index currently belongs to — see the reset below. */
  const [lastSlug, setLastSlug] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  /** The element that was focused before the modal opened, so we can restore it. */
  const triggerRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const reduced = useReducedMotion();

  const open = project !== null;
  const frames = project ? [project.cover, ...project.gallery] : [];
  const frameCount = frames.length;

  const goTo = useCallback(
    (next: number) => {
      if (frameCount === 0) return;
      // Wrap around in both directions.
      setFrame((next + frameCount) % frameCount);
    },
    [frameCount]
  );

  // Reset to the cover whenever a DIFFERENT project is opened.
  //
  // Adjusted during render rather than in an effect. An effect would commit the
  // new project showing the PREVIOUS project's frame index, then set state and
  // re-render — a visible flash of the wrong image, plus a cascading render that
  // React 19 rightly lints against. Comparing against the last-seen slug during
  // render lets React resolve it in a single pass, before anything is painted.
  if (project && project.slug !== lastSlug) {
    setLastSlug(project.slug);
    setFrame(0);
  }

  // Remember what opened us, and hand focus back to it on close.
  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement as HTMLElement;
      // Focus the dialog itself so screen readers announce the title immediately.
      requestAnimationFrame(() => dialogRef.current?.focus());
    } else {
      triggerRef.current?.focus();
    }
  }, [open]);

  // Lock the page behind the modal. Padding compensates for the removed
  // scrollbar so the content underneath doesn't jump sideways.
  useEffect(() => {
    if (!open) return;

    const { body, documentElement } = document;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;

    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [open]);

  // Keyboard: Escape closes, arrows navigate, Tab cycles within the dialog.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goTo(frame + 1);
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goTo(frame - 1);
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;

      // Focus trap: wrap Tab / Shift+Tab at the ends of the focusable list.
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === dialogRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, frame, goTo, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          // Near-opaque, not translucent. At /95 the page bled through behind the
          // artwork and muddied its colour — unacceptable when the whole point of
          // this view is to judge the design accurately.
          className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/[0.98] backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : DURATION_EXIT, ease: EASE_EDITORIAL }}
          // Backdrop click dismisses, but only when the click starts on the backdrop
          // itself — dragging from inside the panel shouldn't close it.
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className="shell grid max-h-dvh w-full grid-rows-[auto_1fr] gap-6 overflow-y-auto py-6 outline-none lg:grid-cols-[1fr_22rem] lg:grid-rows-1 lg:items-center lg:gap-12 lg:py-12"
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: 12 }}
            transition={{ duration: reduced ? 0 : DURATION.base, ease: EASE_EDITORIAL }}
          >
            {/* ── Image stage ─────────────────────────────────────────────── */}
            <div className="relative lg:order-1">
              {/*
                The artwork is shown whole. No fixed aspect box, no object-cover:
                the image is given its intrinsic ratio and capped by height, so a
                tall packaging label and a wide business card each fit the viewport
                without a single pixel of the design being cropped away. This is the
                view someone opens specifically to inspect the work closely.
              */}
              <div className="flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={frames[frame]?.src}
                    initial={reduced ? undefined : { opacity: 0 }}
                    animate={reduced ? undefined : { opacity: 1 }}
                    exit={reduced ? undefined : { opacity: 0 }}
                    transition={{ duration: reduced ? 0 : DURATION.fast }}
                    className="w-full"
                  >
                    <Image
                      src={frames[frame]?.src ?? ''}
                      alt={frames[frame]?.alt ?? ''}
                      width={frames[frame]?.width ?? 1}
                      height={frames[frame]?.height ?? 1}
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      quality={92}
                      priority
                      className="mx-auto h-auto max-h-[60dvh] w-auto max-w-full object-contain lg:max-h-[78dvh]"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {frameCount > 1 && (
                <div className="mt-4 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => goTo(frame - 1)}
                    aria-label="Previous image"
                    className="flex h-11 w-11 items-center justify-center border border-rule text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-canvas"
                  >
                    <Icon name="arrow-left" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(frame + 1)}
                    aria-label="Next image"
                    className="flex h-11 w-11 items-center justify-center border border-rule text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-canvas"
                  >
                    <Icon name="arrow-right" />
                  </button>
                  <p className="label ml-2" aria-hidden="true">
                    {String(frame + 1).padStart(2, '0')} / {String(frameCount).padStart(2, '0')}
                  </p>

                  {/*
                    Arrow keys swap the artwork silently — the <img> alt changes but
                    nothing re-announces it, so a screen-reader user hears only a
                    counter tick and is told nothing about what they are now looking
                    at. This region carries the new frame's description instead.
                  */}
                  <p className="sr-only" aria-live="polite">
                    {`Image ${frame + 1} of ${frameCount}. ${frames[frame]?.alt ?? ''}`}
                  </p>
                </div>
              )}
            </div>

            {/* ── Project meta ────────────────────────────────────────────── */}
            <div className="lg:order-2">
              <div className="flex items-start justify-between gap-4">
                <p className="label text-accent">{project.category}</p>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close project"
                  className="-mt-2 flex h-11 w-11 shrink-0 items-center justify-center text-ink transition-colors duration-200 hover:text-accent"
                >
                  <Icon name="close" className="h-6 w-6" />
                </button>
              </div>

              <h2 id={titleId} className="mt-3 font-display text-title font-semibold">
                {project.title}
              </h2>

              <p className="mt-5 text-body text-ink-muted">{project.description}</p>

              <dl className="mt-8 space-y-4 border-t border-rule pt-6">
                <div className="flex justify-between gap-6">
                  <dt className="label">Client</dt>
                  <dd className="text-right text-small">{project.client}</dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt className="label">Role</dt>
                  <dd className="text-right text-small">{project.role}</dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt className="label">Year</dt>
                  <dd className="text-right font-mono text-small">{project.year}</dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt className="label">Tools</dt>
                  <dd className="text-right text-small">{project.tools.join(', ')}</dd>
                </div>
              </dl>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
