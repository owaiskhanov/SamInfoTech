"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company, nav } from "@/lib/site";
import { Icon } from "./Icon";
import { Wordmark } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));

  return (
    <>
      {/* utility bar */}
      <div className="relative z-50 hidden border-b border-white/[0.06] bg-ink-950/80 md:block">
        <div className="container-x flex h-10 items-center justify-between text-[0.78rem] text-mist-400">
          <div className="flex items-center gap-6">
            <a
              href={company.phoneHref}
              className="inline-flex items-center gap-2 transition-colors hover:text-brand-300"
            >
              <Icon name="phone" size={14} className="text-brand-400" />
              {company.phone}
            </a>
            <a
              href={`mailto:${company.emailGeneral}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-brand-300"
            >
              <Icon name="mail" size={14} className="text-brand-400" />
              {company.emailGeneral}
            </a>
          </div>
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Mon–Sat · 9:30 to 18:30 IST
            </span>
            <span className="h-3 w-px bg-white/10" />
            <div className="flex items-center gap-3">
              {company.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="transition-colors hover:text-brand-300"
                >
                  <Icon name={s.icon} size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/[0.08] bg-ink-950/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-4">
          <Link href="/" aria-label="Sam Infosystems — Home" className="shrink-0">
            <Wordmark />
          </Link>

          {/* desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {nav.map((entry) =>
              "children" in entry && entry.children ? (
                <div key={entry.label} className="group relative">
                  <Link
                    href={entry.href}
                    data-active={isActive(entry.href)}
                    className="nav-link flex items-center gap-1.5 rounded-full px-3.5 py-2"
                  >
                    {entry.label}
                    <Icon
                      name="chevron-down"
                      size={13}
                      className="mt-0.5 opacity-60 transition-transform duration-300 group-hover:rotate-180"
                    />
                  </Link>
                  <div className="invisible absolute left-0 top-full w-[19rem] pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="glass overflow-hidden rounded-2xl p-2 shadow-2xl">
                      {entry.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          className="flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-[0.86rem] text-mist-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                        >
                          {c.label}
                          <Icon name="arrow-up-right" size={13} className="opacity-0 transition-opacity group-hover:opacity-60" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={entry.label}
                  href={entry.href}
                  data-active={isActive(entry.href)}
                  className="nav-link px-3.5 py-2"
                >
                  {entry.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/contact-us" className="btn btn-primary !px-5 !py-2.5 !text-[0.84rem]">
              Get a Quote
              <Icon name="arrow-right" size={15} />
            </Link>
          </div>

          {/* mobile trigger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white lg:hidden"
          >
            <Icon name={open ? "close" : "menu"} size={20} />
          </button>
        </div>
      </header>

      {/* mobile drawer */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
        inert={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink-950/80 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[min(88vw,22rem)] overflow-y-auto border-l border-white/10 bg-ink-900 px-5 pb-10 pt-24 transition-transform duration-400 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {nav.map((entry) =>
              "children" in entry && entry.children ? (
                <div key={entry.label} className="border-b border-white/[0.07]">
                  <button
                    type="button"
                    onClick={() => setOpenGroup(openGroup === entry.label ? null : entry.label)}
                    className="flex w-full items-center justify-between py-3.5 text-left font-display text-[0.95rem] font-medium text-white"
                    aria-expanded={openGroup === entry.label}
                  >
                    {entry.label}
                    <Icon
                      name={openGroup === entry.label ? "minus" : "plus"}
                      size={16}
                      className="text-brand-400"
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      openGroup === entry.label ? "grid-rows-[1fr] pb-3" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      {entry.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          className="block rounded-lg py-2 pl-3 text-[0.87rem] text-mist-400 transition-colors hover:text-brand-300"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={entry.label}
                  href={entry.href}
                  className="border-b border-white/[0.07] py-3.5 font-display text-[0.95rem] font-medium text-white"
                >
                  {entry.label}
                </Link>
              ),
            )}
          </nav>

          <Link href="/contact-us" className="btn btn-primary mt-6 w-full">
            Get a Free Quote
            <Icon name="arrow-right" size={15} />
          </Link>

          <div className="mt-6 space-y-2 text-[0.85rem] text-mist-400">
            <a href={company.phoneHref} className="flex items-center gap-2.5 hover:text-brand-300">
              <Icon name="phone" size={15} className="text-brand-400" />
              {company.phone}
            </a>
            <a
              href={`mailto:${company.emailGeneral}`}
              className="flex items-center gap-2.5 hover:text-brand-300"
            >
              <Icon name="mail" size={15} className="text-brand-400" />
              {company.emailGeneral}
            </a>
            <p className="flex gap-2.5 leading-relaxed">
              <Icon name="pin" size={15} className="mt-0.5 shrink-0 text-brand-400" />
              {company.address.line1}, {company.address.locality}, {company.address.region}{" "}
              {company.address.postalCode}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
