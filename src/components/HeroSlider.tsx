"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ThemedImage } from "./ThemedImage";
import { Icon } from "./Icon";

type Slide = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  subtitle: string;
  body: string;
  image: string;
  alt: string;
  cta: { label: string; href: string };
};

const slides: Slide[] = [
  {
    eyebrow: "Security solutions provider",
    titleLead: "Security that holds",
    titleAccent: "under pressure.",
    subtitle: "With a strong focus on software and security.",
    body:
      "Layered, continuously monitored defence across your networks, endpoints, devices and data, delivered by a team that has been doing exactly this since 2000.",
    image: "/images/hero-security.webp",
    alt: "Holographic shield formed from encrypted data streams",
    cta: { label: "Explore security", href: "/security" },
  },
  {
    eyebrow: "Cloud solutions provider",
    titleLead: "Cloud built for",
    titleAccent: "real workloads.",
    subtitle: "With a strong focus on software and cloud technologies.",
    body:
      "Architect, migrate and operate cloud infrastructure built for high availability: Azure, AWS and Google Workspace, supported end to end by one accountable partner.",
    image: "/images/hero-cloud.webp",
    alt: "Geometric cloud formed from glass data blocks above a digital landscape",
    cta: { label: "Explore cloud", href: "/solutions" },
  },
];

const ROTATE_MS = 9000;

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number) => {
    setIndex((next + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = window.setTimeout(() => go(index + 1), ROTATE_MS);
    return () => window.clearTimeout(t);
  }, [index, paused, go]);

  const slide = slides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Sam Infosystems services"
      className="relative border-b border-line"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="container-x">
        <div className="grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-20">
          {/* copy: remounts on slide change so the blur-in entrance replays */}
          <div key={index} className="max-w-xl">
            <p className="eyebrow rise rise-1">
              <span className="h-px w-6 bg-brand-400" aria-hidden="true" />
              {slide.eyebrow}
            </p>

            <h1 className="rise rise-2 mt-5 font-display text-[clamp(2.3rem,6.2vw,4rem)] font-light leading-[1.02] tracking-[-0.035em] text-mist-50">
              {slide.titleLead}
              <br />
              <span className="text-brand-300">{slide.titleAccent}</span>
            </h1>

            <p className="rise rise-3 mt-5 font-display text-[1.05rem] font-light text-mist-200 sm:text-[1.15rem]">
              {slide.subtitle}
            </p>
            <p className="rise rise-4 mt-3 max-w-md text-[0.9rem] font-light leading-relaxed text-mist-400">
              {slide.body}
            </p>

            <div className="rise rise-5 mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link href={slide.cta.href} className="btn btn-primary">
                {slide.cta.label}
                <Icon name="arrow-right" size={15} />
              </Link>
              <Link
                href="/contact-us"
                className="group inline-flex items-center gap-1.5 text-[0.85rem] font-normal text-mist-300 transition-colors hover:text-mist-50"
              >
                Talk to an expert
                <Icon
                  name="arrow-right"
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            {/* flat slider controls */}
            <div className="mt-10 flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                {slides.map((s, i) => (
                  <button
                    key={s.titleLead}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Go to slide ${i + 1}: ${s.eyebrow}`}
                    aria-current={i === index}
                    className={`h-[3px] rounded-full transition-all duration-300 ${
                      i === index ? "w-8 bg-brand-300" : "w-4 bg-line-strong hover:bg-mist-500"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[0.7rem] font-normal tabular-nums tracking-[0.1em] text-mist-500">
                {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </span>
              <div className="ml-auto flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  aria-label="Previous slide"
                  className="flex h-8 w-8 items-center justify-center rounded border border-line text-mist-400 transition-colors hover:border-line-strong hover:text-mist-50"
                >
                  <Icon name="arrow-right" size={13} className="rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  aria-label="Next slide"
                  className="flex h-8 w-8 items-center justify-center rounded border border-line text-mist-400 transition-colors hover:border-line-strong hover:text-mist-50"
                >
                  <Icon name="arrow-right" size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* artwork: flat frame, no overlay gradients */}
          <div key={`art-${index}`} className="rise rise-2 relative">
            <div className="relative overflow-hidden rounded-lg border border-line bg-ink-900">
              <ThemedImage
                src={slide.image}
                alt={slide.alt}
                width={1376}
                height={768}
                priority={index === 0}
                fetchPriority={index === 0 ? "high" : "auto"}
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
            {/* flat caption strip under the image */}
            <div className="mt-3 flex items-center justify-between gap-4 border-t border-line pt-3">
              <span className="text-[0.68rem] uppercase tracking-[0.16em] text-mist-500">
                Sam Infosystems · Mumbai
              </span>
              <span className="flex items-center gap-1.5 text-[0.68rem] uppercase tracking-[0.16em] text-mist-500">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" aria-hidden="true" />
                Since 2000
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
