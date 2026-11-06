import Link from "next/link";
import { Icon } from "./Icon";

export function SectionHeading({
  eyebrow,
  title,
  blurb,
  align = "left",
  action,
  id,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  blurb?: string;
  align?: "left" | "center";
  action?: { label: string; href: string };
  id?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-6 ${
        align === "center"
          ? "items-center text-center"
          : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <div className={align === "center" ? "max-w-3xl" : "max-w-2xl"}>
        {eyebrow && (
          <p className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
            {eyebrow}
          </p>
        )}
        <h2
          id={id}
          className="mt-3.5 font-display text-[1.75rem] font-semibold leading-[1.15] text-white sm:text-[2.15rem] lg:text-[2.5rem]"
        >
          {title}
        </h2>
        {blurb && <p className="mt-4 text-[0.98rem] leading-relaxed text-mist-400">{blurb}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/12 px-4 py-2.5 font-display text-[0.8rem] font-semibold text-mist-200 transition-all hover:border-brand-400/50 hover:text-white"
        >
          {action.label}
          <Icon
            name="arrow-right"
            size={15}
            className="text-brand-300 transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </div>
  );
}

export function Breadcrumbs({
  trail,
}: {
  trail: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 font-display text-[0.72rem] uppercase tracking-[0.16em] text-mist-500">
        <li>
          <Link href="/" className="transition-colors hover:text-brand-300">
            Home
          </Link>
        </li>
        {trail.map((t, i) => (
          <li key={t.label} className="flex items-center gap-2">
            <span className="text-brand-400/60" aria-hidden="true">
              /
            </span>
            {t.href && i < trail.length - 1 ? (
              <Link href={t.href} className="transition-colors hover:text-brand-300">
                {t.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-mist-300">
                {t.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Badge({ children, tone = "brand" }: { children: React.ReactNode; tone?: "brand" | "muted" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-display text-[0.64rem] font-semibold uppercase tracking-[0.18em] ${
        tone === "brand"
          ? "border border-brand-400/30 bg-brand-400/10 text-brand-200"
          : "border border-white/10 bg-white/[0.03] text-mist-400"
      }`}
    >
      {children}
    </span>
  );
}

export function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-display text-[2rem] font-semibold leading-none text-white lg:text-[2.4rem]">
        {value}
      </span>
      <span className="mt-2 text-[0.78rem] leading-snug text-mist-500">{label}</span>
    </div>
  );
}
