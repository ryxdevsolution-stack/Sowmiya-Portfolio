import type { Variants, Transition } from 'framer-motion';

/**
 * One rhythm for the whole site.
 *
 * The previous build ran ~60 simultaneous infinite animations. Here motion only
 * ever does two jobs: reveal content as it enters, and acknowledge a pointer.
 * Nothing loops forever, and every value below is a token — no magic numbers in
 * components.
 */

/** Expo-out. Fast start, soft landing — reads as considered rather than bouncy. */
export const EASE_EDITORIAL = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  fast: 0.2,
  base: 0.5,
  slow: 0.7,
} as const;

/** Exit is deliberately quicker than enter, so dismissing never feels sticky. */
export const DURATION_EXIT = DURATION.fast;

export const STAGGER = 0.06;

export const transition: Transition = {
  duration: DURATION.base,
  ease: EASE_EDITORIAL,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition },
};

/** Applied to a list container so children reveal in sequence. */
export const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER } },
};

/*
 * There is deliberately no `staticVariants` export any more.
 *
 * It existed to be swapped in when useReducedMotion() was true — but choosing
 * variants from that hook changes what is RENDERED, and the hook disagrees
 * between server (false) and a reduce-motion client (true). That produced a
 * hydration mismatch React would not patch. Reduced motion is now handled by
 * <MotionProvider reducedMotion="user">, at animation time.
 */
