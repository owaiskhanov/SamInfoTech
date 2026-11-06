import { brandMarks, handmadeMarks } from "@/lib/brand-marks";

export type BrandName =
  | "azure"
  | "aws"
  | "microsoft365"
  | "adobe"
  | "tally"
  | "coreldraw"
  | "sophos"
  | "fortinet"
  | "autocad"
  | "googleworkspace"
  | "hr";

/** Official Simple Icons marks, keyed by the product slugs used in site.ts. */
type Mark = { title: string; hex: string; path?: string; body?: string };

const official: Partial<Record<BrandName, Mark>> = {
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

export const hasBrandMark = (name: string): name is BrandName => name in official;

/**
 * Some official brand colours are designed for light backgrounds and would
 * disappear on our dark UI (AWS navy #232F3E, CorelDRAW black #000000).
 * On dark surfaces we substitute the nearest brand-consistent, legible tone.
 */
const darkSurface: Partial<Record<BrandName, string>> = {
  aws: "#FF9900",
  coreldraw: "#F2F4F7",
};

export const brandHex = (name: BrandName) =>
  darkSurface[name] ?? official[name]?.hex ?? "#94a3b8";

/**
 * Renders a real, flat brand mark in its own brand colour.
 * Uses `currentColor` so a parent can force monochrome (e.g. on hover).
 */
export function BrandLogo({
  name,
  size = 24,
  className = "",
  monochrome = false,
}: {
  name: BrandName;
  size?: number;
  className?: string;
  monochrome?: boolean;
}) {
  const mark = official[name];
  if (!mark) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      aria-label={`${mark.title} logo`}
      className={className}
      style={{ color: monochrome ? "currentColor" : brandHex(name) }}
      fill="currentColor"
    >
      {mark.path ? <path d={mark.path} /> : null}
      {mark.body ? <g dangerouslySetInnerHTML={{ __html: mark.body }} /> : null}
    </svg>
  );
}
