import { roles, education } from '@/data/experience';
import { profile } from '@/data/site';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal, RevealList, RevealItem } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';

/**
 * An editorial index rather than a card grid: hairline rules and a strict
 * baseline do the separating, so no box, shadow or gradient is needed.
 */
export function Experience() {
  return (
    <section id="experience" className="rule-t scroll-mt-24 py-24 md:py-36">
      <div className="shell">
        <SectionHeader index="03" title="Experience" />

        <RevealList as="ul" className="mb-20">
          {roles.map((role, index) => (
            <RevealItem
              as="li"
              key={role.title}
              className="grid gap-4 border-b border-rule py-8 md:grid-cols-[10rem_1fr] md:gap-12 md:py-10"
            >
              {/* The sequence index, where the tenure used to sit. It holds the
                  grid open without advertising how many months the job lasted. */}
              <p className="label pt-1.5 text-accent" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </p>
              <div>
                <h3 className="font-display text-title font-semibold">{role.title}</h3>
                <p className="mt-1 text-body text-accent">{role.organisation}</p>
                <ul className="mt-5 max-w-measure space-y-2">
                  {role.points.map((point) => (
                    <li key={point} className="flex gap-3 text-body text-ink-muted">
                      <span aria-hidden="true" className="select-none text-rule">
                        —
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealList>

        <Reveal className="mb-8">
          <h3 className="label">Education</h3>
        </Reveal>

        <RevealList as="ul">
          {education.map((item) => (
            <RevealItem
              as="li"
              key={item.institution}
              className="grid gap-2 border-b border-rule py-6 md:grid-cols-[10rem_1fr_auto] md:items-baseline md:gap-12"
            >
              <p className="label">{item.period}</p>
              <p className="text-body">{item.institution}</p>
              <p className="text-small text-ink-muted">{item.qualification}</p>
            </RevealItem>
          ))}
        </RevealList>

        <Reveal className="mt-12">
          <a
            href={profile.resumeUrl}
            download
            className="link-underline inline-flex items-center gap-2 text-small font-medium"
          >
            Download full résumé (PDF)
            <Icon name="arrow-up-right" className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
