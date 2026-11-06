import Link from "next/link";
import { Icon } from "./Icon";

export function SectionHeading({
  eyebrow,
  title,
  blurb,
  align = "left",
  action,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  blurb?: string;
  align?: "left" | "center";
  action?: { label: string; href: string };
}) {
  return (
    <div
      className={`flex flex-col gap-5 ${
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <div className={align === "center" ? "max-w-2xl" : "max-w-xl"}>
        {eyebrow && (
          <p className="eyebrow">
            <span className="h-px w-5 bg-brand-400" aria-hidden="true" />
            {eyebrow}
          </p>
        )}
        <h2 className="mt-3.5 font-display text-[1.6rem] font-light leading-[1.15] tracking-[-0.03em] text-mist-50 sm:text-[2rem] lg:text-[2.25rem]">
          {title}
        </h2>
        {blurb && (
          <p className="mt-3.5 max-w-lg text-[0.92rem] font-light leading-relaxed text-mist-400">
            {blurb}
          </p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-1.5 self-start text-[0.82rem] font-normal text-mist-300 transition-colors hover:text-brand-300 md:self-auto"
        >
          {action.label}
          <Icon
            name="arrow-right"
            size={14}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </div>
  );
}

export function Breadcrumbs({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-[0.72rem] font-light text-mist-500">
        <li>
          <Link href="/" className="transition-colors hover:text-mist-200">
            Home
          </Link>
        </li>
        {trail.map((t, i) => (
          <li key={t.label} className="flex items-center gap-1.5">
            <span aria-hidden="true">/</span>
            {t.href && i < trail.length - 1 ? (
              <Link href={t.href} className="transition-colors hover:text-mist-200">
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

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded border border-line-strong px-2.5 py-1 text-[0.64rem] font-medium uppercase tracking-[0.14em] text-mist-300">
      {children}
    </span>
  );
}
