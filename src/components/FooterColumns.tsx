"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "./Icon";

/**
 * Footer navigation that opens up.
 *
 * Each section starts as a clean list of its entries. "More" reveals the one
 * line that says what each one actually covers, in place, under its own label,
 * so nothing is duplicated in the markup and nothing navigates away by
 * accident.
 *
 * Disclosure is a real button with `aria-expanded`, so it works on touch and
 * from the keyboard; the reveal is a grid-row transition, which animates to
 * content height without a script measuring anything.
 */

export type FooterGroup = {
  title: string;
  href: string;
  links: {
    label: string;
    href: string;
    detail?: string;
  }[];
};

export function FooterColumns({ groups }: { groups: FooterGroup[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => {
        const isOpen = open === group.title;
        return (
          <div key={group.title} className="flex flex-col bg-ink-950">
            <div className="flex items-center justify-between gap-2 px-4 pb-3 pt-4">
              <h3 className="text-[0.66rem] font-medium uppercase tracking-[0.18em] text-mist-400">
                {group.title}
              </h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : group.title)}
                aria-expanded={isOpen}
                aria-controls={`footer-detail-${group.title}`}
                className="flex items-center gap-1 rounded px-1 py-0.5 text-[0.6rem] uppercase tracking-[0.14em] text-mist-500 transition-colors hover:text-brand-300 focus-visible:text-brand-300"
              >
                {isOpen ? "Less" : "More"}
                <Icon name={isOpen ? "minus" : "plus"} size={10} />
              </button>
            </div>

            <ul className="flex-1 space-y-1.5 px-4">
              {group.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group flex items-start gap-1.5 text-[0.82rem] font-light leading-snug text-mist-400 transition-colors hover:text-mist-50"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.45rem] h-px w-0 shrink-0 bg-brand-300 transition-all duration-200 group-hover:w-2.5"
                    />
                    <span className="min-w-0">{l.label}</span>
                  </Link>

                  {/* the reveal: height animates from 0, no measuring needed */}
                  {l.detail && (
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <p className="overflow-hidden pl-4 text-[0.7rem] font-light leading-relaxed text-mist-600">
                        <span className="block pb-1 pt-0.5">{l.detail}</span>
                      </p>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="px-4 pb-4 pt-3">
              <Link
                href={group.href}
                className="inline-flex items-center gap-1.5 text-[0.72rem] font-normal text-brand-300 transition-colors hover:text-brand-200"
              >
                All {group.title.toLowerCase()}
                <Icon name="arrow-right" size={12} />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
