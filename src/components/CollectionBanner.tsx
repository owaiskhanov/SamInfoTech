import Image from "next/image";

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
    <div className="relative hidden overflow-hidden rounded-[1.4rem] border border-white/10 lg:block">
      <Image
        src={a.src}
        alt={a.alt}
        width={1408}
        height={900}
        sizes="38vw"
        className="h-full min-h-[19rem] w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent" />
      <div className="absolute inset-x-5 bottom-5">
        <p className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-brand-300">
          Sam Infosystems
        </p>
        <p className="mt-1 text-[0.8rem] text-mist-300">
          Delivered, managed and supported from Goregaon West, Mumbai.
        </p>
      </div>
    </div>
  );
}
