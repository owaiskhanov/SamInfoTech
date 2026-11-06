import { brandMarks, handmadeMarks } from "@/lib/brand-logo";
import type { BrandName } from "@/lib/brand-logo";
import { brandHex } from "@/lib/brand-logo";

/**
 * A brand mark in its own colour, rendered from CSS custom properties.
 *
 * The colour comes from `--mark-*` on :root, which the theme swaps. That means
 * a brand logo needs no client component, no hydration and no JavaScript to be
 * correct in both themes: it is one static SVG.
 */
const marks: Partial<
  Record<BrandName, { title: string; hex: string; path?: string; body?: string }>
> = {
  azure: brandMarks.microsoftazure,
  aws: brandMarks.amazonwebservices,
  microsoft365: handmadeMarks.microsoft365,
  adobe: brandMarks.adobecreativecloud,
  coreldraw: brandMarks.coreldraw,
  sophos: handmadeMarks.sophos,
  fortinet: brandMarks.fortinet,
  autocad: brandMarks.autocad,
  googleworkspace: handmadeMarks.googleworkspace,
  tally: handmadeMarks.tally,
  hr: handmadeMarks.hr,
};

export function ThemeBrandMarkBase({
  name,
  size,
  className = "",
}: {
  name: BrandName;
  size: number;
  className?: string;
}) {
  const mark = marks[name];
  if (!mark) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      aria-label={`${mark.title} logo`}
      className={className}
      style={{ color: `var(--mark-${name}, ${brandHex(name)})` }}
      fill="currentColor"
    >
      {mark.path ? <path d={mark.path} /> : null}
      {mark.body ? <g dangerouslySetInnerHTML={{ __html: mark.body }} /> : null}
    </svg>
  );
}
