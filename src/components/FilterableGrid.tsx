"use client";

import Link from "next/link";
import { useState } from "react";
import type { Item, ItemCategory } from "@/lib/site";
import { Icon } from "./Icon";
import { ServiceCard } from "./ServiceCard";

export function FilterableGrid({
  groups,
  defaultTab = "all",
}: {
  groups: { key: ItemCategory; label: string; items: Item[] }[];
  defaultTab?: "all" | ItemCategory;
}) {
  const [active, setActive] = useState<"all" | ItemCategory>(defaultTab);
  const tabs: { key: "all" | ItemCategory; label: string }[] = [
    { key: "all", label: "All" },
    ...groups.map((g) => ({ key: g.key, label: g.label })),
  ];
  const shown = active === "all" ? groups.flatMap((g) => g.items) : (groups.find((g) => g.key === active)?.items ?? []);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter products by category">
        {tabs.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={active === t.key}
            onClick={() => setActive(t.key)}
            className={`rounded-full px-4 py-2 font-display text-[0.78rem] font-semibold transition-all ${
              active === t.key
                ? "bg-brand-400 text-ink-950 shadow-glow"
                : "border border-white/10 text-mist-400 hover:border-brand-400/40 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {shown.map((item) => (
          <ServiceCard key={item.slug} item={item} />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href="/products"
          className="group inline-flex items-center gap-2 font-display text-[0.82rem] font-semibold text-brand-300 transition-colors hover:text-brand-200"
        >
          See every product &amp; service
          <Icon name="arrow-right" size={15} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
