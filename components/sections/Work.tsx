'use client';

import { useId, useState } from 'react';
import Image from 'next/image';
import { categoryTint, projects, type Project } from '@/data/projects';
import { cn } from '@/lib/cn';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Lightbox } from '@/components/ui/Lightbox';
import { ScrollStack, ScrollStackItem } from '@/components/ui/ScrollStack';
import { Icon } from '@/components/ui/Icon';

/**
 * The work, as a scroll-driven stack.
 *
 * Each piece is a card that pins near the top of the viewport as the page scrolls
 * and lets the next card rise to stack on top of it — the set overlaps one card at
 * a time, under scroll control (see ScrollStack). Every card carries its own
 * detail on the left and the artwork on the right, and selecting it — by click or
 * by Enter/Space on the stretched link over its title — opens the lightbox, where
 * the full gallery lives.
 *
 * A reduced-motion visitor gets the same cards as a plain vertical list with no
 * scroll-jacking (ScrollStack handles that fallback).
 */
function WorkCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const tint = categoryTint[project.category];
  const titleId = useId();

  return (
    <article className="grid md:h-[24rem] md:grid-cols-[1fr_1.15fr]">
      {/* ── Detail, left ─────────────────────────────────────────────────── */}
      <div className="order-2 flex flex-col justify-center gap-4 p-8 md:order-1 md:p-10">
        <span
          className={cn(
            'inline-flex w-fit items-center rounded-full px-3 py-1 font-mono text-label uppercase',
            tint.pill
          )}
        >
          {project.category}
        </span>

        <h3 id={titleId} className="font-display text-title font-semibold tracking-tight">
          {/* Stretched link: the whole card is clickable, the accessible name stays the title. */}
          <button
            type="button"
            onClick={() => onOpen(project)}
            aria-label={`${project.title} — ${project.category}. Open full size`}
            className="text-left outline-none after:absolute after:inset-0 after:content-['']"
          >
            {project.title}
          </button>
        </h3>

        <p className="font-display text-body-lg font-medium text-ink">{project.style}</p>
        <p className="text-small text-ink-muted">{project.client}</p>

        <span
          aria-hidden="true"
          className="mt-2 inline-flex items-center gap-1.5 text-label font-medium uppercase text-ink"
        >
          View full size
          <Icon name="arrow-up-right" className="h-3.5 w-3.5" />
        </span>
      </div>

      {/* ── Artwork, right ───────────────────────────────────────────────── */}
      <div className="relative order-1 h-56 w-full overflow-hidden md:order-2 md:h-full">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes="(max-width: 768px) 100vw, 55vw"
          quality={88}
          className="object-cover object-top"
        />
      </div>
    </article>
  );
}

export function Work() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="work" className="scroll-mt-24 py-24 md:py-36">
      <div className="shell">
        <SectionHeader
          index="01"
          title="Selected Work"
          standfirst="Packaging, campaigns, print and identity — made for manufacturers, schools, brokers and retail brands around Tiruppur, Namakkal and Salem. Scroll through the stack; click any piece to open its full gallery and details."
        />
      </div>

      {/* Whole-page scroll drives the stacking. Cards are held to a readable column. */}
      <ScrollStack useWindowScroll className="shell" itemDistance={80} itemStackDistance={26}>
        {projects.map((project) => (
          <ScrollStackItem key={project.slug} itemClassName="mx-auto max-w-4xl">
            <WorkCard project={project} onOpen={setActive} />
          </ScrollStackItem>
        ))}
      </ScrollStack>

      <Lightbox project={active} onClose={() => setActive(null)} />
    </section>
  );
}
