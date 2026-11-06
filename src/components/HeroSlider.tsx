"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

type Slide = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  subtitle: string;
  body: string;
  stat: string;
  image: string;
  alt: string;
  cta: { label: string; href: string };
};

const slides: Slide[] = [
  {
    eyebrow: "Since 2000 · Mumbai",
    titleLead: "Security Solutions",
    titleAccent: "Provider",
    subtitle: "With a strong focus on software and security",
    body:
      "Layered, continuously monitored defence across your networks, endpoints, devices and data — delivered by a team that has been doing exactly this since 2000.",
    stat: "24×7 monitoring & response",
    image: "/images/hero-security.webp",
    alt: "Holographic shield made of encrypted data streams representing Sam Infosystems cyber security",
    cta: { label: "Explore security", href: "/security" },
  },
  {
    eyebrow: "Cloud · Software",
    titleLead: "Cloud Solutions",
    titleAccent: "Provider",
    subtitle: "With a strong focus on software and cloud technologies",
    body:
      "Architect, migrate and operate cloud infrastructure built for high availability — Azure, AWS and Google Workspace, supported end to end by one accountable partner.",
    stat: "Multi-cloud, single partner",
    image: "/images/hero-cloud.webp",
    alt: "Glowing geometric cloud formed from glass data blocks above a digital landscape",
    cta: { label: "Explore cloud", href: "/solutions" },
  },
];

const ROTATE_MS = 8000;

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);

  const go = useCallback((next: number) => {
    setIndex((next + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    timer.current = window.setTimeout(() => go(index + 1), ROTATE_MS);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [index, paused, go]);

  const slide = slides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Sam Infosystems services"
      className="relative isolate overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* backdrop */}
      <div className="absolute inset-0 -z-10">
        {slides.map((s, i) => (
          <div
            key={s.image}
            className={`absolute inset-0 transition-opacity duration-[1100ms] ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={s.image}
              alt={i === 0 ? s.alt : ""}
              fill
              priority={i === 0}
              fetchPriority={i === 0 ? "high" : "auto"}
              sizes="100vw"
              className="scale-105 object-cover object-[65%_center]"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/92 to-ink-950/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/70" />
        <div className="absolute inset-0 grid-lines opacity-40" />
      </div>

      <div className="container-x relative flex min-h-[clamp(560px,88vh,760px)] flex-col justify-center pb-20 pt-16 lg:pb-24 lg:pt-20">
        <div className="max-w-2xl">
          {/* eyebrow */}
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-400" />
            </span>
            <span className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand-300">
              {slide.eyebrow}
            </span>
          </div>

          {/* headline */}
          <h1 className="mt-6 font-display text-[clamp(2.35rem,6vw,4.15rem)] font-bold leading-[1.02] tracking-[-0.035em] text-white">
            {slide.titleLead}{" "}
            <span className="relative inline-block">
              <span className="text-gradient">{slide.titleAccent}</span>
              <svg
                className="absolute -bottom-2 left-0 h-3 w-full text-brand-400/45"
                viewBox="0 0 200 12"
                fill="none"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                <path d="M2 8.5C48 3 152 3 198 8.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="mt-7 max-w-xl font-display text-[1.02rem] font-medium leading-snug text-mist-200 sm:text-[1.15rem]">
            {slide.subtitle}
          </p>
          <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-mist-400">{slide.body}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href={slide.cta.href} className="btn btn-primary">
              {slide.cta.label}
              <Icon name="arrow-right" size={16} />
            </Link>
            <Link href="/contact-us" className="btn btn-ghost">
              Talk to an expert
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-3 text-[0.8rem] text-mist-400">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-400/30 bg-brand-400/10 text-brand-300">
              <Icon name="shield-check" size={16} />
            </span>
            {slide.stat}
          </div>
        </div>

        {/* slider controls */}
        <div className="mt-14 flex items-center justify-between gap-6 border-t border-white/[0.08] pt-5 lg:mt-16">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-mist-300 transition-all hover:border-brand-400/60 hover:text-white"
            >
              <Icon name="arrow-right" size={15} className="rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-mist-300 transition-all hover:border-brand-400/60 hover:text-white"
            >
              <Icon name="arrow-right" size={15} />
            </button>
            <span className="ml-2 font-display text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-mist-500">
              {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.titleLead}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}: ${s.titleLead}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index ? "w-10 bg-brand-400" : "w-4 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
