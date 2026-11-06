import { byCategory, company } from "@/lib/site";
import { hasBrandMark } from "@/lib/brand-logo";
import { ThemeBrandMarkBase } from "./ThemeBrandMarkBase";
import { Icon } from "./Icon";

/**
 * The band that opens the footer: the eleven platforms the firm actually
 * licenses, deployed and supported, scrolling past the four original images.
 *
 * Server-rendered and pure CSS, so it costs no JavaScript. The track is
 * duplicated once and translated by exactly -50%, which is what makes the loop
 * seamless. It pauses on hover, and under `prefers-reduced-motion` it stops and
 * becomes a normal horizontal scroller.
 */
export function FooterMarquee() {
  const products = byCategory("products");

  const items = products.map((p) => ({
    slug: p.slug,
    name: p.name,
    icon: p.icon,
    highlights: p.highlights,
  }));

  // Two identical passes keep the -50% translation continuous.
  const pass = [...items, ...items];

  return (
    <div className="marquee border-b border-line" aria-hidden="true">
      <div className="marquee-track items-stretch py-0">
        {pass.map((item, i) => (
          <div
            key={`${item.slug}-${i}`}
            className="flex shrink-0 items-center gap-3 border-r border-line px-5 py-4 sm:px-6"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded border border-line bg-ink-850">
              {hasBrandMark(item.icon) ? (
                <ThemeBrandMarkBase name={item.icon} size={16} />
              ) : (
                <Icon name={item.icon} size={15} />
              )}
            </span>
            <span className="flex flex-col leading-tight">
              <span className="whitespace-nowrap font-display text-[0.8rem] font-normal text-mist-100">
                {item.name}
              </span>
              <span className="mt-0.5 whitespace-nowrap text-[0.66rem] font-light uppercase tracking-[0.12em] text-mist-500">
                {item.highlights[0]}
              </span>
            </span>
            <span className="ml-1 h-1 w-1 shrink-0 rounded-full bg-brand-400" />
          </div>
        ))}
      </div>

      {/* the same promise, readable to a screen reader without the visual loop */}
      <span className="sr-only">
        Platforms we deliver: {items.map((i) => i.name).join(", ")}. Delivered from{" "}
        {company.address.locality}.
      </span>
    </div>
  );
}
