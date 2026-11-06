import Link from "next/link";
import { Icon } from "@/components/Icon";
import { company } from "@/lib/site";

export const metadata = {
  title: "Page not found",
  description: "The page you're looking for has moved or no longer exists.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden py-20">
      <div className="absolute inset-0 grid-lines opacity-25" aria-hidden="true" />
      <div className="orb left-1/4 top-10 h-80 w-80 bg-brand-500/15" aria-hidden="true" />
      <div className="container-x relative text-center">
        <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-brand-300">
          404 — Off the map
        </p>
        <h1 className="mx-auto mt-5 max-w-2xl font-display text-[clamp(1.9rem,4.5vw,3rem)] font-bold leading-[1.06] tracking-[-0.035em] text-white">
          This page has moved — <span className="text-gradient">your data hasn&apos;t.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-[0.95rem] leading-relaxed text-mist-400">
          The link may be out of date. Jump back to the homepage, browse what we deliver, or call us
          on {company.phone}.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            Back to home
            <Icon name="arrow-right" size={16} />
          </Link>
          <Link href="/products" className="btn btn-ghost">
            Browse products
          </Link>
          <Link href="/contact-us" className="btn btn-ghost">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
