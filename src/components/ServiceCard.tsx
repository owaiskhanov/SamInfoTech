import Link from "next/link";
import { Icon } from "./Icon";
import { BrandLogo, hasBrandMark } from "./BrandLogo";
import type { Item } from "@/lib/site";

export function ServiceCard({ item }: { item: Item }) {
  return (
    <Link
      href={`/portfolio/${item.slug}`}
      className="card group relative flex h-full flex-col rounded-lg p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="tile flex h-11 w-11 items-center justify-center rounded-md text-mist-200">
          {hasBrandMark(item.icon) ? (
            <BrandLogo name={item.icon} size={22} />
          ) : (
            <Icon name={item.icon} size={20} />
          )}
        </span>
        <Icon
          name="arrow-up-right"
          size={15}
          className="mt-1 text-mist-600 transition-colors group-hover:text-brand-300"
        />
      </div>

      <h3 className="mt-4 font-display text-[0.98rem] font-normal leading-snug tracking-[-0.015em] text-mist-50">
        {item.name}
      </h3>
      <p className="mt-2 line-clamp-3 text-[0.82rem] font-light leading-relaxed text-mist-400">
        {item.excerpt}
      </p>
    </Link>
  );
}

/** Compact row used in the security list on the home page. */
export function ServiceRow({ item }: { item: Item }) {
  return (
    <Link
      href={`/portfolio/${item.slug}`}
      className="group flex items-center gap-3.5 rounded-md border border-transparent px-3 py-3 transition-colors hover:border-line hover:bg-ink-850"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-line text-mist-300">
        {hasBrandMark(item.icon) ? (
          <BrandLogo name={item.icon} size={17} />
        ) : (
          <Icon name={item.icon} size={17} />
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-[0.88rem] font-normal text-mist-100">
          {item.name}
        </span>
        <span className="mt-0.5 block truncate text-[0.74rem] font-light text-mist-500">
          {item.highlights[0]}
        </span>
      </span>
      <Icon
        name="arrow-right"
        size={14}
        className="shrink-0 text-mist-600 transition-colors group-hover:text-brand-300"
      />
    </Link>
  );
}
