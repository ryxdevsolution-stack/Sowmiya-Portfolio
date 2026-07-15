'use client';

import { useCallback, useLayoutEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import Lenis from 'lenis';
import { cn } from '@/lib/cn';

/**
 * Scroll-driven card stack. As the page scrolls past the section, each card pins
 * near the top and the next card rises to stack on top of it, scaling the ones
 * beneath — the cards overlap one at a time under scroll control.
 *
 * ─── ON PERFORMANCE ────────────────────────────────────────────────────────
 * The natural (untransformed) top of every card is measured ONCE on mount and on
 * resize, and cached. The per-scroll update then reads only those cached numbers
 * and the live scroll position — it never calls getBoundingClientRect in the
 * scroll loop. Measuring layout every frame (the obvious way) forces a synchronous
 * reflow per card per frame, which is exactly what makes a scroll-stack stutter.
 *
 * ─── ON MOTION & SCROLL ────────────────────────────────────────────────────
 * In whole-page mode this drives Lenis smooth-scroll across the document — a heavy
 * global effect, so it is gated on `prefers-reduced-motion`: when reduce is set,
 * Lenis is never created and no transforms are written, leaving the cards as a
 * plain, natively-scrolled vertical list. Every piece is present, in order.
 * ───────────────────────────────────────────────────────────────────────────
 */

interface ScrollStackItemProps {
  children: ReactNode;
  itemClassName?: string;
}

export function ScrollStackItem({ children, itemClassName = '' }: ScrollStackItemProps) {
  return (
    <div
      className={cn(
        'scroll-stack-card relative w-full origin-top overflow-hidden rounded-3xl border border-rule bg-surface',
        'shadow-[0_14px_50px_rgba(0,0,0,0.10)] will-change-transform',
        'focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 focus-within:ring-offset-canvas',
        itemClassName
      )}
      style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}

interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  useWindowScroll?: boolean;
}

interface CardTransform {
  translateY: number;
  scale: number;
}

export function ScrollStack({
  children,
  className = '',
  itemDistance = 90,
  itemScale = 0.02,
  itemStackDistance = 40,
  stackPosition = '18%',
  scaleEndPosition = '8%',
  baseScale = 0.88,
  useWindowScroll = false,
}: ScrollStackProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const cardOffsetsRef = useRef<number[]>([]);
  const endOffsetRef = useRef(0);
  const lastTransformsRef = useRef<Map<number, CardTransform>>(new Map());

  const parsePercentage = useCallback((value: string, containerHeight: number) => {
    if (value.includes('%')) return (parseFloat(value) / 100) * containerHeight;
    return parseFloat(value);
  }, []);

  /** Measure each card's natural document top once, transforms cleared first. */
  const measure = useCallback(() => {
    const cards = cardsRef.current;
    cards.forEach((c) => {
      c.style.transform = '';
    });
    cardOffsetsRef.current = cards.map((c) =>
      useWindowScroll ? c.getBoundingClientRect().top + window.scrollY : c.offsetTop
    );
    const endEl = useWindowScroll
      ? document.querySelector<HTMLElement>('.scroll-stack-end')
      : scrollerRef.current?.querySelector<HTMLElement>('.scroll-stack-end');
    endOffsetRef.current = endEl
      ? useWindowScroll
        ? endEl.getBoundingClientRect().top + window.scrollY
        : endEl.offsetTop
      : 0;
    lastTransformsRef.current.clear();
  }, [useWindowScroll]);

  const update = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    const scrollTop = useWindowScroll ? window.scrollY : scrollerRef.current?.scrollTop ?? 0;
    const containerHeight = useWindowScroll
      ? window.innerHeight
      : scrollerRef.current?.clientHeight ?? 0;
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const pinEnd = endOffsetRef.current - containerHeight / 2;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const cardTop = cardOffsetsRef.current[i] ?? 0;
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;

      const scaleProgress = scrollTop < triggerStart ? 0 : scrollTop > triggerEnd ? 1 : (scrollTop - triggerStart) / (triggerEnd - triggerStart);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);

      let translateY = 0;
      const pinStart = triggerStart;
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const ty = Math.round(translateY * 100) / 100;
      const sc = Math.round(scale * 1000) / 1000;
      const last = lastTransformsRef.current.get(i);
      if (!last || Math.abs(last.translateY - ty) > 0.1 || Math.abs(last.scale - sc) > 0.001) {
        card.style.transform = `translate3d(0, ${ty}px, 0) scale(${sc})`;
        lastTransformsRef.current.set(i, { translateY: ty, scale: sc });
      }
    }
  }, [
    useWindowScroll,
    parsePercentage,
    stackPosition,
    scaleEndPosition,
    itemStackDistance,
    baseScale,
    itemScale,
  ]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll<HTMLElement>('.scroll-stack-card')
        : scroller.querySelectorAll<HTMLElement>('.scroll-stack-card')
    );
    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
    });

    // Reduced motion: no Lenis, no transforms — a plain, natively-scrolled list.
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      return () => {
        cardsRef.current = [];
        transformsCache.clear();
      };
    }

    cards.forEach((card) => {
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
    });

    measure();
    const onResize = () => {
      measure();
      update();
    };
    window.addEventListener('resize', onResize);

    const lenis = new Lenis({
      ...(useWindowScroll
        ? {}
        : {
            wrapper: scroller,
            content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,
          }),
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
    });
    lenis.on('scroll', update);
    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);
    lenisRef.current = lenis;

    update();

    return () => {
      window.removeEventListener('resize', onResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      lenisRef.current?.destroy();
      lenisRef.current = null;
      cardsRef.current = [];
      transformsCache.clear();
    };
  }, [itemDistance, useWindowScroll, measure, update]);

  const containerClassName = useWindowScroll
    ? cn('relative w-full', className)
    : cn('relative h-full w-full overflow-y-auto overflow-x-visible', className);

  return (
    <div
      ref={scrollerRef}
      className={containerClassName}
      style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
    >
      <div className="scroll-stack-inner pb-[22vh] pt-[4vh]">
        {children}
        {/* Spacer so the last card's pin releases cleanly. */}
        <div className="scroll-stack-end h-px w-full" />
      </div>
    </div>
  );
}
