import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { QuoteForm } from "@/components/QuoteForm";
import { ServiceCard } from "@/components/ServiceCard";
import { Breadcrumbs } from "@/components/ui";
import { company, getItem, items } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return items.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item) return { title: "Not found" };

  // Use an absolute title: the root template would otherwise append the brand twice.
  const descriptor =
    item.category === "products"
      ? "Products & Support"
      : item.category === "security"
        ? "Security Services"
        : "IT Solutions";
  const withDescriptor = `${item.name} — ${descriptor} | Sam Infosystems`;
  const title =
    withDescriptor.length <= 65 ? withDescriptor : `${item.name} | Sam Infosystems`;

  const description =
    item.excerpt.length > 158 ? `${item.excerpt.slice(0, 155).trimEnd()}…` : item.excerpt;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/portfolio/${item.slug}` },
    openGraph: {
      title: `${item.name} | Sam Infosystems`,
      description,
      type: "article",
      images: ["/social-share.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.name} | Sam Infosystems`,
      description,
      images: ["/social-share.jpg"],
    },
  };
}

export default async function PortfolioPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item) notFound();

  const related = items
    .filter((i) => i.slug !== item.slug && i.category === item.category)
    .slice(0, 3);
  const fallback = items.filter((i) => i.slug !== item.slug).slice(0, 3);
  const suggestions = related.length >= 2 ? related : fallback;

  const categoryHref =
    item.category === "products" ? "/products" : item.category === "security" ? "/security" : "/solutions";
  const categoryLabel =
    item.eyebrow === "PRODUCTS" ? "Products" : item.eyebrow === "SECURITY" ? "Security" : "Solutions";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: item.name,
    serviceType: item.name,
    description: item.body,
    provider: { "@id": `${company.url}/#organization` },
    areaServed: "IN",
    url: `${company.url}/portfolio/${item.slug}`,
    category: categoryLabel,
  };

  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden border-b border-white/[0.07] pb-14 pt-10 lg:pb-16 lg:pt-12">
        <div className="absolute inset-0 grid-lines opacity-25" aria-hidden="true" />
        <div
          className="orb -right-32 -top-32 h-[26rem] w-[26rem]"
          style={{ background: `${item.accent}26` }}
          aria-hidden="true"
        />
        <div className="container-x relative">
          <Breadcrumbs
            trail={[
              { label: categoryLabel, href: categoryHref },
              { label: item.name },
            ]}
          />
          <div className="mt-9 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-14">
            <div>
              <span
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-display text-[0.64rem] font-semibold uppercase tracking-[0.18em]"
                style={{
                  borderColor: `${item.accent}40`,
                  background: `${item.accent}12`,
                  color: item.accent,
                }}
              >
                <Icon name={item.icon} size={13} />
                {item.eyebrow}
              </span>
              <h1 className="mt-5 font-display text-[clamp(1.9rem,4.4vw,3rem)] font-bold leading-[1.06] tracking-[-0.035em] text-white">
                {item.name}
              </h1>
              <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-mist-300">{item.body}</p>

              <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
                {item.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2.5 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3.5 py-2.5"
                  >
                    <span
                      className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                      style={{ background: `${item.accent}22`, color: item.accent }}
                    >
                      <Icon name="check" size={11} strokeWidth={2.6} />
                    </span>
                    <span className="text-[0.82rem] leading-snug text-mist-300">{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/contact-us" className="btn btn-primary">
                  Request a quote
                  <Icon name="arrow-right" size={16} />
                </Link>
                <Link href={categoryHref} className="btn btn-ghost">
                  All {categoryLabel.toLowerCase()}
                </Link>
              </div>
            </div>

            {/* key facts */}
            <div className="relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-ink-900/60 p-6">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: `linear-gradient(90deg,transparent,${item.accent},transparent)` }}
              />
              <p className="font-display text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-mist-500">
                At a glance
              </p>
              <dl className="mt-5 space-y-4">
                {[
                  { k: "Category", v: categoryLabel },
                  { k: "Delivered from", v: "Mumbai, India" },
                  { k: "Engagement", v: "Assessment · Implementation · Support" },
                  { k: "Talk to", v: company.phone },
                ].map((row) => (
                  <div key={row.k} className="flex items-start justify-between gap-4 border-b border-white/[0.06] pb-3 last:border-0 last:pb-0">
                    <dt className="text-[0.74rem] uppercase tracking-[0.12em] text-mist-500">{row.k}</dt>
                    <dd className="text-right font-display text-[0.83rem] font-medium text-mist-200">{row.v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 rounded-lg border border-white/[0.07] bg-ink-950/60 p-4">
                <p className="text-[0.78rem] leading-relaxed text-mist-400">
                  Speak to a specialist before you commit — we'll tell you what's worth doing and in
                  what order.
                </p>
                <a
                  href={company.phoneHref}
                  className="mt-3 inline-flex items-center gap-1.5 font-display text-[0.8rem] font-semibold text-brand-300 hover:text-brand-200"
                >
                  <Icon name="phone" size={13} />
                  {company.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* details + quote */}
      <section className="py-16 lg:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <div>
            <h2 className="font-display text-[1.4rem] font-semibold text-white sm:text-[1.7rem]">
              What this looks like in practice
            </h2>
            <div className="prose-body mt-4 text-[0.95rem] leading-relaxed text-mist-400">
              <p>{item.body}</p>
              <p>
                Sam Infosystems has delivered {item.name.toLowerCase()} since 2000. Every engagement
                starts with an honest assessment of what you already run, then a scoped plan with
                clear ownership — and the same team stays on the account afterwards.
              </p>
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {[
                {
                  icon: "compass",
                  title: "Assess",
                  body: "Current state, gaps and risk ranked by business impact — not by what's easiest to sell.",
                },
                {
                  icon: "spark",
                  title: "Design",
                  body: "A scoped architecture and rollout plan with named owners and realistic dates.",
                },
                {
                  icon: "arrow-right",
                  title: "Deliver",
                  body: "Implementation with change control, testing and a documented handover.",
                },
                {
                  icon: "shield-check",
                  title: "Support",
                  body: "Ongoing monitoring, management and quarterly review with one accountable number.",
                },
              ].map((s) => (
                <div
                  key={s.title}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4"
                >
                  <span className="flex items-center gap-2 font-display text-[0.84rem] font-semibold text-white">
                    <Icon name={s.icon} size={15} className="text-brand-300" />
                    {s.title}
                  </span>
                  <p className="mt-2 text-[0.78rem] leading-relaxed text-mist-500">{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-ink-950/70 p-6 sm:p-7">
            <div className="orb -right-16 -top-20 h-48 w-48 bg-brand-500/20" aria-hidden="true" />
            <div className="relative">
              <p className="eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                Get a free quote
              </p>
              <h2 className="mt-3 font-display text-[1.2rem] font-semibold leading-snug text-white">
                Please fill this form and we'll get back to you as soon as possible!
              </h2>
              <div className="mt-5">
                <QuoteForm compact />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* related */}
      <section className="border-t border-white/[0.07] bg-ink-900/40 py-16 lg:py-20">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-[1.35rem] font-semibold text-white sm:text-[1.6rem]">
              Related {categoryLabel.toLowerCase()}
            </h2>
            <Link
              href={categoryHref}
              className="group inline-flex items-center gap-2 font-display text-[0.8rem] font-semibold text-brand-300 hover:text-brand-200"
            >
              View all
              <Icon name="arrow-right" size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {suggestions.map((s) => (
              <ServiceCard key={s.slug} item={s} />
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
