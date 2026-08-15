'use client';

import { useMemo, useState } from 'react';
import { categoryTint, projects, type Project, type ProjectCategory } from '@/data/projects';
import { cn } from '@/lib/cn';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Lightbox } from '@/components/ui/Lightbox';
import { Reveal } from '@/components/ui/Reveal';
import { AccordionGallery, type AccordionGalleryItem } from '@/components/ui/AccordionGallery';

/**
 * The work, as an expanding accordion.
 *
 * Every piece is a panel in a single row. Hovering, focusing or tapping one
 * expands it and reveals its caption; activating the expanded panel opens the
 * lightbox, where the artwork is finally shown whole and uncropped.
 *
 * ─── ON WHAT THE PANELS SHOW ───────────────────────────────────────────────
 * A fixed-height row means every piece is cropped to a common panel, which for
 * a body of work spanning 1.73:1 business cards and 0.71:1 flyers is a hard
 * crop. The panels are therefore an INDEX, not the presentation: they are
 * anchored to the top of each artwork, where the brand lockup and the headline
 * sit, and the lightbox behind them is what shows the piece at its true ratio
 * with nothing cut away.
 *
 * ─── ON THE FILTER ─────────────────────────────────────────────────────────
 * Filtering is client-side over a fixed eight-item array. It matters more here
 * than it would in a grid: fewer panels means each collapsed one is wider, so
 * narrowing to a discipline genuinely improves how much of each piece is
 * readable rather than only shortening the list.
 * ───────────────────────────────────────────────────────────────────────────
 */

const ALL = 'All' as const;
type Filter = ProjectCategory | typeof ALL;

/** Disciplines in the order they first appear in the work, plus the All lead. */
const filters: Filter[] = [ALL, ...Array.from(new Set(projects.map((p) => p.category)))];

export function Work() {
  const [active, setActive] = useState<Project | null>(null);
  const [filter, setFilter] = useState<Filter>(ALL);

  const shown = useMemo(
    () => (filter === ALL ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  /** Tally per discipline, so a filter can show how much sits behind it. */
  const counts = useMemo(() => {
    const map = new Map<Filter, number>([[ALL, projects.length]]);
    for (const p of projects) map.set(p.category, (map.get(p.category) ?? 0) + 1);
    return map;
  }, []);

  const items: AccordionGalleryItem[] = useMemo(
    () =>
      shown.map((project) => ({
        id: project.slug,
        image: project.cover.src,
        width: project.cover.width,
        height: project.cover.height,
        alt: project.cover.alt,
        label: project.title,
        meta: `${project.client} · ${project.style}`,
        badge: (
          <span
            className={cn(
              'inline-flex items-center rounded-full px-3 py-1 font-mono text-label uppercase',
              categoryTint[project.category].pill
            )}
          >
            {project.category}
          </span>
        ),
      })),
    [shown]
  );

  return (
    <section id="work" className="scroll-mt-24 py-24 md:py-36">
      <div className="shell">
        <SectionHeader
          index="01"
          title="Selected Work"
          standfirst="Packaging, campaigns, print and identity — made for manufacturers, schools, brokers and retail brands around Tiruppur, Namakkal and Salem. Filter by discipline, then open any piece to see it full size."
        />

        {/* ── Filter ────────────────────────────────────────────────────────
            Buttons, not links: this changes what is displayed, not where the
            visitor is. `aria-pressed` is what communicates the toggle state. */}
        <Reveal>
          <div
            role="group"
            aria-label="Filter work by discipline"
            className="mb-10 flex flex-wrap items-center gap-2 md:mb-14"
          >
            {filters.map((name) => {
              const selected = filter === name;
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => setFilter(name)}
                  aria-pressed={selected}
                  className={cn(
                    // 44px minimum touch target, per WCAG / Apple HIG.
                    'inline-flex h-11 items-center gap-2 rounded-full border px-5 text-small font-medium',
                    'transition-colors duration-200 ease-editorial',
                    selected
                      ? 'border-ink bg-ink text-canvas'
                      : 'border-rule text-ink-muted hover:border-ink hover:text-ink'
                  )}
                >
                  {name}
                  <span
                    className={cn(
                      'font-mono text-label',
                      selected ? 'text-canvas/60' : 'text-ink-muted/70'
                    )}
                  >
                    {counts.get(name) ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal>
          <AccordionGallery
            // No `key` remount needed: AccordionGallery resets to defaultIndex
            // itself when the item set changes identity.
            items={items}
            label={filter === ALL ? 'Selected work' : `Selected work — ${filter}`}
            defaultIndex={0}
            expandRatio={0.52}
            trigger="hover"
            height={540}
            gap={10}
            radius={16}
            onSelect={(i) => setActive(shown[i] ?? null)}
          />
        </Reveal>

        <p className="mt-6 text-small text-ink-muted">
          Hover, tab to, or tap a piece to expand it — then open it to see the artwork full
          size, uncropped.
        </p>

        {/* Announce the result of a filter, which is otherwise a silent change. */}
        <p className="sr-only" aria-live="polite">
          {`Showing ${shown.length} ${shown.length === 1 ? 'piece' : 'pieces'}${
            filter === ALL ? '' : ` in ${filter}`
          }.`}
        </p>
      </div>

      <Lightbox project={active} onClose={() => setActive(null)} />
    </section>
  );
}
