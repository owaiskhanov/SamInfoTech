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
      <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter by category">
        {tabs.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={active === t.key}
            onClick={() => setActive(t.key)}
            className={`rounded px-3.5 py-1.5 text-[0.78rem] font-normal transition-colors ${
              active === t.key
                ? "bg-brand-300 text-ink-950"
                : "border border-line text-mist-400 hover:border-line-strong hover:text-mist-100"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {shown.map((item) => (
          <ServiceCard key={item.slug} item={item} />
        ))}
      </div>

      <div className="mt-7">
        <Link
          href="/products"
          className="group inline-flex items-center gap-1.5 text-[0.82rem] font-normal text-mist-300 transition-colors hover:text-brand-300"
        >
          See every product &amp; service
          <Icon name="arrow-right" size={14} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
