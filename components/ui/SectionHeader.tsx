import { Reveal } from './Reveal';

interface SectionHeaderProps {
  /** Editorial index, e.g. "01". Purely typographic — hidden from screen readers. */
  index: string;
  title: string;
  /** Optional standfirst, kept to a single readable measure. */
  standfirst?: string;
}

export function SectionHeader({ index, title, standfirst }: SectionHeaderProps) {
  return (
    <Reveal className="mb-12 md:mb-20">
      <div className="flex items-baseline gap-4 border-b border-rule pb-5">
        <span className="label text-accent" aria-hidden="true">
          {index}
        </span>
        <h2 className="font-display text-section font-semibold">{title}</h2>
      </div>
      {standfirst && (
        <p className="mt-6 max-w-measure text-body-lg text-ink-muted">{standfirst}</p>
      )}
    </Reveal>
  );
}
