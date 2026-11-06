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
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-ink-950">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-60" aria-hidden="true" />
      <div
        className="orb -left-24 top-0 h-72 w-72 bg-brand-500/15"
        aria-hidden="true"
      />
      <div className="container-x relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-10">
          {/* brand + contact */}
          <div>
            <Link href="/" className="flex items-center gap-3" aria-label="Sam Infosystems — Home">
              <LogoMark size={44} gradientId="footer-logo" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-[1.05rem] font-bold text-white">
                  SAM <span className="text-gradient">INFOSYSTEMS</span>
                </span>
                <span className="mt-1 font-display text-[0.56rem] font-medium uppercase tracking-[0.28em] text-mist-500">
                  Pvt Ltd · Since 2000
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-[0.9rem] leading-relaxed text-mist-400">
              {company.shortName} is a comprehensive IT solutions provider focused on software,
              cloud and security — architecting, deploying and supporting enterprise technology
              since 2000.
            </p>

            <div className="mt-6 space-y-3 text-[0.88rem]">
              <a
                href={company.phoneHref}
                className="flex items-center gap-3 text-mist-300 transition-colors hover:text-brand-300"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand-400/25 bg-brand-400/10 text-brand-300">
                  <Icon name="phone" size={14} />
                </span>
                {company.phone}
              </a>
              <a
                href={`mailto:${company.emailGeneral}`}
                className="flex items-center gap-3 text-mist-300 transition-colors hover:text-brand-300"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand-400/25 bg-brand-400/10 text-brand-300">
                  <Icon name="mail" size={14} />
                </span>
                {company.emailGeneral}
              </a>
              <a
                href={`mailto:${company.emailSales}`}
                className="flex items-center gap-3 text-mist-300 transition-colors hover:text-brand-300"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand-400/25 bg-brand-400/10 text-brand-300">
                  <Icon name="arrow-up-right" size={14} />
                </span>
                {company.emailSales}
              </a>
            </div>
          </div>

          <FooterCol title="Our Products" links={products.map((p) => ({ label: p.name, href: `/portfolio/${p.slug}` }))} />
          <FooterCol
            title="Our Solutions"
            links={solutions.map((p) => ({ label: p.name, href: `/portfolio/${p.slug}` }))}
          />
          <div>
            <FooterCol
              title="Security"
              links={security.map((p) => ({ label: p.name, href: `/portfolio/${p.slug}` }))}
            />
            <h3 className="mt-8 font-display text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white">
              Contact Us
            </h3>
            <address className="mt-4 not-italic text-[0.86rem] leading-relaxed text-mist-400">
              101-102, Neminath Square,
              <br />
              Ram Mandir Signal, Swami Vivekananda Rd,
              <br />
              Goregaon West, Mumbai,
              <br />
              Maharashtra 400104, India.
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/[0.07] pt-7 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.8rem] text-mist-500">
            <span>
              Copyright © {new Date().getFullYear()} {company.shortName}. All rights reserved.
            </span>
            <span className="hidden h-3 w-px bg-white/10 md:block" />
            <Link href="/about-us" className="transition-colors hover:text-brand-300">
              About
            </Link>
            <Link href="/contact-us" className="transition-colors hover:text-brand-300">
              Contact
            </Link>
            <Link href="/sitemap.xml" className="transition-colors hover:text-brand-300">
              Sitemap
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-display text-[0.66rem] uppercase tracking-[0.2em] text-mist-500">
              Get Social
            </span>
            {company.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-mist-300 transition-all hover:-translate-y-0.5 hover:border-brand-400/50 hover:text-brand-300"
              >
                <Icon name={s.icon} size={15} />
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
      <h3 className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="group inline-flex items-start gap-1.5 text-[0.86rem] leading-snug text-mist-400 transition-colors hover:text-brand-300"
            >
              <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-brand-400/40 transition-colors group-hover:bg-brand-300" />
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
