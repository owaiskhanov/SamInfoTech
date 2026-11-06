import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroSlider } from "@/components/HeroSlider";
import { FilterableGrid } from "@/components/FilterableGrid";
import { ServiceCard } from "@/components/ServiceCard";
import { QuoteForm } from "@/components/QuoteForm";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { SectionHeading } from "@/components/ui";
import { about, byCategory, company, items, offer, quote } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Sam Infosystems — IT Solutions, Cloud & Security, Mumbai",
  },
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

      {/* ————————————————— product marquee ————————————————— */}
      <section aria-label="Platforms we deliver" className="relative border-y border-white/[0.07] bg-ink-900/40 py-6">
        <div className="container-x mb-4">
          <p className="text-center font-display text-[0.64rem] font-semibold uppercase tracking-[0.26em] text-mist-500">
            Platforms we license, deploy &amp; support
          </p>
        </div>
        <div className="marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <div className="marquee-track gap-3">
            {[...products, ...products].map((p, i) => (
              <span
                key={`${p.slug}-${i}`}
                className="flex shrink-0 items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-[0.82rem] text-mist-300"
              >
                <span style={{ color: p.accent }}>
                  <Icon name={p.icon} size={16} />
                </span>
                {p.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ————————————————— about ————————————————— */}
      <section className="relative overflow-hidden py-20 lg:py-28" id="about">
        <div className="orb -right-40 top-10 h-[26rem] w-[26rem] bg-azure-600/20" aria-hidden="true" />
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              About Sam Infosystems
            </p>
            <h2 className="mt-4 font-display text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.025em] text-white sm:text-[2.3rem] lg:text-[2.65rem]">
              A quarter century of turning technology into{" "}
              <span className="text-gradient">enduring partnerships.</span>
            </h2>
            <p className="mt-6 text-[0.98rem] leading-relaxed text-mist-300">{about.intro}</p>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-mist-400">
              We measure success not by the number of sales but by the quality of relationships we
              build. Every new project is a partnership, and every partnership is an opportunity to
              grow together.
            </p>

            <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-white/[0.08] pt-8 sm:grid-cols-4">
              {[
                { v: "2000", l: "Founded" },
                { v: "22", l: "Products & services" },
                { v: "100+", l: "Countries reached" },
                { v: "1M+", l: "Businesses served" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="sr-only">{s.l}</dt>
                  <dd>
                    <span className="block font-display text-[1.65rem] font-semibold leading-none text-white">
                      {s.v}
                    </span>
                    <span className="mt-2 block text-[0.72rem] uppercase tracking-[0.14em] text-mist-500">
                      {s.l}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/about-us" className="btn btn-primary">
                More about us
                <Icon name="arrow-right" size={16} />
              </Link>
              <Link href="/contact-us" className="btn btn-ghost">
                Book a consultation
              </Link>
            </div>
          </div>

          <Reveal className="relative">
            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10">
              <Image
                src="/images/about-team.webp"
                alt="Sam Infosystems consultants reviewing an enterprise architecture plan in the Mumbai office"
                width={1408}
                height={960}
                sizes="(min-width: 1024px) 44vw, 92vw"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
              <div className="absolute inset-x-5 bottom-5 rounded-xl border border-white/10 bg-ink-950/70 p-4 backdrop-blur-md">
                <p className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-brand-300">
                  Our mission
                </p>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-mist-300">
                  Exceptional IT services, built on timely consultation, guidance and a
                  customer-centric approach.
                </p>
              </div>
            </div>
            <div className="floaty absolute -left-5 -top-5 hidden rounded-2xl border border-brand-400/25 bg-ink-900/90 px-4 py-3 backdrop-blur lg:block">
              <p className="font-display text-[1.35rem] font-bold leading-none text-white">25</p>
              <p className="mt-1 text-[0.62rem] uppercase tracking-[0.16em] text-mist-500">
                Years of trust
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ————————————————— products ————————————————— */}
      <section id="products" className="relative border-y border-white/[0.07] bg-ink-900/40 py-20 lg:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our products"
            title={
              <>
                Your products, protected —{" "}
                <span className="text-mist-400">
                  every platform secured with advanced encryption and privacy measures.
                </span>
              </>
            }
            blurb="We license, deploy and support the enterprise platforms your business already runs on — with local accountability and one number to call."
            action={{ label: "All products", href: "/products" }}
          />
          <div className="mt-12">
            <FilterableGrid
              defaultTab="products"
              groups={[
                { key: "products", label: "Products", items: products },
                { key: "solutions", label: "Solutions", items: solutions },
                { key: "security", label: "Security", items: security },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ————————————————— security showcase ————————————————— */}
      <section id="security" className="relative overflow-hidden py-20 lg:py-28">
        <div className="container-x">
          <div className="grid items-stretch gap-10 lg:grid-cols-[1.02fr_1fr] lg:gap-14">
            <Reveal className="relative order-2 overflow-hidden rounded-[1.6rem] border border-white/10 lg:order-1">
              <Image
                src="/images/security-soc.webp"
                alt="Security operations centre monitoring networks in real time"
                width={1408}
                height={800}
                sizes="(min-width: 1024px) 48vw, 92vw"
                className="h-full min-h-[19rem] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink-950/85 via-ink-950/20 to-transparent" />
              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-ink-950/70 px-3 py-1.5 backdrop-blur">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                <span className="font-display text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Threat monitoring live
                </span>
              </div>
            </Reveal>

            <div className="order-1 lg:order-2">
              <p className="eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                Security
              </p>
              <h2 className="mt-4 font-display text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.025em] text-white sm:text-[2.3rem]">
                Ensuring the security of your digital portfolio —{" "}
                <span className="text-gradient">giving you peace of mind.</span>
              </h2>
              <p className="mt-5 text-[0.96rem] leading-relaxed text-mist-400">
                Advanced threat detection, real-time monitoring and robust defence mechanisms that
                strengthen your security posture and operational efficiency.
              </p>

              <ul className="mt-7 space-y-3">
                {security.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/portfolio/${s.slug}`}
                      className="group flex items-center gap-4 rounded-xl border border-white/[0.08] bg-white/[0.015] px-4 py-3 transition-all hover:border-brand-400/35 hover:bg-white/[0.04]"
                    >
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border"
                        style={{
                          borderColor: `${s.accent}35`,
                          background: `${s.accent}12`,
                          color: s.accent,
                        }}
                      >
                        <Icon name={s.icon} size={17} />
                      </span>
                      <span className="flex-1">
                        <span className="block font-display text-[0.92rem] font-semibold text-white">
                          {s.name}
                        </span>
                        <span className="mt-0.5 block text-[0.78rem] text-mist-500">
                          {s.highlights[0]}
                        </span>
                      </span>
                      <Icon
                        name="arrow-right"
                        size={16}
                        className="text-mist-500 transition-all group-hover:translate-x-0.5 group-hover:text-brand-300"
                      />
                    </Link>
                  </li>
                ))}
              </ul>

              <Link href="/security" className="btn btn-ghost mt-7">
                All security services
                <Icon name="arrow-right" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ————————————————— solutions ————————————————— */}
      <section className="relative border-y border-white/[0.07] bg-ink-900/40 py-20 lg:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our solutions"
            title={
              <>
                From cloud to consultancy —{" "}
                <span className="text-mist-400">one accountable partner.</span>
              </>
            }
            blurb="Scalable infrastructure, smooth migrations, proactive management and expert guidance, delivered by the same team that has supported you since 2000."
            action={{ label: "All solutions", href: "/solutions" }}
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s) => (
              <ServiceCard key={s.slug} item={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ————————————————— stats / value band ————————————————— */}
      <section className="relative overflow-hidden py-20 lg:py-24">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-ink-850 via-ink-900 to-ink-950 p-8 sm:p-11 lg:p-14">
            <div className="orb -left-20 -top-24 h-72 w-72 bg-brand-500/20" aria-hidden="true" />
            <div className="orb -bottom-28 right-0 h-80 w-80 bg-azure-600/20" aria-hidden="true" />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
              <div>
                <p className="eyebrow">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                  Why Sam Infosystems
                </p>
                <h2 className="mt-4 font-display text-[1.75rem] font-semibold leading-[1.16] text-white sm:text-[2.1rem]">
                  Strategic consultation. Reliable guidance.{" "}
                  <span className="text-gradient">Superior IT services.</span>
                </h2>
                <p className="mt-4 max-w-md text-[0.93rem] leading-relaxed text-mist-400">
                  {about.vision}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {about.values.map((v) => (
                  <div
                    key={v.title}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-400/30 bg-brand-400/10 text-brand-300">
                      <Icon name={v.icon} size={17} />
                    </span>
                    <h3 className="mt-4 font-display text-[0.9rem] font-semibold text-white">
                      {v.title}
                    </h3>
                    <p className="mt-1.5 text-[0.78rem] leading-relaxed text-mist-400">{v.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ————————————————— offer + quote ————————————————— */}
      <section id="quote" className="relative border-t border-white/[0.07] bg-ink-900/40 py-20 lg:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div>
            <div className="relative overflow-hidden rounded-[1.5rem] border border-brand-400/25 bg-gradient-to-br from-brand-400/[0.12] via-ink-900 to-ink-950 p-7 sm:p-9">
              <div className="orb -right-16 -top-20 h-56 w-56 bg-brand-400/20" aria-hidden="true" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/40 bg-brand-400/15 px-3 py-1.5 font-display text-[0.64rem] font-bold uppercase tracking-[0.2em] text-brand-200">
                  <Icon name="spark" size={13} />
                  {offer.title}
                </span>
                <h2 className="mt-5 font-display text-[1.6rem] font-semibold leading-tight text-white sm:text-[1.9rem]">
                  Sign up to receive the latest offers and news in industry.
                </h2>
                <p className="mt-3 text-[0.88rem] leading-relaxed text-mist-400">
                  Enter your email address and receive 15% off your first order — a promo code lands
                  straight in your inbox.
                </p>
                <div className="mt-6">
                  <NewsletterForm />
                </div>
                <p className="mt-4 text-[0.7rem] leading-relaxed text-mist-500">{offer.finePrint}</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <a
                href={company.phoneHref}
                className="group flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 transition-all hover:border-brand-400/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-400/10 text-brand-300">
                  <Icon name="phone" size={17} />
                </span>
                <span>
                  <span className="block text-[0.66rem] uppercase tracking-[0.16em] text-mist-500">
                    Call us
                  </span>
                  <span className="font-display text-[0.88rem] font-semibold text-white">
                    {company.phone}
                  </span>
                </span>
              </a>
              <a
                href={`mailto:${company.emailSales}`}
                className="group flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 transition-all hover:border-brand-400/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-400/10 text-brand-300">
                  <Icon name="mail" size={17} />
                </span>
                <span>
                  <span className="block text-[0.66rem] uppercase tracking-[0.16em] text-mist-500">
                    Sales
                  </span>
                  <span className="font-display text-[0.88rem] font-semibold text-white">
                    {company.emailSales}
                  </span>
                </span>
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-ink-950/70 p-7 sm:p-9">
            <div className="orb -bottom-24 -right-20 h-64 w-64 bg-azure-600/20" aria-hidden="true" />
            <div className="relative">
              <p className="eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                {quote.title}
              </p>
              <h2 className="mt-3 font-display text-[1.5rem] font-semibold leading-snug text-white sm:text-[1.75rem]">
                {quote.subtitle}
              </h2>
              <div className="mt-6">
                <QuoteForm compact />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ————————————————— CTA ————————————————— */}
      <section className="relative overflow-hidden py-16 lg:py-20">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10">
            <Image
              src="/images/solutions-core.webp"
              alt=""
              width={1400}
              height={700}
              sizes="100vw"
              className="absolute inset-0 h-full w-full object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/40" />
            <div className="relative flex flex-col items-start gap-6 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="max-w-xl font-display text-[1.7rem] font-semibold leading-tight text-white sm:text-[2.1rem]">
                  Ready to modernise your IT —{" "}
                  <span className="text-gradient">without the disruption?</span>
                </h2>
                <p className="mt-3 max-w-lg text-[0.92rem] text-mist-400">
                  Tell us what you're running today. We'll map the shortest, safest path to where
                  you want to be.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Link href="/contact-us" className="btn btn-primary">
                  Get a free quote
                  <Icon name="arrow-right" size={16} />
                </Link>
                <a href={company.phoneHref} className="btn btn-ghost">
                  <Icon name="phone" size={15} />
                  {company.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
