import { contactChannels, profile } from '@/data/site';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal, RevealList, RevealItem } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';

const email = contactChannels.find((channel) => channel.icon === 'mail');

/**
 * The email address itself is the call to action, set at display scale. A gradient
 * pill button labelled "Get In Touch" hides the one piece of information the
 * visitor actually came for.
 */
export function Contact() {
  return (
    <section id="contact" className="rule-t scroll-mt-24 py-24 md:py-36">
      <div className="shell">
        <SectionHeader
          index="04"
          title="Contact"
          standfirst="Open to freelance commissions and full-time roles. The fastest way to reach me is email."
        />

        {email && (
          <Reveal>
            <a
              href={email.href}
              className="group block break-words border-b border-rule pb-10 font-display text-[clamp(1.75rem,5.5vw,5rem)] font-semibold leading-[1.05] tracking-tight transition-colors duration-300 ease-editorial hover:text-accent"
            >
              {email.value}
              <Icon
                name="arrow-up-right"
                className="ml-3 inline-block h-[0.6em] w-[0.6em] align-baseline transition-transform duration-300 ease-editorial group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          </Reveal>
        )}

        <RevealList as="ul" className="mt-12 grid gap-8 sm:grid-cols-3">
          {contactChannels.map((channel) => (
            <RevealItem as="li" key={channel.label}>
              <h3 className="label mb-3">{channel.label}</h3>
              <a
                href={channel.href}
                {...(channel.href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="link-underline inline-flex items-center gap-2.5 text-body"
              >
                <Icon name={channel.icon} className="h-4 w-4 shrink-0 text-ink-muted" />
                {channel.value}
              </a>
            </RevealItem>
          ))}
        </RevealList>

        <Reveal className="mt-16">
          <p className="text-small text-ink-muted">
            Currently in {profile.location} · {profile.availability}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
