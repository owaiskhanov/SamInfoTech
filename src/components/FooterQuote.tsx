"use client";

import { useEffect, useState } from "react";

/**
 * Rotating testimonial strip.
 *
 * These are the brand's own words about how it works, reused from the values
 * already published in `site.ts`. No invented client quotes.
 *
 * Behaviour: advances every 7s, pauses on hover and on focus, stops for
 * `prefers-reduced-motion`, and never changes height (all quotes share a
 * fixed min-height) so the footer cannot reflow while you read it.
 */

const quotes = [
  {
    line: "A partnership, not a purchase order.",
    support:
      "We measure success by the quality of the relationships we build, not by the number of deals we close.",
    source: "How we work",
  },
  {
    line: "One team, from plan to production.",
    support:
      "Strategic consultation and reliable guidance sit alongside delivery on every engagement.",
    source: "Our mission",
  },
  {
    line: "Built for the long run.",
    support:
      "Every new project is a partnership, and every partnership is an opportunity to grow together.",
    source: "Since 2000",
  },
  {
    line: "Global platforms, local accountability.",
    support:
      "The enterprise technology our clients already trust, licensed, deployed and supported from Mumbai.",
    source: "What we do",
  },
];

const ROTATE_MS = 7000;

export function FooterQuote() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % quotes.length), ROTATE_MS);
    return () => window.clearTimeout(id);
  }, [index, paused]);

  const q = quotes[index];

  return (
    <div
      className="relative flex flex-col gap-4 py-10 sm:flex-row sm:items-end sm:justify-between lg:py-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="max-w-2xl">
        <p className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-brand-300">
          {q.source}
        </p>
        {/* remounts on change so the blur-in entrance replays */}
        <p
          key={index}
          className="hf-fade mt-2.5 min-h-[2.6rem] font-display text-[1.05rem] font-light leading-snug tracking-[-0.025em] text-mist-50 sm:min-h-[2.2rem] sm:text-[1.2rem]"
        >
          {q.line}
        </p>
        <p key={`s-${index}`} className="hf-fade mt-2 max-w-xl text-[0.8rem] font-light leading-relaxed text-mist-400">
          {q.support}
        </p>
      </div>

      {/* flat progress ticks, same language as the hero slider */}
      <div className="flex shrink-0 items-center gap-1.5" role="tablist" aria-label="Footer quotes">
        {quotes.map((item, i) => (
          <button
            key={item.line}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={item.line}
            onClick={() => setIndex(i)}
            className={`h-[3px] rounded-full transition-all duration-300 ${
              i === index ? "w-7 bg-brand-300" : "w-3 bg-line-strong hover:bg-mist-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
