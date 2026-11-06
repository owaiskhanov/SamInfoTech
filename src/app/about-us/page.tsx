import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { Breadcrumbs, SectionHeading } from "@/components/ui";
import { QuoteForm } from "@/components/QuoteForm";
import { about, company } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us — IT Partner Since 2000",
  description:
    "Sam Infosystems Pvt Ltd, formerly SAM INFOTECH, was founded in 2000 as an IT solutions provider focused on software and cloud. Our mission and vision.",
  alternates: { canonical: "/about-us" },
  openGraph: {
    title: "About Sam Infosystems — a quarter century of IT partnerships",
    description:
      "Founded in 2000 in Mumbai. Software, cloud and security solutions delivered through long-term partnerships.",
    images: ["/social-share.jpg"],
  },
};

const timeline = [
  {
    year: "2000",
    title: "SAM INFOTECH is founded",
    body: "Established with a visionary approach to architect, deploy and guide customers in adopting the latest advancements in IT technology.",
  },
  {
    year: "2002–2012",
    title: "Enterprise platforms, delivered locally",
    body: "Building deep practice in cloud platforms, ERP and design software — bringing global platforms to Indian businesses with local accountability.",
  },
  {
    year: "2013–2020",
    title: "Security becomes a core practice",
    body: "Firewall management, endpoint protection and VAPT grow from add-ons into the discipline that now anchors half of everything we deliver.",
  },
  {
    year: "2022",
    title: "Sam Infosystems Pvt Ltd",
    body: "The business incorporates as Sam Infosystems Pvt Ltd, formalising a twenty-two-year track record of client relationships.",
  },
  {
    year: "Today",
    title: "22 products & services, one partner",
    body: "From cloud infrastructure and migration to 24×7 security management, IT consultancy and training — delivered by one accountable team.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden border-b border-white/[0.07] pb-16 pt-10 lg:pb-20 lg:pt-12">
        <div className="orb -left-32 -top-24 h-96 w-96 bg-brand-500/15" aria-hidden="true" />
        <div className="absolute inset-0 grid-lines opacity-30" aria-hidden="true" />
        <div className="container-x relative">
          <Breadcrumbs trail={[{ label: "About Us" }]} />
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <p className="eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                About Us
              </p>
              <h1 className="mt-4 font-display text-[clamp(2rem,4.6vw,3.3rem)] font-bold leading-[1.05] tracking-[-0.035em] text-white">
                Twenty-five years of building{" "}
                <span className="text-gradient">trust, not just systems.</span>
              </h1>
              <p className="mt-6 max-w-xl text-[1rem] leading-relaxed text-mist-300">
                {about.intro}
              </p>
              <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-mist-400">
                {about.intro2}
              </p>
            </div>
            <Reveal className="relative">
              <div className="overflow-hidden rounded-[1.5rem] border border-white/10">
                <Image
                  src="/images/about-team.webp"
                  alt="Sam Infosystems team collaborating in their Mumbai office"
                  width={1408}
                  height={960}
                  priority
                  sizes="(min-width: 1024px) 44vw, 92vw"
                  className="w-full object-cover"
                />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { v: "2000", l: "Founded" },
                  { v: "Mumbai", l: "Head office" },
                  { v: "22", l: "Services" },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3"
                  >
                    <p className="font-display text-[1.05rem] font-semibold text-white">{s.v}</p>
                    <p className="mt-0.5 text-[0.66rem] uppercase tracking-[0.14em] text-mist-500">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* mission / vision */}
      <section className="py-20 lg:py-24">
        <div className="container-x grid gap-5 lg:grid-cols-2">
          {[
            { icon: "compass", label: "Mission", body: about.mission, accent: "#22d3ee" },
            { icon: "globe-shield", label: "Vision", body: about.vision, accent: "#60a5fa" },
          ].map((c) => (
            <Reveal
              key={c.label}
              className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-900/50 p-8"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: `linear-gradient(90deg,transparent,${c.accent},transparent)` }}
              />
              <span
                className="flex h-12 w-12 items-center justify-center rounded-xl border"
                style={{ borderColor: `${c.accent}38`, background: `${c.accent}14`, color: c.accent }}
              >
                <Icon name={c.icon} size={22} />
              </span>
              <h2 className="mt-6 font-display text-[1.35rem] font-semibold text-white">{c.label}</h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-mist-300">{c.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* values */}
      <section className="border-y border-white/[0.07] bg-ink-900/40 py-20 lg:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="What we stand for"
            title="Core values that outlast every technology cycle"
            blurb="Four commitments that shape how we scope work, price it, and stay on the phone long after go-live."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((v, i) => (
              <Reveal
                key={v.title}
                delay={i * 80}
                className="card-hover rounded-2xl border border-white/[0.08] bg-ink-950/60 p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-400/30 bg-brand-400/10 text-brand-300">
                  <Icon name={v.icon} size={18} />
                </span>
                <h3 className="mt-5 font-display text-[0.98rem] font-semibold text-white">{v.title}</h3>
                <p className="mt-2 text-[0.84rem] leading-relaxed text-mist-400">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* timeline */}
      <section className="py-20 lg:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our journey"
            title="From SAM INFOTECH to Sam Infosystems"
            blurb="A steady accumulation of capability — and of clients who stayed."
          />
          <ol className="relative mt-12 space-y-0 border-l border-white/10 pl-6 sm:pl-8">
            {timeline.map((t, i) => (
              <li key={t.year} className="relative pb-10 last:pb-0">
                <span
                  className="absolute -left-[1.72rem] top-1 flex h-3 w-3 items-center justify-center rounded-full border border-brand-400/60 bg-ink-950 sm:-left-[2.22rem]"
                  aria-hidden="true"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                </span>
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-4">
                  <span className="font-display text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-brand-300">
                    {t.year}
                  </span>
                  <h3 className="font-display text-[1.05rem] font-semibold text-white">{t.title}</h3>
                </div>
                <p className="mt-2 max-w-2xl text-[0.9rem] leading-relaxed text-mist-400">{t.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* quote */}
      <section className="border-t border-white/[0.07] bg-ink-900/40 py-20 lg:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Get a free quote"
              title="Please fill this form and we'll get back to you as soon as possible!"
              blurb="Prefer to talk? Call us during business hours — a real engineer answers."
            />
            <div className="mt-8 space-y-3">
              <a
                href={company.phoneHref}
                className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 transition-colors hover:border-brand-400/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-400/10 text-brand-300">
                  <Icon name="phone" size={17} />
                </span>
                <span>
                  <span className="block text-[0.66rem] uppercase tracking-[0.16em] text-mist-500">
                    Phone
                  </span>
                  <span className="font-display text-[0.9rem] font-semibold text-white">
                    {company.phone}
                  </span>
                </span>
              </a>
              <a
                href={`mailto:${company.emailGeneral}`}
                className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 transition-colors hover:border-brand-400/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-400/10 text-brand-300">
                  <Icon name="mail" size={17} />
                </span>
                <span>
                  <span className="block text-[0.66rem] uppercase tracking-[0.16em] text-mist-500">
                    General information
                  </span>
                  <span className="font-display text-[0.9rem] font-semibold text-white">
                    {company.emailGeneral}
                  </span>
                </span>
              </a>
            </div>
            <Link href="/contact-us" className="btn btn-ghost mt-6">
              Visit the contact page
              <Icon name="arrow-right" size={16} />
            </Link>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-ink-950/60 p-7 sm:p-9">
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}
