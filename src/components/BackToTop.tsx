"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`group fixed bottom-6 right-5 z-40 flex h-12 items-center gap-2 rounded-full border border-brand-400/30 bg-ink-900/90 px-4 font-display text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-mist-200 shadow-glow backdrop-blur transition-all duration-300 hover:border-brand-300/70 hover:text-white md:right-8 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <Icon name="arrow-up" size={15} className="text-brand-300 transition-transform group-hover:-translate-y-0.5" />
      Top
    </button>
  );
}
