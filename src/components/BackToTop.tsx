"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-5 right-4 z-40 flex h-10 items-center gap-2 rounded border border-line-strong bg-ink-900 px-3 text-[0.68rem] uppercase tracking-[0.14em] text-mist-300 transition-all duration-200 hover:border-mist-500 hover:text-mist-50 sm:right-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <Icon name="arrow-up" size={13} />
      Top
    </button>
  );
}
