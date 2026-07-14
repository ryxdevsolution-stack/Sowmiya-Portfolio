import { navLinks, profile, primaryEmail } from '@/data/site';
import { Icon } from '@/components/ui/Icon';

/**
 * Server component. The old footer shipped 20 animated particles and a morphing
 * SVG wave to the client to render, essentially, a copyright line.
 *
 * The year is computed at build time — a portfolio is statically generated, so
 * there is no benefit to computing it in the browser.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="rule-t">
      <div className="shell py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-title font-semibold tracking-tight">
              {profile.firstName}
              <span className="text-accent">.</span>
              {profile.lastName}
            </p>
            <p className="mt-2 text-small text-ink-muted">{profile.role}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="link-underline label">
                {link.label}
              </a>
            ))}
            <a href={primaryEmail} className="link-underline label text-accent">
              Email
              <Icon name="arrow-up-right" className="ml-1 inline-block h-3 w-3" />
            </a>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-rule pt-6 sm:flex-row sm:justify-between">
          <p className="label">
            © {year} {profile.firstName} {profile.lastName}
          </p>
          <p className="label">{profile.location}, India</p>
        </div>
      </div>
    </footer>
  );
}
