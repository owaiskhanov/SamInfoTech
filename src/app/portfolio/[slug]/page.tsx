import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { BrandLogo, hasBrandMark } from "@/components/BrandLogo";
import { QuoteForm } from "@/components/QuoteForm";
import { ServiceCard } from "@/components/ServiceCard";
import { Reveal } from "@/components/Reveal";
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

  const related = items.filter((i) => i.slug !== item.slug && i.category === item.category).slice(0, 3);
  const suggestions = related.length >= 2 ? related : items.filter((i) => i.slug !== item.slug).slice(0, 3);

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
      <section className="border-b border-line">
        <div className="container-x pb-12 pt-8 lg:pb-14 lg:pt-10">
          <Breadcrumbs
            trail={[{ label: categoryLabel, href: categoryHref }, { label: item.name }]}
          />

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-14">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-md border border-line bg-ink-900 text-mist-200">
                  {hasBrandMark(item.icon) ? (
                    <BrandLogo name={item.icon} size={22} />
                  ) : (
                    <Icon name={item.icon} size={20} />
                  )}
                </span>
                <span className="text-[0.64rem] font-medium uppercase tracking-[0.18em] text-mist-500">
                  {item.eyebrow}
                </span>
              </div>

              <h1 className="mt-5 font-display text-[clamp(1.85rem,4.2vw,2.9rem)] font-light leading-[1.06] tracking-[-0.035em] text-mist-50">
                {item.name}
              </h1>
              <p className="mt-5 max-w-xl text-[0.95rem] font-light leading-relaxed text-mist-300">
                {item.body}
              </p>

              <ul className="mt-7 grid gap-2 sm:grid-cols-2">
                {item.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5">
                    <span className="mt-[0.3rem] flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-line text-brand-300">
                      <Icon name="check" size={9} strokeWidth={2.6} />
                    </span>
                    <span className="text-[0.82rem] font-light leading-snug text-mist-300">{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                <Link href="/contact-us" className="btn btn-primary">
                  Request a quote
                  <Icon name="arrow-right" size={15} />
                </Link>
                <Link
                  href={categoryHref}
                  className="group inline-flex items-center gap-1.5 text-[0.85rem] text-mist-300 transition-colors hover:text-mist-50"
                >
                  All {categoryLabel.toLowerCase()}
                  <Icon
                    name="arrow-right"
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </Reveal>

            {/* at a glance */}
            <Reveal className="rounded-lg border border-line bg-ink-900 p-5">
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.18em] text-mist-500">
                At a glance
              </p>
              <dl className="mt-4 divide-y divide-line">
                {[
                  { k: "Category", v: categoryLabel },
                  { k: "Delivered from", v: "Mumbai, India" },
                  { k: "Engagement", v: "Assess · Implement · Support" },
                  { k: "Talk to", v: company.phone },
                ].map((row) => (
                  <div key={row.k} className="flex items-start justify-between gap-4 py-2.5">
                    <dt className="text-[0.72rem] uppercase tracking-[0.1em] text-mist-500">
                      {row.k}
                    </dt>
                    <dd className="text-right font-display text-[0.8rem] font-normal text-mist-200">
                      {row.v}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 rounded border border-line bg-ink-950 p-4">
                <p className="text-[0.76rem] font-light leading-relaxed text-mist-400">
                  Speak to a specialist before you commit — we'll tell you what's worth doing and in
                  what order.
                </p>
                <a
                  href={company.phoneHref}
                  className="mt-2.5 inline-flex items-center gap-1.5 text-[0.78rem] font-normal text-brand-300 hover:text-brand-200"
                >
                  <Icon name="phone" size={12} />
                  {company.phone}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* details + quote */}
      <section className="border-b border-line bg-ink-900">
        <div className="container-x py-14 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <Reveal>
              <h2 className="font-display text-[1.3rem] font-light tracking-[-0.025em] text-mist-50 sm:text-[1.55rem]">
                What this looks like in practice
              </h2>
              <div className="mt-3.5 space-y-3.5 text-[0.9rem] font-light leading-relaxed text-mist-400">
                <p>{item.body}</p>
                <p>
                  Sam Infosystems has delivered {item.name.toLowerCase()} since 2000. Every
                  engagement starts with an honest assessment of what you already run, then a scoped
                  plan with clear ownership — and the same team stays on the account afterwards.
                </p>
              </div>

              <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
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
                  <div key={s.title} className="bg-ink-950 p-4">
                    <span className="flex items-center gap-2 font-display text-[0.84rem] font-normal text-mist-50">
                      <Icon name={s.icon} size={14} className="text-brand-300" />
                      {s.title}
                    </span>
                    <p className="mt-1.5 text-[0.76rem] font-light leading-relaxed text-mist-500">
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={90} className="rounded-lg border border-line bg-ink-950 p-5 sm:p-6">
              <p className="eyebrow">
                <span className="h-px w-5 bg-brand-400" aria-hidden="true" />
                Get a free quote
              </p>
              <h2 className="mt-3 font-display text-[1.1rem] font-light leading-snug tracking-[-0.02em] text-mist-50">
                Please fill this form and we'll get back to you as soon as possible!
              </h2>
              <div className="mt-4">
                <QuoteForm compact />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* related */}
      <section>
        <div className="container-x py-14 lg:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-[1.3rem] font-light tracking-[-0.025em] text-mist-50">
              Related {categoryLabel.toLowerCase()}
            </h2>
            <Link
              href={categoryHref}
              className="group inline-flex items-center gap-1.5 text-[0.8rem] text-mist-300 transition-colors hover:text-brand-300"
            >
              View all
              <Icon
                name="arrow-right"
                size={13}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-3">
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
