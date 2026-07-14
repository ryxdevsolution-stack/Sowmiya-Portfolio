'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Handles reduced-motion for the whole tree, at ANIMATION time rather than at
 * RENDER time. That distinction is the entire point of this component.
 *
 * The obvious approach — call `useReducedMotion()` in each component and pick
 * different variants — produces a hydration mismatch, and it is not theoretical:
 *
 *   server : no `window`, so useReducedMotion() === false
 *            → Framer writes `opacity: 0; transform: translateY(16px)` into the SSR HTML
 *   client : OS has reduce-motion on, so useReducedMotion() === true
 *            → the component wants `opacity: 1; transform: none`
 *
 * The trees disagree, React logs "this won't be patched up", and bails out of
 * reconciling those nodes — so a reduced-motion visitor can be left looking at
 * content that never becomes visible. Precisely the users least able to work
 * around it.
 *
 * `reducedMotion="user"` reads the media query inside Framer and suppresses
 * transform animations when it is set, while leaving opacity fades intact (a
 * cross-fade carries no vestibular risk; movement does). Server and client emit
 * identical markup, so hydration is clean either way.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
