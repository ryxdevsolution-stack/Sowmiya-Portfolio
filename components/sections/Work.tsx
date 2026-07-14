'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects, type Project } from '@/data/projects';
import { DURATION, EASE_EDITORIAL, STAGGER } from '@/lib/motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Lightbox } from '@/components/ui/Lightbox';

/**
 * The lead piece runs full width; everything else flows in a masonry.
 *
 * ─── WHY MASONRY AND NOT A GRID ────────────────────────────────────────────
 * A CSS grid places items into a rectangular lattice. When a tall card (a 3:4
 * flyer) and a short one (a 16:9 business card) share a row, the short one
 * leaves dead space beneath it — a visible hole. `grid-flow-dense` doesn't help:
 * it backfills whole empty CELLS, not partial vertical gaps.
 *
 * This work has genuinely mixed proportions — packaging sleeves, A4 flyers,
 * landscape business cards, square social posts — so a lattice will always be
 * ragged. Multi-column flow ("masonry") stacks each card directly beneath the
 * previous one in its column, so gaps cannot form. It is what every serious
 * portfolio platform uses, for exactly this reason.
 *
 * There is no category filter, deliberately: across eight pieces a filter would
 * return one or two results per click, costing the visitor a decision and
 * returning nothing. Each card's pill already names the discipline.
 * ───────────────────────────────────────────────────────────────────────────
 */
export function Work() {
  const [active, setActive] = useState<Project | null>(null);

  const [featured, ...rest] = projects;

  // No `useReducedMotion()` branching here — it returns false on the server and
  // true on a reduce-motion client, so branching `initial` on it made the SSR
  // markup disagree with the client's and React refused to patch it up.
  // <MotionProvider> suppresses motion globally instead. See MotionProvider.tsx.
  const reveal = (index: number) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '0px 0px -10% 0px' } as const,
    transition: {
      duration: DURATION.base,
      ease: EASE_EDITORIAL,
      // Capped: by the eighth card a per-index delay leaves the visitor waiting
      // on an animation instead of reading.
      delay: Math.min(index, 3) * STAGGER,
    },
  });

  return (
    <section id="work" className="shell scroll-mt-24 py-24 md:py-36">
      <SectionHeader
        index="01"
        title="Selected Work"
        standfirst="Packaging, campaigns, print and identity — made for manufacturers, schools, brokers and retail brands around Tiruppur, Namakkal and Salem. Select any piece to see it full size."
      />

      {/* The lead piece, full width and inverted to dark, so the eye lands here first. */}
      <motion.div className="mb-5" {...reveal(0)}>
        <ProjectCard project={featured} onOpen={setActive} />
      </motion.div>

      {/*
        Masonry. `break-inside-avoid` stops a card being sliced across a column
        boundary; the margin-bottom on each child supplies the vertical gutter,
        because `gap` only controls the space BETWEEN columns here, not within them.

        No `priority` on any image: the page opens with a full-viewport, purely
        typographic hero, so no artwork is above the fold. Preloading would make
        the browser race to fetch images nobody can see yet, competing with the
        fonts and text that actually are the LCP.
      */}
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {rest.map((project, index) => (
          <motion.div
            key={project.slug}
            className="mb-5 break-inside-avoid"
            {...reveal(index + 1)}
          >
            <ProjectCard project={project} onOpen={setActive} />
          </motion.div>
        ))}
      </div>

      <Lightbox project={active} onClose={() => setActive(null)} />
    </section>
  );
}
