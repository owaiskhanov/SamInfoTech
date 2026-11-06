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
    const onScroll = () => setScrolled(window.scrollY > 8);
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
      {/* utility strip — flat, hairline separated */}
      <div className="hidden border-b border-line bg-ink-950 md:block">
        <div className="container-x flex h-9 items-center justify-between text-[0.74rem] font-light text-mist-500">
          <div className="flex items-center gap-5">
            <a
              href={company.phoneHref}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-mist-200"
            >
              <Icon name="phone" size={12} />
              {company.phone}
            </a>
            <span className="h-3 w-px bg-line-strong" aria-hidden="true" />
            <a
              href={`mailto:${company.emailGeneral}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-mist-200"
            >
              <Icon name="mail" size={12} />
              {company.emailGeneral}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span>Mon–Sat · 9:30–18:30 IST</span>
            <span className="h-3 w-px bg-line-strong" aria-hidden="true" />
            <div className="flex items-center gap-3">
              {company.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="transition-colors hover:text-mist-200"
                >
                  <Icon name={s.icon} size={13} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b bg-ink-950/95 backdrop-blur-sm transition-colors duration-200 ${
          scrolled ? "border-line" : "border-transparent"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <Link href="/" aria-label="Sam Infosystems — Home" className="shrink-0">
            <Wordmark />
          </Link>

          {/* desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
            {nav.map((entry) =>
              entry.children ? (
                <div key={entry.label} className="group relative">
                  <Link
                    href={entry.href}
                    data-active={isActive(entry.href)}
                    className="nav-link flex items-center gap-1 rounded px-2.5 py-2"
                  >
                    {entry.label}
                    <Icon
                      name="chevron-down"
                      size={11}
                      className="mt-px opacity-50 transition-transform duration-200 group-hover:rotate-180"
                    />
                  </Link>
                  <div className="invisible absolute left-0 top-full w-[17.5rem] pt-2 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="rounded-lg border border-line-strong bg-ink-900 p-1">
                      {entry.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          className="block rounded px-2.5 py-2 text-[0.82rem] font-light text-mist-300 transition-colors hover:bg-ink-800 hover:text-mist-50"
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
                  data-active={isActive(entry.href)}
                  className="nav-link px-2.5 py-2"
                >
                  {entry.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden lg:flex">
            <Link href="/contact-us" className="btn btn-primary !py-2 !text-[0.82rem]">
              Get a quote
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded border border-line text-mist-100 lg:hidden"
          >
            <Icon name={open ? "close" : "menu"} size={18} />
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
          className={`absolute inset-0 bg-ink-950/90 transition-opacity duration-200 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[min(88vw,21rem)] overflow-y-auto border-l border-line bg-ink-900 px-5 pb-10 pt-20 transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {nav.map((entry) =>
              entry.children ? (
                <div key={entry.label} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setOpenGroup(openGroup === entry.label ? null : entry.label)}
                    className="flex w-full items-center justify-between py-3.5 text-left font-display text-[0.92rem] font-normal text-mist-100"
                    aria-expanded={openGroup === entry.label}
                  >
                    {entry.label}
                    <Icon
                      name={openGroup === entry.label ? "minus" : "plus"}
                      size={14}
                      className="text-mist-500"
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-250 ${
                      openGroup === entry.label ? "grid-rows-[1fr] pb-2" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      {entry.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          className="block py-2 pl-3 text-[0.84rem] font-light text-mist-400 transition-colors hover:text-brand-300"
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
                  className="border-b border-line py-3.5 font-display text-[0.92rem] font-normal text-mist-100"
                >
                  {entry.label}
                </Link>
              ),
            )}
          </nav>

          <Link href="/contact-us" className="btn btn-primary mt-5 w-full">
            Get a free quote
          </Link>

          <div className="mt-6 space-y-2.5 text-[0.82rem] font-light text-mist-400">
            <a href={company.phoneHref} className="flex items-center gap-2.5 hover:text-mist-100">
              <Icon name="phone" size={13} />
              {company.phone}
            </a>
            <a
              href={`mailto:${company.emailGeneral}`}
              className="flex items-center gap-2.5 hover:text-mist-100"
            >
              <Icon name="mail" size={13} />
              {company.emailGeneral}
            </a>
            <p className="flex gap-2.5 leading-relaxed">
              <Icon name="pin" size={13} className="mt-0.5 shrink-0" />
              {company.address.line1}, {company.address.locality}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
