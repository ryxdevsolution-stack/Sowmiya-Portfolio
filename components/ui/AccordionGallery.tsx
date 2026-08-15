'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/cn';

/**
 * Expanding image accordion. Adapted from the React Bits `AccordionGallery`
 * (reactbits.dev), ported to this codebase's conventions.
 *
 * ─── WHAT CHANGED FROM UPSTREAM, AND WHY ───────────────────────────────────
 * The upstream component is built for stock photography. Four of its defaults
 * work against a graphic-design portfolio, so they were changed rather than
 * merely re-configured:
 *
 *   next/image, not <img>. Upstream ships a bare <img> with no dimensions. Every
 *   other image on this site goes through next/image with the artwork's real
 *   pixel width and height, which is what reserves the box before load and holds
 *   CLS at zero. A raw <img> here would have been the one exception.
 *
 *   Tokens, not hex. Upstream hardcodes #060010 / #0a0713 / #ffffff, which
 *   cannot follow a theme. Everything here reads the canvas/surface/ink/accent
 *   tokens, so the gallery is correct in both light and dark without a second
 *   set of values to keep in sync.
 *
 *   Grayscale defaults OFF. Upstream desaturates every collapsed panel. On this
 *   body of work the colourway IS the deliverable — the magenta Hummingbird
 *   sleeve, SRR's blue carton — so greying out seven of eight pieces hides the
 *   thing a visitor came to judge.
 *
 *   CSS transitions, not GSAP. Upstream drives everything through a GSAP
 *   timeline. framer-motion is already in this bundle; adding GSAP would mean
 *   two animation libraries (~50KB) for one section. Plain CSS transitions do
 *   this job, and they inherit the global `prefers-reduced-motion` rule in
 *   globals.css for free rather than needing a parallel JS branch.
 *
 * ─── ON ACCESSIBILITY ──────────────────────────────────────────────────────
 * Upstream marks the container `role="list"`, each panel `role="listitem"` with
 * `tabIndex={0}`, and hides the caption with `aria-hidden`. That combination is
 * broken three ways: listitems are not interactive, so a focusable one has no
 * announced role; the accessible name comes from an `aria-label` that duplicates
 * text already on screen; and `aria-hidden` on the caption removes the only
 * visible label from the tree.
 *
 * Here each panel is a real <button> inside a real <li>. The caption is NOT
 * aria-hidden — it is hidden with opacity, which keeps it in the accessibility
 * tree, so every panel is named by its own visible text whether it is expanded
 * or not. Focus expands a panel, so a keyboard visitor always sees where it is.
 *
 * ─── ON THE COST OF THIS PATTERN ───────────────────────────────────────────
 * An accordion animates flex-grow, which is a layout property — it cannot run on
 * the compositor the way transform and opacity can. That is inherent to the
 * pattern, not to this implementation: resizing panels IS the effect. With a
 * handful of panels it holds frame; it would not at fifty.
 * ───────────────────────────────────────────────────────────────────────────
 */

export interface AccordionGalleryItem {
  /** Stable identity. Index keys break the expand state when the set is filtered. */
  id: string;
  image: string;
  /** Real pixel dimensions of the source file, for next/image. */
  width: number;
  height: number;
  alt: string;
  /** Shown as the caption on the expanded panel, and names the panel's button. */
  label: string;
  /** Optional second caption line. */
  meta?: string;
  /** Optional element in the panel's top corner — a category pill, say. */
  badge?: ReactNode;
}

