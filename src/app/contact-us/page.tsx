import type { Metadata } from "next";
import { ThemedImage } from "@/components/ThemedImage";
import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { Reveal } from "@/components/Reveal";
import { Breadcrumbs, SectionHeading } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us | Mumbai Office & Sales",
  description:
    "Reach Sam Infosystems: 101-102 Neminath Square, Goregaon West, Mumbai 400104. Call +91-9821534588 or email info@saminfosystems.com / sales@saminfosystems.com.",
  alternates: { canonical: "/contact-us" },
  openGraph: {
    title: "Contact Sam Infosystems | Mumbai",
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
      <section className="border-b border-line">
        <div className="container-x pb-14 pt-8 lg:pb-16 lg:pt-10">
          <Breadcrumbs trail={[{ label: "Contact Us" }]} />
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-14">
            <Reveal>
              <p className="eyebrow">
                <span className="h-px w-5 bg-brand-400" aria-hidden="true" />
                Contact Us
              </p>
              <h1 className="mt-4 font-display text-[clamp(1.95rem,4.4vw,3.1rem)] font-light leading-[1.05] tracking-[-0.035em] text-mist-50">
                Reach out to us.{" "}
                <span className="text-brand-300">we answer like engineers.</span>
              </h1>
              <p className="mt-5 max-w-lg text-[0.95rem] font-light leading-relaxed text-mist-400">
                Call, email or drop by the Goregaon West office. Every enquiry is read by a person
                who can actually scope the work.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
                {channels.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    className="card group flex items-start gap-3 rounded-lg p-4"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded border border-line text-brand-300">
                      <Icon name={c.icon} size={14} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.62rem] font-medium uppercase tracking-[0.14em] text-mist-500">
                        {c.label}
                      </span>
                      <span className="mt-1 block break-words font-display text-[0.85rem] font-normal text-mist-100">
                        {c.value}
                      </span>
                      <span className="mt-1 block text-[0.72rem] font-light leading-snug text-mist-500">
                        {c.note}
                      </span>
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-3 rounded-lg border border-line bg-ink-900 p-5">
                <p className="text-[0.62rem] font-medium uppercase tracking-[0.14em] text-mist-500">
                  Office address
                </p>
                <address className="mt-2 text-[0.86rem] font-light leading-relaxed not-italic text-mist-300">
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
                  className="mt-3 inline-flex items-center gap-1.5 text-[0.78rem] font-normal text-brand-300 transition-colors hover:text-brand-200"
                >
                  Open in Google Maps
                  <Icon name="arrow-up-right" size={13} />
                </a>
              </div>
            </Reveal>

            {/* form card */}
            <Reveal delay={110} className="rounded-lg border border-line bg-ink-900 p-6 sm:p-7">
              <p className="eyebrow">
                <span className="h-px w-5 bg-brand-400" aria-hidden="true" />
                Get a free quote
              </p>
              <h2 className="mt-3 font-display text-[1.2rem] font-light leading-snug tracking-[-0.02em] text-mist-50">
                Please fill this form and we'll get back to you as soon as possible!
              </h2>
              <div className="mt-5">
                <QuoteForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* map + globe */}
      <section className="border-b border-line">
        <div className="container-x py-14 lg:py-16">
          <SectionHeading
            eyebrow="Find us"
            title="Goregaon West, Mumbai"
            blurb="A short walk from Ram Mandir signal on Swami Vivekananda Road, easy to reach from the Western Express Highway and Goregaon station."
            action={{ label: "Get directions", href: `https://www.google.com/maps/search/?api=1&query=${company.address.mapQuery}` }}
          />
          <Reveal className="mt-8 grid gap-3 lg:grid-cols-[1.4fr_1fr]">
            <div className="overflow-hidden rounded-lg border border-line">
              {/* The embed is always a light map. In dark mode it is inverted so it
                  does not punch a white hole in the page; in light mode it is left
                  alone. `invert`/`hue-rotate` on a map is the usual, readable recipe. */}
              <iframe
                title="Map of Sam Infosystems office in Goregaon West, Mumbai"
                src={`https://www.google.com/maps?q=${company.address.mapQuery}&output=embed`}
                width="100%"
                height="380"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="map-embed block h-[320px] w-full border-0 sm:h-[360px]"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg border border-line bg-ink-900">
              <ThemedImage
                src="/images/contact-globe.webp"
                alt="Network arc connecting Mumbai to international locations"
                width={1400}
                height={1000}
                sizes="(min-width: 1024px) 34vw, 92vw"
                className="h-full min-h-[220px] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 border-t border-line bg-ink-950/95 px-4 py-3">
                <p className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-brand-300">
                  Serving clients from
                </p>
                <p className="mt-1 font-display text-[1rem] font-normal text-mist-50">
                  Mumbai · Maharashtra · India
                </p>
                <p className="mt-0.5 text-[0.74rem] font-light text-mist-500">
                  Remote delivery and support nationwide.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* quick links */}
      <section className="bg-ink-900">
        <div className="container-x py-12">
          <div className="stagger grid gap-3 sm:grid-cols-3">
            {[
              { icon: "cloud", label: "Our products", href: "/products", text: "11 platforms we license and support" },
              { icon: "shield-check", label: "Our security services", href: "/security", text: "MDM, endpoint, firewall, VAPT" },
              { icon: "compass", label: "Our solutions", href: "/solutions", text: "Cloud, migration, managed, training" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="card group rounded-lg p-5"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded border border-line text-brand-300">
                  <Icon name={l.icon} size={15} />
                </span>
                <h3 className="mt-3.5 font-display text-[0.88rem] font-normal text-mist-50">
                  {l.label}
                </h3>
                <p className="mt-1 text-[0.74rem] font-light text-mist-500">{l.text}</p>
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
