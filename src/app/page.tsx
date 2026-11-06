import type { Metadata } from "next";
import { ThemedImage } from "@/components/ThemedImage";
import Link from "next/link";
import { HeroSlider } from "@/components/HeroSlider";
import { FilterableGrid } from "@/components/FilterableGrid";
import { ServiceCard, ServiceRow } from "@/components/ServiceCard";
import { hasBrandMark } from "@/lib/brand-logo";
import { ThemeBrandMarkBase as ThemeBrandMark } from "@/components/ThemeBrandMarkBase";
import { QuoteForm } from "@/components/QuoteForm";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { SectionHeading } from "@/components/ui";
import { about, byCategory, company, offer, quote } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Sam Infosystems | IT Solutions, Cloud & Security, Mumbai" },
  description:
    "Security and cloud solutions provider with a strong focus on software. Architecting, deploying and supporting enterprise IT from Mumbai since 2000.",
  alternates: { canonical: "/" },
};

const products = byCategory("products");
const security = byCategory("security");
const solutions = byCategory("solutions");

export default function HomePage() {
  return (
    <>
      <HeroSlider />

      {/* platforms strip */}
      <section aria-label="Platforms we deliver" className="border-b border-line bg-ink-900">
        <div className="container-x py-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
            <p className="shrink-0 text-[0.64rem] font-medium uppercase tracking-[0.2em] text-mist-500">
              Platforms we deliver
            </p>
            <ul className="grid flex-1 grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-3 lg:grid-cols-6">
              {products.slice(0, 6).map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/portfolio/${p.slug}`}
                    className="group flex items-center gap-2.5 text-mist-400 transition-colors hover:text-mist-100"
                  >
                    <span className="shrink-0">
                      {hasBrandMark(p.icon) ? (
                        <ThemeBrandMark name={p.icon} size={19} />
                      ) : (
                        <Icon name={p.icon} size={19} />
                      )}
                    </span>
                    <span className="truncate text-[0.78rem] font-light">{p.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* about */}
      <section className="border-b border-line" id="about">
        <div className="container-x py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">
                <span className="h-px w-5 bg-brand-400" aria-hidden="true" />
                About Sam Infosystems
              </p>
              <h2 className="mt-4 font-display text-[1.8rem] font-light leading-[1.12] tracking-[-0.03em] text-mist-50 sm:text-[2.15rem] lg:text-[2.45rem]">
                A quarter century of turning technology into{" "}
                <span className="text-brand-300">enduring partnerships.</span>
              </h2>
              <p className="mt-6 text-[0.95rem] font-light leading-relaxed text-mist-300">
                {about.intro}
              </p>
              <p className="mt-4 text-[0.9rem] font-light leading-relaxed text-mist-400">
                We measure success not by the number of sales but by the quality of relationships we
                build. Every new project is a partnership, and every partnership is an opportunity
                to grow together.
              </p>

              <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-line pt-7 sm:grid-cols-4">
                {[
                  { v: "2000", l: "Founded" },
                  { v: "22", l: "Offerings" },
                  { v: "100+", l: "Countries" },
                  { v: "1M+", l: "Businesses" },
                ].map((s) => (
                  <div key={s.l}>
                    <dt className="sr-only">{s.l}</dt>
                    <dd>
                      <span className="block font-display text-[1.5rem] font-light leading-none text-mist-50">
                        {s.v}
                      </span>
                      <span className="mt-2 block text-[0.68rem] uppercase tracking-[0.12em] text-mist-500">
                        {s.l}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                <Link href="/about-us" className="btn btn-primary">
                  More about us
                  <Icon name="arrow-right" size={15} />
                </Link>
                <Link
                  href="/contact-us"
                  className="group inline-flex items-center gap-1.5 text-[0.85rem] text-mist-300 transition-colors hover:text-mist-50"
                >
                  Book a consultation
                  <Icon
                    name="arrow-right"
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={120} className="flex flex-col gap-4">
              <div className="overflow-hidden rounded-lg border border-line">
                <ThemedImage
                  src="/images/about-team.webp"
                  alt="Sam Infosystems consultants reviewing an enterprise architecture plan in Mumbai"
                  width={1408}
                  height={960}
                  sizes="(min-width: 1024px) 44vw, 92vw"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="rounded-lg border border-line bg-ink-900 p-5">
                <p className="text-[0.64rem] font-medium uppercase tracking-[0.18em] text-mist-500">
                  Our mission
                </p>
                <p className="mt-2.5 text-[0.86rem] font-light leading-relaxed text-mist-300">
                  Exceptional IT services, built on timely consultation, guidance and a
                  customer-centric approach.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* products */}
      <section id="products" className="border-b border-line bg-ink-900">
        <div className="container-x py-16 lg:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Our products"
              title={
                <>
                  Your products, protected.{" "}
                  <span className="text-mist-400">
                    every platform secured with advanced encryption and privacy measures.
                  </span>
                </>
              }
              blurb="We license, deploy and support the enterprise platforms your business already runs on, with local accountability and one number to call."
              action={{ label: "All products", href: "/products" }}
            />
          </Reveal>
          <Reveal delay={80} className="mt-10">
            <FilterableGrid
              defaultTab="products"
              groups={[
                { key: "products", label: "Products", items: products },
                { key: "solutions", label: "Solutions", items: solutions },
                { key: "security", label: "Security", items: security },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* security */}
      <section id="security" className="border-b border-line">
        <div className="container-x py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
            <Reveal className="order-2 flex flex-col gap-4 lg:order-1">
              <div className="overflow-hidden rounded-lg border border-line">
                <ThemedImage
                  src="/images/security-soc.webp"
                  alt="Security operations centre monitoring networks in real time"
                  width={1408}
                  height={800}
                  sizes="(min-width: 1024px) 44vw, 92vw"
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between gap-4 rounded-lg border border-line bg-ink-900 px-4 py-3">
                <span className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.16em] text-mist-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-400" aria-hidden="true" />
                  Threat monitoring
                </span>
                <span className="text-[0.68rem] uppercase tracking-[0.16em] text-mist-500">
                  24 × 7
                </span>
              </div>
            </Reveal>

            <div className="order-1 lg:order-2">
              <Reveal>
                <p className="eyebrow">
                  <span className="h-px w-5 bg-brand-400" aria-hidden="true" />
                  Security
                </p>
                <h2 className="mt-4 font-display text-[1.8rem] font-light leading-[1.12] tracking-[-0.03em] text-mist-50 sm:text-[2.15rem]">
                  Ensuring the security of your digital portfolio.{" "}
                  <span className="text-brand-300">giving you peace of mind.</span>
                </h2>
                <p className="mt-4 text-[0.9rem] font-light leading-relaxed text-mist-400">
                  Advanced threat detection, real-time monitoring and robust defence mechanisms
                  that strengthen your security posture and operational efficiency.
                </p>
              </Reveal>

              <Reveal delay={90} className="mt-6 -ml-3">
                <div className="divide-y divide-line">
                  {security.map((s) => (
                    <ServiceRow key={s.slug} item={s} />
                  ))}
                </div>
              </Reveal>

              <Link
                href="/security"
                className="group mt-6 inline-flex items-center gap-1.5 text-[0.85rem] text-mist-300 transition-colors hover:text-brand-300"
              >
                All security services
                <Icon
                  name="arrow-right"
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* solutions */}
      <section className="border-b border-line bg-ink-900">
        <div className="container-x py-16 lg:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Our solutions"
              title={
                <>
                  From cloud to consultancy:{" "}
                  <span className="text-mist-400">one accountable partner.</span>
                </>
              }
              blurb="Scalable infrastructure, smooth migrations, proactive management and expert guidance, delivered by the same team that has supported you since 2000."
              action={{ label: "All solutions", href: "/solutions" }}
            />
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 70} className="h-full">
                <ServiceCard item={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* values */}
      <section className="border-b border-line">
        <div className="container-x py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <Reveal>
              <p className="eyebrow">
                <span className="h-px w-5 bg-brand-400" aria-hidden="true" />
                Why Sam Infosystems
              </p>
              <h2 className="mt-4 font-display text-[1.8rem] font-light leading-[1.14] tracking-[-0.03em] text-mist-50 sm:text-[2.1rem]">
                Strategic consultation. Reliable guidance.{" "}
                <span className="text-brand-300">Superior IT services.</span>
              </h2>
              <p className="mt-4 text-[0.9rem] font-light leading-relaxed text-mist-400">
                {about.vision}
              </p>
            </Reveal>

            <Reveal delay={100}>
              <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
                {about.values.map((v) => (
                  <div key={v.title} className="bg-ink-950 p-5">
                    <span className="flex h-8 w-8 items-center justify-center rounded border border-line text-brand-300">
                      <Icon name={v.icon} size={15} />
                    </span>
                    <h3 className="mt-3.5 font-display text-[0.9rem] font-normal text-mist-50">
                      {v.title}
                    </h3>
                    <p className="mt-1.5 text-[0.78rem] font-light leading-relaxed text-mist-500">
                      {v.body}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* offer + quote */}
      <section id="quote" className="border-b border-line bg-ink-900">
        <div className="container-x py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
            <div className="flex flex-col gap-4">
              <Reveal className="rounded-lg border border-line bg-ink-950 p-6 sm:p-7">
                <p className="text-[0.64rem] font-medium uppercase tracking-[0.2em] text-brand-300">
                  {offer.title}
                </p>
                <h2 className="mt-3 font-display text-[1.35rem] font-light leading-snug tracking-[-0.025em] text-mist-50">
                  Sign up to receive the latest offers and news in industry.
                </h2>
                <p className="mt-2.5 text-[0.86rem] font-light leading-relaxed text-mist-400">
                  Enter your email address and receive 15% off your first order, and a promo code lands
                  straight in your inbox.
                </p>
                <div className="mt-5">
                  <NewsletterForm />
                </div>
                <p className="mt-3.5 text-[0.7rem] font-light leading-relaxed text-mist-600">
                  {offer.finePrint}
                </p>
              </Reveal>

              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href={company.phoneHref}
                  className="card flex items-center gap-3 rounded-lg p-4"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded border border-line text-brand-300">
                    <Icon name="phone" size={15} />
                  </span>
                  <span>
                    <span className="block text-[0.62rem] uppercase tracking-[0.14em] text-mist-500">
                      Call us
                    </span>
                    <span className="font-display text-[0.85rem] font-normal text-mist-100">
                      {company.phone}
                    </span>
                  </span>
                </a>
                <a
                  href={`mailto:${company.emailSales}`}
                  className="card flex items-center gap-3 rounded-lg p-4"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded border border-line text-brand-300">
                    <Icon name="mail" size={15} />
                  </span>
                  <span>
                    <span className="block text-[0.62rem] uppercase tracking-[0.14em] text-mist-500">
                      Sales
                    </span>
                    <span className="font-display text-[0.85rem] font-normal text-mist-100">
                      {company.emailSales}
                    </span>
                  </span>
                </a>
              </div>
            </div>

            <Reveal delay={110} className="rounded-lg border border-line bg-ink-950 p-6 sm:p-7">
              <p className="text-[0.64rem] font-medium uppercase tracking-[0.2em] text-brand-300">
                {quote.title}
              </p>
              <h2 className="mt-3 font-display text-[1.2rem] font-light leading-snug tracking-[-0.02em] text-mist-50">
                {quote.subtitle}
              </h2>
              <div className="mt-5">
                <QuoteForm compact />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="container-x py-14 lg:py-16">
          <Reveal className="flex flex-col gap-6 rounded-lg border border-line bg-ink-900 p-6 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="max-w-lg font-display text-[1.4rem] font-light leading-tight tracking-[-0.025em] text-mist-50 sm:text-[1.7rem]">
                Ready to modernise your IT.{" "}
                <span className="text-brand-300">without the disruption?</span>
              </h2>
              <p className="mt-2.5 max-w-md text-[0.86rem] font-light text-mist-400">
                Tell us what you're running today. We'll map the shortest, safest path to where you
                want to be.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <Link href="/contact-us" className="btn btn-primary">
                Get a free quote
                <Icon name="arrow-right" size={15} />
              </Link>
              <a href={company.phoneHref} className="btn btn-ghost">
                <Icon name="phone" size={14} />
                {company.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
