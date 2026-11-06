import type { Metadata } from "next";
import { ThemedImage } from "@/components/ThemedImage";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { Breadcrumbs, SectionHeading } from "@/components/ui";
import { QuoteForm } from "@/components/QuoteForm";
import { about, company } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us | IT Partner Since 2000",
  description:
    "Sam Infosystems Pvt Ltd, formerly SAM INFOTECH, was founded in 2000 as an IT solutions provider focused on software and cloud. Our mission and vision.",
  alternates: { canonical: "/about-us" },
  openGraph: {
    title: "About Sam Infosystems: a quarter century of IT partnerships",
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
    body: "Building deep practice in cloud platforms, ERP and design software, bringing global platforms to Indian businesses with local accountability.",
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
    title: "22 offerings, one partner",
    body: "From cloud infrastructure and migration to 24×7 security management, IT consultancy and training, delivered by one accountable team.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="container-x pb-14 pt-8 lg:pb-16 lg:pt-10">
          <Breadcrumbs trail={[{ label: "About Us" }]} />

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-14">
            <div>
              <p className="eyebrow">
                <span className="h-px w-5 bg-brand-400" aria-hidden="true" />
                About Us
              </p>
              <h1 className="mt-4 font-display text-[clamp(1.95rem,4.4vw,3.1rem)] font-light leading-[1.05] tracking-[-0.035em] text-mist-50">
                Twenty-five years of building{" "}
                <span className="text-brand-300">trust, not just systems.</span>
              </h1>
              <p className="mt-6 max-w-xl text-[0.95rem] font-light leading-relaxed text-mist-300">
                {about.intro}
              </p>
              <p className="mt-4 max-w-xl text-[0.9rem] font-light leading-relaxed text-mist-400">
                {about.intro2}
              </p>

              <Link href="/contact-us" className="btn btn-primary mt-8">
                Talk to us
                <Icon name="arrow-right" size={15} />
              </Link>
            </div>

            <Reveal className="flex flex-col gap-3">
              <div className="overflow-hidden rounded-lg border border-line">
                <ThemedImage
                  src="/images/about-team.webp"
                  alt="Sam Infosystems team collaborating in their Mumbai office"
                  width={1408}
                  height={960}
                  priority
                  sizes="(min-width: 1024px) 42vw, 92vw"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-line bg-line">
                {[
                  { v: "2000", l: "Founded" },
                  { v: "Mumbai", l: "Head office" },
                  { v: "22", l: "Offerings" },
                ].map((s) => (
                  <div key={s.l} className="bg-ink-900 px-3 py-3.5 sm:px-4">
                    <p className="font-display text-[0.95rem] font-normal text-mist-50 sm:text-[1rem]">
                      {s.v}
                    </p>
                    <p className="mt-0.5 text-[0.58rem] uppercase tracking-[0.1em] text-mist-500 sm:text-[0.62rem] sm:tracking-[0.12em]">
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
      <section className="border-b border-line bg-ink-900">
        <div className="container-x py-14 lg:py-16">
          <div className="grid gap-3 lg:grid-cols-2">
            {[
              { icon: "compass", label: "Mission", body: about.mission },
              { icon: "globe-shield", label: "Vision", body: about.vision },
            ].map((c, i) => (
              <Reveal
                key={c.label}
                delay={i * 90}
                className="rounded-lg border border-line bg-ink-950 p-6 sm:p-7"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded border border-line text-brand-300">
                  <Icon name={c.icon} size={16} />
                </span>
                <h2 className="mt-4 font-display text-[1.2rem] font-normal tracking-[-0.02em] text-mist-50">
                  {c.label}
                </h2>
                <p className="mt-2.5 text-[0.9rem] font-light leading-relaxed text-mist-300">
                  {c.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* values */}
      <section className="border-b border-line">
        <div className="container-x py-14 lg:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="What we stand for"
              title="Core values that outlast every technology cycle"
              blurb="Four commitments that shape how we scope work, price it, and stay on the phone long after go-live."
            />
          </Reveal>
          <div className="mt-9 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line min-[420px]:grid-cols-2 lg:grid-cols-4">
            {about.values.map((v, i) => (
              <Reveal key={v.title} delay={i * 70} className="bg-ink-950 p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded border border-line text-brand-300">
                  <Icon name={v.icon} size={15} />
                </span>
                <h3 className="mt-3.5 font-display text-[0.9rem] font-normal text-mist-50">
                  {v.title}
                </h3>
                <p className="mt-1.5 text-[0.78rem] font-light leading-relaxed text-mist-500">
                  {v.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* timeline */}
      <section className="border-b border-line bg-ink-900">
        <div className="container-x py-14 lg:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Our journey"
              title="From SAM INFOTECH to Sam Infosystems"
              blurb="A steady accumulation of capability, and of clients who stayed."
            />
          </Reveal>
          <ol className="mt-9 border-l border-line">
            {timeline.map((t, i) => (
              <Reveal as="li" key={t.year} delay={i * 60} className="relative pb-8 pl-6 last:pb-0">
                <span
                  className="absolute -left-[3px] top-1.5 h-1.5 w-1.5 rounded-full bg-brand-300"
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                  <span className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-brand-300">
                    {t.year}
                  </span>
                  <h3 className="font-display text-[0.98rem] font-normal text-mist-50">{t.title}</h3>
                </div>
                <p className="mt-1.5 max-w-2xl text-[0.86rem] font-light leading-relaxed text-mist-400">
                  {t.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* quote */}
      <section>
        <div className="container-x py-14 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14">
            <div>
              <Reveal>
                <SectionHeading
                  eyebrow="Get a free quote"
                  title="Please fill this form and we'll get back to you as soon as possible!"
                  blurb="Prefer to talk? Call us during business hours. A real engineer answers."
                />
              </Reveal>
              <div className="mt-7 flex flex-col gap-2.5">
                <a href={company.phoneHref} className="card flex items-center gap-3 rounded-lg p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded border border-line text-brand-300">
                    <Icon name="phone" size={15} />
                  </span>
                  <span>
                    <span className="block text-[0.62rem] uppercase tracking-[0.14em] text-mist-500">
                      Phone
                    </span>
                    <span className="font-display text-[0.86rem] font-normal text-mist-100">
                      {company.phone}
                    </span>
                  </span>
                </a>
                <a
                  href={`mailto:${company.emailGeneral}`}
                  className="card flex items-center gap-3 rounded-lg p-4"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded border border-line text-brand-300">
                    <Icon name="mail" size={15} />
                  </span>
                  <span>
                    <span className="block text-[0.62rem] uppercase tracking-[0.14em] text-mist-500">
                      General information
                    </span>
                    <span className="font-display text-[0.86rem] font-normal text-mist-100">
                      {company.emailGeneral}
                    </span>
                  </span>
                </a>
              </div>
            </div>
            <Reveal delay={90} className="rounded-lg border border-line bg-ink-900 p-6 sm:p-7">
              <QuoteForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
