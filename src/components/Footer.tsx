import Link from "next/link";
import { byCategory, company } from "@/lib/site";
import { Icon } from "./Icon";
import { LogoMark } from "./Logo";
import { BackToTop } from "./BackToTop";
import { FooterMarquee } from "./FooterMarquee";
import { FooterStatus } from "./FooterStatus";
import { FooterQuote } from "./FooterQuote";
import { FooterColumns, type FooterGroup } from "./FooterColumns";
import { ScrollVelocityRail } from "./ScrollVelocityRail";

/**
 * The footer is the last screen of the site, so it earns its weight: a live
 * status strip, the platform band, browsing navigation, a rotating statement,
 * and a closing line. Every moving part degrades to something still and
 * readable (see each component), and the whole thing is one flat surface.
 */
export function Footer() {
  const products = byCategory("products");
  const solutions = byCategory("solutions");
  const security = byCategory("security");

  const groups: FooterGroup[] = [
    {
      title: "Products",
      href: "/products",
      links: products.map((p) => ({
        label: p.name,
        href: `/portfolio/${p.slug}`,
        detail: p.highlights[0],
      })),
    },
    {
      title: "Solutions",
      href: "/solutions",
      links: solutions.map((p) => ({
        label: p.name,
        href: `/portfolio/${p.slug}`,
        detail: p.highlights[0],
      })),
    },
    {
      title: "Security",
      href: "/security",
      links: security.map((p) => ({
        label: p.name,
        href: `/portfolio/${p.slug}`,
        detail: p.highlights[0],
      })),
    },
  ];

  const rail = [
    "Cloud solutions",
    "Migration",
    "Managed services",
    "Security service management",
    "IT consultancy",
    "IT training",
    "Endpoint security",
    "Firewall",
    "VAPT",
    "Azure",
    "AWS",
    "Microsoft 365",
    "Google Workspace",
  ];

  return (
    <footer className="border-t border-line bg-ink-950">
      {/* signature wordmark band, sits on the surface like a watermark */}
      <div aria-hidden="true" className="overflow-hidden border-b border-line">
        <div className="container-x flex items-end justify-between gap-6 pt-10">
          <p className="select-none font-display text-[clamp(2rem,7vw,4.4rem)] font-light leading-[0.9] tracking-[-0.045em] text-mist-50">
            Sam Infosystems
          </p>
          <span className="mb-1 hidden shrink-0 items-center gap-2 text-[0.62rem] uppercase tracking-[0.2em] text-mist-600 sm:flex">
            <span className="h-1 w-1 rounded-full bg-brand-400" />
            Mumbai · India
          </span>
        </div>
        <div className="container-x pb-6">
          <p className="mt-2 text-[0.68rem] uppercase tracking-[0.24em] text-mist-500">
            IT solutions · Cloud · Security · Since 2000
          </p>
        </div>
      </div>

      <div className="container-x">
        <FooterStatus />
      </div>

      {/* platform band: the eleven things we actually license and support */}
      <FooterMarquee />

      <div className="container-x">
        <div className="grid gap-6 pt-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          {/* identity */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2.5"
              aria-label="Sam Infosystems, Home"
            >
              <LogoMark size={30} className="text-brand-300" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-[0.95rem] font-medium tracking-[-0.02em] text-mist-50">
                  Sam Infosystems
                </span>
                <span className="mt-1 text-[0.6rem] uppercase tracking-[0.18em] text-mist-500">
                  Pvt Ltd · Since 2000
                </span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-[0.84rem] font-light leading-relaxed text-mist-400">
              A comprehensive IT solutions provider focused on software, cloud and security,
              architecting, deploying and supporting enterprise technology since 2000.
            </p>

            <address className="mt-4 text-[0.8rem] font-light leading-relaxed not-italic text-mist-500">
              {company.address.line1}, {company.address.line2},
              <br />
              {company.address.locality}, {company.address.region}{" "}
              {company.address.postalCode}, {company.address.country}.
            </address>

            <div className="mt-4 flex flex-col gap-1.5 text-[0.82rem] font-light">
              <a
                href={company.phoneHref}
                className="inline-flex w-fit items-center gap-2 text-mist-300 transition-colors hover:text-brand-300"
              >
                <Icon name="phone" size={13} />
                {company.phone}
              </a>
              <a
                href={`mailto:${company.emailGeneral}`}
                className="inline-flex w-fit items-center gap-2 text-mist-300 transition-colors hover:text-brand-300"
              >
                <Icon name="mail" size={13} />
                {company.emailGeneral}
              </a>
              <a
                href={`mailto:${company.emailSales}`}
                className="inline-flex w-fit items-center gap-2 text-mist-300 transition-colors hover:text-brand-300"
              >
                <Icon name="arrow-up-right" size={13} />
                {company.emailSales}
              </a>
            </div>

            <div className="mt-5 flex items-center gap-2">
              <span className="mr-0.5 text-[0.62rem] uppercase tracking-[0.16em] text-mist-600">
                Follow
              </span>
              {company.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded border border-line text-mist-400 transition-colors hover:border-line-strong hover:text-brand-300"
                >
                  <Icon name={s.icon} size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* browsable navigation */}
          <FooterColumns groups={groups} />
        </div>

        {/* rotating statement */}
        <FooterQuote />
      </div>

      {/* scroll-reactive rail */}
      <ScrollVelocityRail
        text={`What we deliver: ${rail.join(", ")}.`}
        items={rail}
      />

      {/* closing bar */}
      <div className="container-x">
        <div className="flex flex-col gap-4 py-5 text-[0.75rem] font-light text-mist-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <Link href="/about-us" className="transition-colors hover:text-mist-200">
              About
            </Link>
            <Link href="/products" className="transition-colors hover:text-mist-200">
              Products
            </Link>
            <Link href="/contact-us" className="transition-colors hover:text-mist-200">
              Contact
            </Link>
            <Link href="/sitemap.xml" className="transition-colors hover:text-mist-200">
              Sitemap
            </Link>
          </div>
        </div>
        <p className="border-t border-line py-4 text-[0.68rem] font-light leading-relaxed text-mist-600">
          Sam Infosystems Pvt Ltd, formerly SAM INFOTECH. Registered office in Goregaon West,
          Mumbai. Delivered, managed and supported from India since 2000.
        </p>
      </div>

      <BackToTop />
    </footer>
  );
}
