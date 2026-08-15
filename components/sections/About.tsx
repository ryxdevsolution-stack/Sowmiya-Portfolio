import { profile } from '@/data/site';
import { specSheet, capabilities } from '@/data/toolkit';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal, RevealList, RevealItem } from '@/components/ui/Reveal';

/**
 * Built on rhythm, not on boxes.
 *
 * The section steps deliberately between scales — a display-size statement, then
 * dense body copy against a spec sheet, then a full-width pull quote, then a
 * structured index. A page where every element sits at 16–20px reads as flat no
 * matter how good the writing is; contrast in scale is what makes a layout feel
 * designed rather than merely typed.
 *
 * Server component: none of this needs to reach the browser as JavaScript.
 */
export function About() {
  return (
    <section id="about" className="rule-t scroll-mt-24 py-24 md:py-36">
      <div className="shell">
        <SectionHeader index="02" title="About" />

        {/* ── 1. The statement. Sets the terms before any detail. ─────────── */}
        <Reveal>
          <p className="max-w-5xl font-display text-[clamp(1.5rem,3.4vw,3rem)] font-semibold leading-[1.15] tracking-tight">
            I design for three surfaces that punish mistakes differently — the
            <span className="text-accent"> press</span>, the
            <span className="text-accent"> shelf</span>, and the
            <span className="text-accent"> screen</span> — and I resolve the design
            <span className="text-accent"> completely</span> before it reaches any of them.
          </p>
        </Reveal>

        {/* ── 2. Narrative. One column, held to a readable measure. ───────── */}
        <Reveal className="mt-16 border-t border-rule pt-12 md:mt-24">
          <div className="max-w-measure space-y-6 text-body-lg text-ink-muted">
            <p className="text-ink">
              I&apos;m {profile.firstName}, a designer working out of {profile.location},
              mostly for manufacturers, schools and small retail brands.
            </p>
            <p>
              I started in textile and embroidery design, digitising artwork for machines
              that stitch it in thread. That work has an unforgiving feedback loop — if the
              file is wrong, the fabric shows it and the run is wasted. It taught me to
              resolve a design completely before it leaves my hands.
            </p>
            <p>
              I carried that into print and packaging, where bleed, trapping and separation
              decide whether a job survives the press, and where a food label has to earn its
              shelf appeal in whatever space the mandatory marks leave behind. The same
              discipline shows up in interface work as consistent spacing, honest hierarchy,
              and components that hold together under real content.
            </p>
            <p>
              More recently I have been working with AI as part of that process — prompt
              engineering with Claude and Figma to move from a brief to directed concepts,
              then iterating until the detail holds up. A vague prompt returns a generic
              answer, so I write them the way I write a spec: state the constraints, name the
              intent, and be precise about what the design has to survive.
            </p>
          </div>
        </Reveal>

        {/*
          ── 3. The colophon. ────────────────────────────────────────────────
          A full-width table, values set INLINE and separated by rules — the
          convention of a book colophon or a technical drawing legend.

          The earlier version stacked each value on its own line, which is just a
          bulleted list wearing a table's clothes: tall, thin, and visually inert.
          Setting the values as a horizontal run turns the same content into a
          dense typographic band that spans the page and gives the section a
          horizontal beat between two vertical ones.

          <dl> is the honest element here — these genuinely are term/description pairs.
        */}
        <RevealList as="dl" className="mt-20 md:mt-28">
          {specSheet.map((row) => (
            <RevealItem
              key={row.label}
              className="group grid items-baseline gap-x-8 gap-y-2 border-t border-rule py-6 last:border-b sm:grid-cols-[8rem_1fr] md:py-7"
            >
              <dt className="label transition-colors duration-300 group-hover:text-accent">
                {row.label}
              </dt>
              <dd className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                {row.values.map((value, i) => (
                  <span key={value} className="flex items-baseline gap-4">
                    {/* Hairline separator between values, never before the first. */}
                    {i > 0 && (
                      <span aria-hidden="true" className="text-rule">
                        /
                      </span>
                    )}
                    <span className="text-body-lg text-ink">{value}</span>
                  </span>
                ))}
              </dd>
            </RevealItem>
          ))}
        </RevealList>

        {/* ── 3. The quote. The only serif on the site, used exactly once. ── */}
        <Reveal>
          <figure className="mt-20 border-y border-rule py-14 md:mt-28 md:py-20">
            <blockquote>
              <p className="mx-auto max-w-4xl text-center font-serif text-[clamp(1.5rem,3.6vw,3.25rem)] italic leading-[1.25] text-ink">
                Decoration is what you add when the design isn&apos;t working.
                <span className="text-accent"> I&apos;d rather fix the design.</span>
              </p>
            </blockquote>
          </figure>
        </Reveal>

        {/* ── 4. The index. Structured, scannable, closes the section. ────── */}
        {/* Five services (Prompt Engineering joins the four design disciplines), so
            the large-screen track count matches the item count for a single clean row. */}
        <RevealList as="ul" className="mt-20 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {capabilities.map((capability, index) => (
            <RevealItem as="li" key={capability.title} className="border-t border-rule pt-5">
              <span className="label text-accent" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              {/* Smaller than text-title: five columns are narrow and the corporate
                  names ("Corporate Communications") are long, so a title-scale here
                  overflows the column and collides with its neighbour. */}
              <h3 className="mt-3 font-display text-[clamp(1.1rem,0.9rem+0.7vw,1.5rem)] font-semibold leading-tight tracking-tight">
                {capability.title}
              </h3>
              <p className="mt-2 text-small text-ink-muted">{capability.note}</p>
            </RevealItem>
          ))}
        </RevealList>
      </div>
    </section>
  );
}
