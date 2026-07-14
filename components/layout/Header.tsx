'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { navLinks, profile } from '@/data/site';
import { cn } from '@/lib/cn';
import { DURATION, EASE_EDITORIAL } from '@/lib/motion';
import { Icon } from '@/components/ui/Icon';
import { ThemeToggle } from './ThemeToggle';

/** Section ids the scroll-spy watches, derived from the nav so the two can't drift. */
const sectionIds = navLinks.map((link) => link.href.replace('#', ''));

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const reduced = useReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const headerBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    // Passive: this listener never calls preventDefault, so the browser can
    // scroll without waiting on it.
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy. An IntersectionObserver costs nothing per frame, unlike reading
  // getBoundingClientRect() on every scroll event.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      // The band sits in the upper-middle of the viewport, so a section becomes
      // "current" as its heading reaches reading position.
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5] }
    );

    sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Lock scroll while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  /**
   * Make the page behind the menu inert.
   *
   * The overlay is opaque, but opacity is a purely visual property: without this,
   * every link and card underneath stays focusable and stays in the accessibility
   * tree. An audit counted 24 focusable stops reachable behind the overlay by
   * tabbing — each with an invisible focus ring — and a screen reader could browse
   * the whole page as if the menu weren't there.
   *
   * `inert` removes a subtree from focus, hit-testing and the a11y tree at once.
   */
  useEffect(() => {
    if (!menuOpen) return;

    const regions = [
      document.getElementById('main'),
      document.querySelector('footer'),
      headerBarRef.current,
    ].filter((el): el is HTMLElement => el !== null);

    regions.forEach((el) => el.setAttribute('inert', ''));
    return () => regions.forEach((el) => el.removeAttribute('inert'));
  }, [menuOpen]);

  // Escape closes the menu; Tab is trapped inside it.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !menuRef.current) return;

      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === menuRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  // Hand focus back to the button that opened the menu.
  useEffect(() => {
    if (!menuOpen) menuButtonRef.current?.focus({ preventScroll: true });
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-colors duration-300 ease-editorial',
          scrolled ? 'border-b border-rule bg-canvas/80 backdrop-blur-md' : 'bg-transparent'
        )}
      >
        <div ref={headerBarRef} className="shell flex h-20 items-center justify-between">
          <a
            href="#home"
            className="font-display text-body font-semibold tracking-tight"
            aria-label={`${profile.firstName} ${profile.lastName}, back to top`}
          >
            {profile.firstName}
            <span className="text-accent">.</span>
            {profile.lastName}
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'location' : undefined}
                  className={cn(
                    'label py-2 transition-colors duration-200',
                    isActive ? 'text-accent' : 'text-ink-muted hover:text-ink'
                  )}
                >
                  {link.label}
                </a>
              );
            })}
            <ThemeToggle />
          </nav>

          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="flex h-11 w-11 items-center justify-center"
            >
              <Icon name="menu" className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — full-screen, so nav items get generous touch targets. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-50 bg-canvas md:hidden"
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: reduced ? 0 : DURATION.fast, ease: EASE_EDITORIAL }}
          >
            <div className="shell flex h-20 items-center justify-end">
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center"
                autoFocus
              >
                <Icon name="close" className="h-6 w-6" />
              </button>
            </div>

            <nav aria-label="Primary" className="shell mt-8 flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-rule py-6 font-display text-title font-semibold"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
