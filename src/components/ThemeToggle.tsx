"use client";

import { useEffect, useState } from "react";

/**
 * Dark / light theme switch.
 *
 * The actual attribute is set by the inline script in `layout.tsx` before the
 * first paint, so this component only ever reacts to it. It reads the live
 * `class` on <html> instead of guessing, which keeps it correct across tabs,
 * bfcache restores and the system preference changing mid-session.
 */

type Theme = "dark" | "light";

const read = (): Theme =>
  typeof document !== "undefined" && document.documentElement.classList.contains("light")
    ? "light"
    : "dark";

function apply(theme: Theme, persist: boolean) {
  const root = document.documentElement;
  root.classList.toggle("light", theme === "light");
  root.style.colorScheme = theme;

  // Let the first paint settle before enabling the colour cross-fade.
  if (!root.classList.contains("theme-ready")) {
    requestAnimationFrame(() => root.classList.add("theme-ready"));
  }

  if (persist) {
    try {
      window.localStorage.setItem("theme", theme);
    } catch {
      /* private mode: the choice just will not survive a reload */
    }
  }

  document
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((m) => m.setAttribute("content", theme === "light" ? "#f6f7f9" : "#05070c"));
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(read());
    setMounted(true);

    // Follow the OS only while the visitor has not chosen explicitly.
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e: MediaQueryListEvent) => {
      let stored: string | null = null;
      try {
        stored = window.localStorage.getItem("theme");
      } catch {
        stored = null;
      }
      if (stored) return;
      const next: Theme = e.matches ? "light" : "dark";
      apply(next, false);
      setTheme(next);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    apply(next, true);
    setTheme(next);
  };

  const label =
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={theme === "light"}
      title={label}
      className={`group relative flex h-9 w-9 shrink-0 items-center justify-center rounded border border-line text-mist-400 transition-colors hover:border-line-strong hover:text-mist-50 ${className}`}
    >
      {/* sun: shown in dark mode, meaning "go light" */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={`absolute transition-all duration-300 ${
          mounted && theme === "light"
            ? "rotate-90 scale-50 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        }`}
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4 17 7M7 17l-1.6 1.6" />
      </svg>
      {/* moon: shown in light mode, meaning "go dark" */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={`absolute transition-all duration-300 ${
          mounted && theme === "light"
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-50 opacity-0"
        }`}
      >
        <path d="M20 14.2A8.4 8.4 0 0 1 9.8 4a8.6 8.6 0 1 0 10.2 10.2Z" />
      </svg>
    </button>
  );
}
