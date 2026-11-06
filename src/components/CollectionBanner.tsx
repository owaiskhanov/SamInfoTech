import { ThemedImage } from "./ThemedImage";

const art: Record<string, { src: string; alt: string }> = {
  solutions: {
    src: "/images/solutions-core.webp",
    alt: "Glowing crystalline core radiating network connections",
  },
  security: {
    src: "/images/security-soc.webp",
    alt: "Security operations centre with wall of monitoring screens",
  },
  products: {
    src: "/images/products-grid.webp",
    alt: "Grid of glowing glass tiles representing software products",
  },
};

/** Decorative side panel used in the archive page heroes (desktop only). */
export function CollectionBanner({ kind }: { kind: "solutions" | "security" | "products" }) {
  const a = art[kind];
  return (
    <div className="relative hidden overflow-hidden rounded-lg border border-line lg:block">
      <ThemedImage
        src={a.src}
        alt={a.alt}
        width={1408}
        height={1000}
        sizes="34vw"
        className="h-full min-h-[17rem] w-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 border-t border-line bg-ink-950/95 px-4 py-3">
        <p className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-brand-300">
          Sam Infosystems
        </p>
        <p className="mt-1 text-[0.76rem] font-light text-mist-400">
          Delivered, managed and supported from Goregaon West, Mumbai.
        </p>
      </div>
    </div>
  );
}
