import { brandMarks, handmadeMarks } from "@/lib/brand-marks";

export { brandMarks, handmadeMarks };

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
 * Fallback colour, used only if the `--mark-*` theme token is missing.
 * The real dark and light values live in globals.css, where the theme can swap
 * them without any JavaScript.
 */
export const brandHex = (name: BrandName) => official[name]?.hex ?? "#94a3b8";

