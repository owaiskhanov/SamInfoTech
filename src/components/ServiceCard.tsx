import Link from "next/link";
import { Icon } from "./Icon";
import type { Item } from "@/lib/site";

export function ServiceCard({ item, featured = false }: { item: Item; featured?: boolean }) {
  return (
    <Link
      href={`/portfolio/${item.slug}`}
      className={`group card-hover relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-900/60 p-6 ${
        featured ? "lg:p-7" : ""
      }`}
      style={{ ["--accent" as string]: item.accent }}
    >
      {/* accent wash on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120% 90% at 100% 0%, ${item.accent}1f 0%, transparent 62%)`,
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)` }}
      />

      <div className="relative flex items-start justify-between">
        <span
          className="flex h-12 w-12 items-center justify-center rounded-xl border transition-transform duration-500 group-hover:scale-[1.06]"
          style={{
            borderColor: `${item.accent}38`,
            background: `${item.accent}14`,
            color: item.accent,
          }}
        >
          <Icon name={item.icon} size={23} />
        </span>
        <Icon
          name="arrow-up-right"
          size={18}
          className="text-mist-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
        />
      </div>

      <h3 className="relative mt-5 font-display text-[1.05rem] font-semibold leading-snug text-white">
        {item.name}
      </h3>
      <p className="relative mt-2.5 line-clamp-3 text-[0.875rem] leading-relaxed text-mist-400">
        {item.excerpt}
      </p>

      <span className="relative mt-auto pt-5 font-display text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-mist-500 transition-colors group-hover:text-brand-300">
        Learn more
      </span>
    </Link>
  );
}
