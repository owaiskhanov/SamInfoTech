"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-velocity rail.
 *
 * A single line of type that drifts on its own, then takes its speed from how
 * fast you are scrolling: scrolling down slows it (the page is already moving,
 * so the rail should not add more), scrolling up speeds it up. It never stops
 * dead, so it stays legible.
 *
 * Implementation notes
 *  - the track is duplicated and translated modulo half its width, so the loop
 *    is seamless and there is no layout thrash;
 *  - everything is written to `transform` inside one rAF loop, no React state,
 *    no re-render per frame;
 *  - reduced-motion users are never registered at all, and the track sits still;
 *  - `aria-hidden` because the words repeat visual content that is already live
 *    in the footer navigation.
 */
export function ScrollVelocityRail({
  text,
  items,
}: {
  text: string;
  items: string[];
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let offset = 0;
    let half = 0;
    let base = 0.55; // px per frame when idle
    let target = base;
    let lastScroll = window.scrollY;
    let raf = 0;

    const measure = () => {
      half = track.scrollWidth / 2;
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(track);

    const onScroll = () => {
      const now = window.scrollY;
      const delta = now - lastScroll;
      lastScroll = now;
      // Down: slower. Up: faster. Clamped so it never freezes or flies.
      target = Math.min(6, Math.max(0.12, base - delta * 0.045));
    };

    const tick = () => {
      if (half > 0) {
        // ease toward the scroll-driven target, then decay back to idle
        base += (0.55 - base) * 0.02;
        target += (base - target) * 0.04;
        offset -= target;
        if (offset <= -half) offset += half;
        if (offset > 0) offset -= half;
        track.style.transform = `translate3d(${offset.toFixed(2)}px, 0, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  // Two passes of the same content keep the modulo wrap seamless.
  const pass = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-b border-line bg-ink-900">
      <div
        ref={trackRef}
        className="flex w-max items-center py-3 will-change-transform"
        aria-hidden="true"
      >
        {pass.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center">
            <span className="whitespace-nowrap px-5 font-display text-[0.74rem] font-light uppercase tracking-[0.22em] text-mist-400">
              {item}
            </span>
            <span className="h-1 w-1 shrink-0 rounded-full bg-brand-400" />
          </span>
        ))}
      </div>
      <span className="sr-only">{text}</span>
    </div>
  );
}
