import type { Item, ItemCategory } from "@/lib/site";
import { byCategory, categories } from "@/lib/site";
import { Breadcrumbs } from "./ui";
import { ServiceCard } from "./ServiceCard";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { CollectionBanner } from "./CollectionBanner";
import Link from "next/link";

/**
 * Shared layout for the three archive pages (/solutions, /security, /products)
 * that the original WordPress nav pointed at anchor links.
 */
export function CollectionPage({ category }: { category: ItemCategory }) {
  const meta = categories.find((c) => c.key === category)!;
  const list: Item[] = byCategory(category);
  const others = categories.filter((c) => c.key !== category);

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/[0.07] pb-14 pt-10 lg:pb-16 lg:pt-12">
        <div className="orb -right-24 -top-28 h-96 w-96 bg-brand-500/15" aria-hidden="true" />
        <div className="absolute inset-0 grid-lines opacity-30" aria-hidden="true" />
        <div className="container-x relative">
          <Breadcrumbs trail={[{ label: meta.label }]} />

          <div className="mt-9 grid items-stretch gap-10 lg:grid-cols-[1.28fr_1fr]">
            <div className="max-w-3xl">
              <p className="eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                {meta.label} · {list.length} offerings
              </p>
              <h1 className="mt-4 font-display text-[clamp(2rem,4.6vw,3.2rem)] font-bold leading-[1.05] tracking-[-0.035em] text-white">
                {meta.title}
              </h1>
              <p className="mt-5 text-[1rem] leading-relaxed text-mist-300">{meta.blurb}</p>

              <div className="mt-8 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <Link
                    key={c.key}
                    href={`/${c.key}`}
                    aria-current={c.key === category ? "page" : undefined}
                    className={`rounded-full px-4 py-2 font-display text-[0.78rem] font-semibold transition-all ${
                      c.key === category
                        ? "bg-brand-400 text-ink-950"
                        : "border border-white/10 text-mist-400 hover:border-brand-400/40 hover:text-white"
                    }`}
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>

            <CollectionBanner kind={category} />
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container-x">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((item, i) => (
              <Reveal key={item.slug} delay={(i % 3) * 70} className="h-full">
                <ServiceCard item={item} />
              </Reveal>
            ))}
          </div>

          <div className="mt-14 grid gap-4 rounded-2xl border border-white/[0.08] bg-ink-900/50 p-7 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <h2 className="font-display text-[1.15rem] font-semibold text-white">
                Not sure which of these you need?
              </h2>
              <p className="mt-2 text-[0.9rem] text-mist-400">
                Tell us what you're running today. We'll tell you honestly what's worth changing —
                and what isn't.
              </p>
            </div>
            <Link href="/contact-us" className="btn btn-primary">
              Talk to an expert
              <Icon name="arrow-right" size={16} />
            </Link>
          </div>

          <div className="mt-12">
            <p className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-mist-500">
              Keep exploring
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {others.map((o) => (
                <Link
                  key={o.key}
                  href={`/${o.key}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 font-display text-[0.8rem] font-medium text-mist-300 transition-all hover:border-brand-400/45 hover:text-white"
                >
                  {o.label}
                  <Icon
                    name="arrow-right"
                    size={14}
                    className="text-brand-300 transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