export interface AccordionGalleryProps {
  items: AccordionGalleryItem[];
  /** Panel expanded on load, so the gallery never looks dead. */
  defaultIndex?: number;
  /** Fraction of the row the expanded panel takes. Clamped to 0.2–0.9. */
  expandRatio?: number;
  /** How a panel expands on pointer devices. Focus and tap always expand too. */
  trigger?: 'hover' | 'click';
  /** Desaturate collapsed panels. Off by default — see the note above. */
  grayscale?: boolean;
  /** Degrees of 3D rotation on collapsed panels. 0 disables it. */
  tilt?: number;
  /** Strength of the image drift as panels resize. 0 disables it. */
  parallax?: number;
  /** Height of the row in px. Ignored below `md`, where this stacks. */
  height?: number;
  gap?: number;
  radius?: number;
  /** Fired when an already-expanded panel is activated. */
  onSelect?: (index: number) => void;
  /** Accessible name for the list. */
  label: string;
  className?: string;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function AccordionGallery({
  items,
  defaultIndex = 0,
  expandRatio = 0.52,
  trigger = 'hover',
  grayscale = false,
  tilt = 6,
  parallax = 0.5,
  height = 520,
  gap = 10,
  radius = 16,
  onSelect,
  label,
  className,
}: AccordionGalleryProps) {
  const count = items.length;
  const rootRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(() => clamp(defaultIndex, 0, Math.max(count - 1, 0)));

  /**
   * The expanded index, mirrored synchronously.
   *
   * `active` from the render closure is NOT safe to branch on inside onClick.
   * Moving onto a panel and clicking it fires mouseenter and click in the same
   * task, so React has not re-rendered in between and the click handler still
   * sees the PREVIOUS panel as active. The effect is that a quick click is
   * swallowed — the panel merely re-expands instead of opening — and it only
   * shows up when the pointer moves and clicks inside one frame, which is what
   * a decisive user does and a slow test never reproduces.
   *
   * The ref is written before the state update, so click always branches on what
   * is true now rather than on what was true at last paint.
   */
  const activeRef = useRef(active);

  const setActivePanel = useCallback((next: number) => {
    activeRef.current = next;
    setActive(next);
  }, []);

  /**
   * Reset the expanded panel whenever the SET changes, not merely its length.
   *
   * Clamping the old index into the new range (the obvious fix) is wrong: filter
   * eight pieces down to two with panel eight open and the clamp lands on the
   * last of the two, so a filter appears to open an arbitrary piece. Comparing
   * the item identities instead means any change of set — reorder, filter,
   * replace — returns to `defaultIndex`, which is the only index that means
   * anything to the caller.
   *
   * Adjusted during render rather than in an effect, so React resolves it in one
   * pass instead of painting the wrong panel and then correcting it.
   */
  const signature = items.map((item) => item.id).join(' ');
  const [lastSignature, setLastSignature] = useState(signature);
  if (signature !== lastSignature) {
    setLastSignature(signature);
    setActive(clamp(defaultIndex, 0, Math.max(count - 1, 0)));
  }

  /*
   * Reconcile the mirror after every render, which covers the paths that do not
   * go through setActivePanel — the reset above, and a changed `defaultIndex`.
   * Interaction still writes the ref synchronously, and that is the only path
   * where the mouseenter/click race can occur, so nothing here reopens it.
   */
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const ratio = clamp(expandRatio, 0.2, 0.9);
  /** Flex-grow the open panel needs to occupy `ratio` of the row. */
  const grow = count > 1 ? (ratio * (count - 1)) / (1 - ratio) : 1;

  /**
   * The media layer is deliberately WIDER than its panel and centred, which is
   * what gives the parallax something to slide and stops the image squashing as
   * the panel resizes. Measured from the container rather than assumed, so it
   * stays right across breakpoints.
   */
  const [mediaSize, setMediaSize] = useState(420);

  /**
   * Whether this is a device that really hovers.
   *
   * Touch browsers synthesise mouseover/mouseenter immediately before click, so
   * a hover-triggered accordion collapses into a single gesture on a phone: the
   * tap expands the panel and activates it in the same event, and a visitor can
   * never browse the panels at all — the first tap they make opens the lightbox.
   * Gating on `(hover: hover)` restores the two-stage tap (expand, then open)
   * where it is needed and leaves the mouse behaviour untouched.
   *
   * Starts false so the server render assumes no hover — the safe default, since
   * a touch device that briefly allows hover loses nothing, whereas a phone
   * rendered hover-capable would fire the bug above before the effect corrects it.
   */
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setCanHover(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  /**
   * Last known pointer position, used to tell a real hover from a scrolled one.
   *
   * `mouseenter` does not mean "the visitor pointed at this". It also fires when
   * the page scrolls under a stationary cursor and a new element slides beneath
   * it — so wheeling past this section, or following the header's smooth-scroll
   * anchor to it, expands whichever panel happens to drift under the mouse. The
   * visitor sees a panel open by itself, and which one is decided by where they
   * happened to leave the cursor.
   *
   * The tell is that a scroll never changes the pointer's VIEWPORT coordinates,
   * and a real movement always does. Since `pointermove` fires after `mouseenter`
   * on entry, this ref still holds the previous position when the check runs:
   * equal coordinates mean the page moved, not the pointer.
   *
   * The simpler version of this — a boolean armed by pointermove and cleared by
   * scroll — swallows the first genuine hover after any scroll, because the
   * mouseenter that should open a panel arrives before the pointermove that
   * would have armed it.
   */
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const track = (event: PointerEvent) => {
      lastPointerRef.current = { x: event.clientX, y: event.clientY };
    };

    window.addEventListener('pointermove', track, { passive: true });
    return () => window.removeEventListener('pointermove', track);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const measure = () => {
      const usable = Math.max(el.getBoundingClientRect().width - gap * (count - 1), 120);
      setMediaSize(Math.max(180, usable * ratio * 1.22));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [gap, count, ratio]);

  if (count === 0) return null;

  const move = (from: number, delta: number) => {
    const next = (from + delta + count) % count;
    setActivePanel(next);
    // Focus follows, so the expanded panel and the focused panel never diverge.
    rootRef.current
      ?.querySelectorAll<HTMLButtonElement>('button[data-ag-panel]')
      [next]?.focus();
  };

  return (
    <ul
      ref={rootRef}
      aria-label={label}
      className={cn('ag-root flex w-full max-w-full flex-col md:flex-row', className)}
      style={{
        gap: `${gap}px`,
        height: `${height}px`,
        perspective: '1400px',
        // Read by the stacked-layout height calc in globals.css.
        ['--ag-count' as string]: count,
      }}
    >
      {items.map((item, i) => {
        const isActive = i === active;
        /** Collapsed panels tilt away from the open one; the open one lies flat. */
        const angle = isActive ? 0 : i < active ? tilt : -tilt;
        /** Drift is capped so distant panels don't slide their image out of frame. */
        const drift = clamp(active - i, -1.5, 1.5);
        const shift = isActive ? 0 : drift * parallax * mediaSize * 0.06;

        return (
          <li
            key={item.id}
            className={cn(
              'ag-panel relative min-w-0 overflow-hidden bg-surface',
              'transition-[flex-grow,transform] duration-[600ms] ease-editorial',
              'shadow-[0_10px_30px_-18px_rgba(0,0,0,0.55)]'
            )}
            style={{
              flexGrow: isActive ? grow : 1,
              flexBasis: 0,
              borderRadius: `${radius}px`,
              // Read by the .ag-panel / .ag-media rules in globals.css, which is
              // where the transforms live so a media query can cancel them wholesale.
              ['--ag-tilt' as string]: `${angle}deg`,
              ['--ag-shift' as string]: `${shift}px`,
              ['--ag-media' as string]: `${mediaSize}px`,
            }}
          >
            <button
              type="button"
              data-ag-panel=""
              // Expanded state is visual, and `aria-current` says which of a set
              // is the one in view without claiming a disclosure relationship
              // the panel does not have.
              aria-current={isActive ? 'true' : undefined}
              onClick={() => {
                // A collapsed panel expands first. On a touch device that tap is
                // the only way to open it, and firing the selection immediately
                // would mean a visitor never sees what they picked.
                if (activeRef.current !== i) {
                  setActivePanel(i);
                  return;
                }
                onSelect?.(i);
              }}
              onMouseEnter={(event) => {
                if (trigger !== 'hover' || !canHover) return;
                // Reject the mouseenter a scroll produces under a stationary
                // cursor — see the note on lastPointerRef.
                const last = lastPointerRef.current;
                const pointerMoved =
                  !last || last.x !== event.clientX || last.y !== event.clientY;
                if (pointerMoved) setActivePanel(i);
              }}
              onFocus={(event) => {
                /*
                 * Keyboard focus only.
                 *
                 * A pointer press focuses the button before it clicks it, so an
                 * unconditional setActive here made every panel active by the
                 * time onClick ran — which silently defeated the tap-to-expand
                 * stage above and sent the first tap of a touch visitor straight
                 * into the lightbox. `:focus-visible` is exactly the distinction
                 * needed: it is set for keyboard traversal and not for a press.
                 */
                if (event.currentTarget.matches(':focus-visible')) setActivePanel(i);
              }}
              onKeyDown={(event) => {
                if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                  event.preventDefault();
                  move(i, 1);
                } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                  event.preventDefault();
                  move(i, -1);
                }
              }}
              className={cn(
                'group absolute inset-0 block w-full cursor-pointer text-left outline-none',
                'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent'
              )}
            >
              {/* ── Artwork ────────────────────────────────────────────────── */}
              <span
                className={cn(
                  'ag-media absolute block',
                  'transition-[transform,filter] duration-[600ms] ease-editorial',
                  grayscale && !isActive && 'grayscale'
                )}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  quality={88}
                  priority={i === defaultIndex}
                  // Top-anchored: on packaging and flyers the brand lockup and
                  // headline live at the top, and the caption occupies the bottom.
                  className="object-cover object-top"
                  draggable={false}
                />
              </span>

              {/*
                Scrim, only under the caption and only on the expanded panel —
                the collapsed panels carry no text, so there is nothing to make
                legible and no reason to dim the artwork.
              */}
              <span
                aria-hidden="true"
                className={cn(
                  'absolute inset-x-0 bottom-0 block h-2/5 bg-gradient-to-t from-black/85 via-black/40 to-transparent',
                  'transition-opacity duration-[600ms] ease-editorial',
                  isActive ? 'opacity-100' : 'opacity-0'
                )}
              />

              {/*
                The badge reveals with the panel. A collapsed panel is ~90px
                wide at eight items, which clips a category pill mid-word
                ("PACKAGI"), so showing it there is worse than not showing it.
                Hidden by opacity rather than unmounted, so it stays in the
                accessible name and the panel's button is still announced with
                its discipline.
              */}
              {item.badge && (
                <span
                  className={cn(
                    'absolute left-4 top-4 z-10',
                    'transition-opacity duration-[600ms] ease-editorial',
                    isActive ? 'opacity-100' : 'opacity-0'
                  )}
                >
                  {item.badge}
                </span>
              )}

              {/* ── Caption ────────────────────────────────────────────────── */}
              <span
                className={cn(
                  'absolute inset-x-5 bottom-5 z-10 flex items-center gap-3',
                  // NOT aria-hidden: opacity keeps this in the accessibility
                  // tree, so a collapsed panel's button is still named by it.
                  'transition-[opacity,transform] duration-[600ms] ease-editorial',
                  isActive ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0'
                )}
              >
                <span
                  aria-hidden="true"
                  className="h-7 w-[3px] shrink-0 rounded-full bg-accent"
                />
                <span className="min-w-0">
                  <span className="block truncate font-display text-body-lg font-semibold text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.55)]">
                    {item.label}
                  </span>
                  {item.meta && (
                    <span className="mt-0.5 block truncate text-small text-white/80 [text-shadow:0_2px_14px_rgba(0,0,0,0.55)]">
                      {item.meta}
                    </span>
                  )}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
