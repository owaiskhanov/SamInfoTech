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
      <section className="border-b border-line">
        <div className="container-x pb-10 pt-8 lg:pb-12 lg:pt-10">
          <Breadcrumbs trail={[{ label: meta.label }]} />

          <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
            <Reveal>
              <p className="eyebrow">
                <span className="h-px w-5 bg-brand-400" aria-hidden="true" />
                {meta.label} · {list.length} offerings
              </p>
              <h1 className="mt-4 max-w-2xl font-display text-[clamp(1.9rem,4.4vw,3rem)] font-light leading-[1.06] tracking-[-0.035em] text-mist-50">
                {meta.title}
              </h1>
              <p className="mt-5 max-w-xl text-[0.95rem] font-light leading-relaxed text-mist-400">
                {meta.blurb}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <Link
                    key={c.key}
                    href={`/${c.key}`}
                    aria-current={c.key === category ? "page" : undefined}
                    className={`rounded px-3.5 py-2 text-[0.78rem] font-normal transition-colors ${
                      c.key === category
                        ? "bg-brand-300 text-ink-950"
                        : "border border-line text-mist-400 hover:border-line-strong hover:text-mist-100"
                    }`}
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <CollectionBanner kind={category} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="container-x py-14 lg:py-16">
          <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-3">
            {list.map((item, i) => (
              <Reveal key={item.slug} delay={(i % 3) * 70} className="h-full">
                <ServiceCard item={item} />
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid gap-5 rounded-lg border border-line bg-ink-900 p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-7">
            <div>
              <h2 className="font-display text-[1.05rem] font-normal text-mist-50">
                Not sure which of these you need?
              </h2>
              <p className="mt-2 text-[0.86rem] font-light text-mist-400">
                Tell us what you're running today. We'll tell you honestly what's worth changing,
                and what isn't.
              </p>
            </div>
            <Link href="/contact-us" className="btn btn-primary">
              Talk to an expert
              <Icon name="arrow-right" size={16} />
            </Link>
          </div>

          <div className="mt-10">
            <p className="text-[0.64rem] font-medium uppercase tracking-[0.18em] text-mist-500">
              Keep exploring
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {others.map((o) => (
                <Link
                  key={o.key}
                  href={`/${o.key}`}
                  className="group inline-flex items-center gap-1.5 rounded border border-line px-3.5 py-2 text-[0.8rem] font-light text-mist-300 transition-colors hover:border-line-strong hover:text-mist-50"
                >
                  {o.label}
                  <Icon
                    name="arrow-right"
                    size={13}
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
