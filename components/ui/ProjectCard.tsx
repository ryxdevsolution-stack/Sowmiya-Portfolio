'use client';

import Image from 'next/image';
import { useId } from 'react';
import { categoryTint, type Project } from '@/data/projects';
import { cn } from '@/lib/cn';
import { Icon } from './Icon';

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

/**
 * The image's aspect ratio, chosen per size to sit close to the artwork's own
 * proportions, so `object-cover` trims a few percent rather than butchering it.
 * The card's height follows from the image; nothing is stretched to fill a row.
 */
const ASPECT: Record<Project['size'], string> = {
  hero: 'aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]',
  wide: 'aspect-[16/9]',
  tall: 'aspect-[3/4]',
  square: 'aspect-square',
  normal: 'aspect-[4/3]',
};

/**
 * A bento card: the artwork IS the card, with a compact caption beneath it.
 *
 * ─── ON CROPPING ───────────────────────────────────────────────────────────
 * Grid images use `object-cover`, which crops; the lightbox never crops. That
 * split is deliberate. A card is a THUMBNAIL — its job is to make the work big
 * and worth clicking, and an uncropped image letterboxed in a padded mat is a
 * 200px stamp floating in whitespace: complete, and useless. The lightbox is
 * where the work is actually judged, so nothing is cropped there.
 * `object-top` anchors the crop to the head of the artwork, because flyers,
 * labels and social creative carry the logo and headline at the top — a centre
 * crop would remove exactly the part that identifies the piece.
 *
 * The hero is the exception: it shows the artwork whole (`object-contain`). On
 * the dark card, letterboxing reads as a gallery mount rather than a mistake.
 *
 * ─── ON THE MARKUP ─────────────────────────────────────────────────────────
 * The card is an <article>, NOT a <button> — and the button lives INSIDE the
 * <h3>, with `after:absolute after:inset-0` stretching its hit area across the
 * whole card ("stretched link").
 *
 * Wrapping the card in a <button> seems simpler, but `role="button"` is Children
 * Presentational: ARIA prunes every descendant role inside it. An audit confirmed
 * the cost — all eight project <h3>s disappeared from the heading outline, so
 * heading navigation could not reach a single project; and the button's
 * `aria-label` overrode the whole subtree, meaning the image's alt text was never
 * announced at all. This structure restores both.
 * ───────────────────────────────────────────────────────────────────────────
 */
export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const tint = categoryTint[project.category];
  const isHero = project.size === 'hero';
  const summaryId = useId();

  return (
    <article
      className={cn(
        'group relative flex w-full flex-col overflow-hidden rounded-2xl border text-left',
        'transition-[transform,border-color] duration-500 ease-editorial',
        'hover:-translate-y-1 hover:border-accent',
        // The focus ring belongs on the card, since the button's hit area covers it.
        // It is NOT part of the transition above: box-shadow was in that list, and
        // the ring is a box-shadow, so it used to fade in over 500ms and never
        // reached full strength during fast tabbing.
        'focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 focus-within:ring-offset-canvas',
        isHero ? 'border-ink bg-ink text-canvas' : 'border-rule bg-surface'
      )}
    >
      {/* The discipline's colour, as a rule across the top edge. */}
      <span aria-hidden="true" className={cn('h-1 w-full shrink-0', tint.bar)} />

      <div className={cn('relative w-full overflow-hidden', ASPECT[project.size])}>
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes={isHero ? '(max-width: 768px) 100vw, 90vw' : '(max-width: 640px) 100vw, 33vw'}
          loading="lazy"
          quality={88}
          className={cn(
            'transition-transform duration-700 ease-editorial group-hover:scale-[1.04]',
            isHero ? 'object-contain p-4 sm:p-6' : 'object-cover object-top'
          )}
        />

        {/* Opaque, so its contrast does not depend on the artwork behind it. */}
        <span
          className={cn(
            'absolute left-3 top-3 rounded-full px-2.5 py-1 font-mono text-label uppercase',
            tint.pill
          )}
        >
          {project.category}
        </span>

        <span
          aria-hidden="true"
          className="absolute right-3 top-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-canvas text-ink opacity-0 transition-all duration-300 ease-editorial group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Icon name="arrow-up-right" className="h-4 w-4" />
        </span>
      </div>

      <div className={cn('shrink-0 px-4 py-3.5', isHero && 'px-5 py-4')}>
        <div className="flex items-baseline justify-between gap-3">
          <h3
            className={cn(
              'min-w-0 font-display font-semibold tracking-tight',
              isHero ? 'text-body-lg' : 'text-body'
            )}
          >
            <button
              type="button"
              onClick={() => onOpen(project)}
              aria-describedby={summaryId}
              // Stretches the hit area over the entire card, so the whole thing is
              // clickable while the accessible name stays just the project title.
              className="block truncate text-left outline-none after:absolute after:inset-0 after:content-['']"
            >
              {project.title}
            </button>
          </h3>

          <span
            className={cn(
              'shrink-0 font-mono text-label',
              // /50 measured 3.51:1 on the inverted hero card — below AA. /60 clears it.
              isHero ? 'text-canvas/60' : 'text-ink-muted'
            )}
          >
            {project.year}
          </span>
        </div>

        <p
          id={summaryId}
          className={cn('mt-1 truncate text-small', isHero ? 'text-canvas/70' : 'text-ink-muted')}
        >
          {project.summary}
        </p>

        <div className="mt-2.5 flex items-center justify-between gap-3">
          <span
            className={cn(
              'truncate font-mono text-label',
              isHero ? 'text-canvas/60' : 'text-ink-muted'
            )}
          >
            {project.client}
          </span>
          {/* Decorative: the <button> above is the real control, and repeating
              "View" as a second tab stop would double the keyboard cost per card. */}
          <span
            aria-hidden="true"
            className={cn(
              'inline-flex shrink-0 items-center gap-1 text-label font-medium uppercase',
              isHero ? 'text-canvas' : 'text-ink group-hover:text-accent'
            )}
          >
            View
            <Icon
              name="arrow-up-right"
              className="h-3 w-3 transition-transform duration-300 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </article>
  );
}
