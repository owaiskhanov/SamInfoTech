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
    <section className="border-b border-line">
      <div className="container-x flex min-h-[62vh] flex-col justify-center py-16">
        <p className="eyebrow">
          <span className="h-px w-5 bg-brand-400" aria-hidden="true" />
          404: off the map
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-[clamp(1.9rem,4.4vw,3rem)] font-light leading-[1.05] tracking-[-0.035em] text-mist-50">
          This page has moved. <span className="text-brand-300">Your data hasn&apos;t.</span>
        </h1>
        <p className="mt-5 max-w-md text-[0.92rem] font-light leading-relaxed text-mist-400">
          The link may be out of date. Jump back to the homepage, browse what we deliver, or call us
          on {company.phone}.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link href="/" className="btn btn-primary">
            Back to home
            <Icon name="arrow-right" size={15} />
          </Link>
          <Link
            href="/products"
            className="group inline-flex items-center gap-1.5 text-[0.85rem] text-mist-300 transition-colors hover:text-mist-50"
          >
            Browse products
            <Icon name="arrow-right" size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/contact-us"
            className="group inline-flex items-center gap-1.5 text-[0.85rem] text-mist-300 transition-colors hover:text-mist-50"
          >
            Contact us
            <Icon name="arrow-right" size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
