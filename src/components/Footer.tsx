import Link from "next/link";
import { byCategory, company } from "@/lib/site";
import { Icon } from "./Icon";
import { LogoMark } from "./Logo";
import { BackToTop } from "./BackToTop";

export function Footer() {
  const products = byCategory("products");
  const solutions = byCategory("solutions");
  const security = byCategory("security");

  return (
    <footer className="border-t border-line bg-ink-950">
      <div className="container-x py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-8">
          {/* brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Sam Infosystems, Home">
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

            <p className="mt-5 max-w-xs text-[0.84rem] font-light leading-relaxed text-mist-400">
              A comprehensive IT solutions provider focused on software, cloud and security,
              architecting, deploying and supporting enterprise technology since 2000.
            </p>

            <address className="mt-5 text-[0.82rem] font-light leading-relaxed not-italic text-mist-500">
              101-102, Neminath Square, Ram Mandir Signal,
              <br />
              Swami Vivekananda Rd, Goregaon West,
              <br />
              Mumbai, Maharashtra 400104, India.
            </address>

            <div className="mt-5 flex flex-col gap-1.5 text-[0.82rem] font-light">
              <a
                href={company.phoneHref}
                className="inline-flex items-center gap-2 text-mist-300 transition-colors hover:text-brand-300"
              >
                <Icon name="phone" size={13} />
                {company.phone}
              </a>
              <a
                href={`mailto:${company.emailGeneral}`}
                className="inline-flex items-center gap-2 text-mist-300 transition-colors hover:text-brand-300"
              >
                <Icon name="mail" size={13} />
                {company.emailGeneral}
              </a>
              <a
                href={`mailto:${company.emailSales}`}
                className="inline-flex items-center gap-2 text-mist-300 transition-colors hover:text-brand-300"
              >
                <Icon name="arrow-up-right" size={13} />
                {company.emailSales}
              </a>
            </div>
          </div>

          <FooterCol
            title="Products"
            links={products.map((p) => ({ label: p.name, href: `/portfolio/${p.slug}` }))}
          />
          <FooterCol
            title="Solutions"
            links={solutions.map((p) => ({ label: p.name, href: `/portfolio/${p.slug}` }))}
          />
          <FooterCol
            title="Security"
            links={security.map((p) => ({ label: p.name, href: `/portfolio/${p.slug}` }))}
          />
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.76rem] font-light text-mist-500">
            <span>
              © {new Date().getFullYear()} {company.shortName}. All rights reserved.
            </span>
            <Link href="/about-us" className="transition-colors hover:text-mist-200">
              About
            </Link>
            <Link href="/contact-us" className="transition-colors hover:text-mist-200">
              Contact
            </Link>
            <Link href="/sitemap.xml" className="transition-colors hover:text-mist-200">
              Sitemap
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="mr-1 text-[0.66rem] uppercase tracking-[0.16em] text-mist-600">
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
      </div>
      <BackToTop />
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-mist-400">
        {title}
      </h3>
      <ul className="mt-4 space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-[0.82rem] font-light leading-snug text-mist-400 transition-colors hover:text-mist-50"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
