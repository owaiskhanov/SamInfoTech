import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { Breadcrumbs, SectionHeading } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us — Mumbai Office & Sales",
  description:
    "Reach Sam Infosystems: 101-102 Neminath Square, Goregaon West, Mumbai 400104. Call +91-9821534588 or email info@saminfosystems.com / sales@saminfosystems.com.",
  alternates: { canonical: "/contact-us" },
  openGraph: {
    title: "Contact Sam Infosystems — Mumbai",
    description:
      "Office in Goregaon West, Mumbai. Call +91-9821534588 or email info@saminfosystems.com.",
    images: ["/social-share.jpg"],
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${company.url}/#localbusiness`,
  name: company.legalName,
  image: `${company.url}/social-share.jpg`,
  url: `${company.url}/contact-us`,
  telephone: company.phone,
  email: company.emailGeneral,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${company.address.line1}, ${company.address.line2}`,
    addressLocality: "Mumbai",
    addressRegion: company.address.region,
    postalCode: company.address.postalCode,
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 19.1663, longitude: 72.8526 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:30",
      closes: "18:30",
    },
  ],
  areaServed: ["Mumbai", "Maharashtra", "India"],
  parentOrganization: { "@id": `${company.url}/#organization` },
};

const channels = [
  {
    icon: "phone",
    label: "Phone number",
    value: company.phone,
    href: company.phoneHref,
    note: "Mon–Sat, 9:30 to 18:30 IST",
  },
  {
    icon: "mail",
    label: "General information",
    value: company.emailGeneral,
    href: `mailto:${company.emailGeneral}`,
    note: "Product, support and partnership questions",
  },
  {
    icon: "arrow-up-right",
    label: "Sales inquiries",
    value: company.emailSales,
    href: `mailto:${company.emailSales}`,
    note: "Quotes, licensing and procurement",
  },
  {
    icon: "pin",
    label: "Office address",
    value: "Neminath Square, Goregaon West",
    href: `https://www.google.com/maps/search/?api=1&query=${company.address.mapQuery}`,
    note: "101-102, Ram Mandir Signal, Mumbai 400104",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/[0.07] pb-16 pt-10 lg:pb-20 lg:pt-12">
        <div className="orb -left-28 -top-24 h-96 w-96 bg-brand-500/15" aria-hidden="true" />
        <div className="absolute inset-0 grid-lines opacity-30" aria-hidden="true" />
        <div className="container-x relative">
          <Breadcrumbs trail={[{ label: "Contact Us" }]} />
          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.02fr] lg:items-start">
            <div>
              <p className="eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                Contact Us
              </p>
              <h1 className="mt-4 font-display text-[clamp(2rem,4.6vw,3.2rem)] font-bold leading-[1.05] tracking-[-0.035em] text-white">
                Reach out to us —{" "}
                <span className="text-gradient">we answer like engineers.</span>
              </h1>
              <p className="mt-5 max-w-lg text-[1rem] leading-relaxed text-mist-300">
                Call, email or drop by the Goregaon West office. Every enquiry is read by a person
                who can actually scope the work.
              </p>

              <div className="mt-9 grid gap-3 sm:grid-cols-2">
                {channels.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    className="group flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 transition-all hover:border-brand-400/40 hover:bg-white/[0.04]"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-brand-400/25 bg-brand-400/10 text-brand-300">
                      <Icon name={c.icon} size={16} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-mist-500">
                        {c.label}
                      </span>
                      <span className="mt-1 block break-words font-display text-[0.88rem] font-semibold text-white">
                        {c.value}
                      </span>
                      <span className="mt-1 block text-[0.75rem] leading-snug text-mist-500">
                        {c.note}
                      </span>
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-white/[0.08] bg-ink-900/60 p-5">
                <p className="font-display text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-mist-500">
                  Office address
                </p>
                <address className="mt-2 text-[0.9rem] leading-relaxed not-italic text-mist-300">
                  101-102, Neminath Square, Ram Mandir Signal,
                  <br />
                  Swami Vivekananda Rd, Goregaon West,
                  <br />
                  Mumbai, Maharashtra 400104, India.
                </address>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${company.address.mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 font-display text-[0.78rem] font-semibold text-brand-300 transition-colors hover:text-brand-200"
                >
                  Open in Google Maps
                  <Icon name="arrow-up-right" size={13} />
                </a>
              </div>
            </div>

            {/* form card */}
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-ink-950/70 p-7 sm:p-9">
              <div className="orb -right-20 -top-24 h-56 w-56 bg-azure-600/20" aria-hidden="true" />
              <div className="relative">
                <p className="eyebrow">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                  Get a free quote
                </p>
                <h2 className="mt-3 font-display text-[1.4rem] font-semibold leading-snug text-white">
                  Please fill this form and we'll get back to you as soon as possible!
                </h2>
                <div className="mt-6">
                  <QuoteForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* map + globe */}
      <section className="py-16 lg:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Find us"
            title="Goregaon West, Mumbai"
            blurb="A short walk from Ram Mandir signal on Swami Vivekananda Road — easy to reach from the Western Express Highway and Goregaon station."
            action={{ label: "Get directions", href: `https://www.google.com/maps/search/?api=1&query=${company.address.mapQuery}` }}
          />
          <div className="mt-9 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <div className="overflow-hidden rounded-[1.25rem] border border-white/10">
              <iframe
                title="Map of Sam Infosystems office in Goregaon West, Mumbai"
                src={`https://www.google.com/maps?q=${company.address.mapQuery}&output=embed`}
                width="100%"
                height="380"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[340px] w-full border-0 grayscale-[35%] contrast-[1.05] sm:h-[380px]"
              />
            </div>
            <div className="relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-ink-900/60">
              <Image
                src="/images/contact-globe.webp"
                alt="Network arc connecting Mumbai to international locations"
                width={1400}
                height={1000}
                sizes="(min-width: 1024px) 34vw, 92vw"
                className="h-full min-h-[220px] w-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
              <div className="absolute inset-x-5 bottom-5">
                <p className="font-display text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-brand-300">
                  Serving clients from
                </p>
                <p className="mt-1.5 font-display text-[1.1rem] font-semibold text-white">
                  Mumbai · Maharashtra · India
                </p>
                <p className="mt-1 text-[0.78rem] text-mist-400">
                  Remote delivery and support nationwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* quick links */}
      <section className="border-t border-white/[0.07] bg-ink-900/40 py-16">
        <div className="container-x">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: "cloud", label: "Our products", href: "/products", text: "11 platforms we license and support" },
              { icon: "shield-check", label: "Our security services", href: "/security", text: "MDM, endpoint, firewall, VAPT" },
              { icon: "compass", label: "Our solutions", href: "/solutions", text: "Cloud, migration, managed, training" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group card-hover rounded-xl border border-white/[0.08] bg-ink-950/50 p-5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-400/25 bg-brand-400/10 text-brand-300">
                  <Icon name={l.icon} size={17} />
                </span>
                <h3 className="mt-4 font-display text-[0.92rem] font-semibold text-white">{l.label}</h3>
                <p className="mt-1 text-[0.78rem] text-mist-500">{l.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
    </>
  );
}
