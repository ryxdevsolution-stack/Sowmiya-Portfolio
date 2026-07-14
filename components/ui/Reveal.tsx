'use client';

import { motion } from 'framer-motion';
import type { ReactNode, ElementType } from 'react';
import { fadeUp, staggerParent } from '@/lib/motion';

/**
 * NOTE ON THE API SHAPE
 *
 * These are three separate named exports rather than a `Reveal.List` /
 * `Reveal.Item` compound component, and that is deliberate.
 *
 * A server component importing from a 'use client' module receives a serializable
 * *module reference*, not the function object. Static properties attached to a
 * client component (`Reveal.List = RevealList`) do not survive that boundary —
 * they resolve to `undefined`, and React fails with "Element type is invalid".
 * Named exports each get their own client reference, so each one resolves.
 *
 * NOTE ON REDUCED MOTION
 *
 * There is deliberately no `useReducedMotion()` call here. Branching the variants
 * on it (`reduced ? staticVariants : fadeUp`) changes what is RENDERED, and the
 * hook returns false on the server and true on a reduce-motion client — so the
 * SSR HTML said `opacity: 0` while the client wanted `opacity: 1`. React refused
 * to patch the mismatch, which could leave a reduced-motion visitor looking at
 * permanently invisible content.
 *
 * Reduced motion is handled once, globally, by <MotionProvider> — at animation
 * time instead of render time. See components/layout/MotionProvider.tsx.
 */

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Render as a different element ('ul', 'li', 'section') while keeping the animation. */
  as?: ElementType;
}

const VIEWPORT = { once: true, margin: '0px 0px -12% 0px' } as const;

/** Reveals its children once, as they scroll into view. */
export function Reveal({ children, className, as = 'div' }: RevealProps) {
  const Tag = motion[as as 'div'];

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={fadeUp}
    >
      {children}
    </Tag>
  );
}

/**
 * Container that reveals its <RevealItem> children in sequence. Preferred over
 * hand-tuned per-child delays, which drift out of sync the moment an item is
 * added or removed.
 */
export function RevealList({ children, className, as = 'div' }: RevealProps) {
  const Tag = motion[as as 'div'];

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={staggerParent}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({ children, className, as = 'div' }: RevealProps) {
  const Tag = motion[as as 'div'];

  return (
    <Tag className={className} variants={fadeUp}>
      {children}
    </Tag>
  );
}
