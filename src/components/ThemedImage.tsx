"use client";

import { useEffect, useState } from "react";

/**
 * Art-directed images.
 *
 * The light theme is not a colour filter on the dark artwork: every source has a
 * real light-mode file rendered by `scripts/build-assets.mjs` (`-light.webp`,
 * plus a `-sm` pair). Which one wins is decided by the *browser*, through
 * `<picture><source media="(prefers-color-scheme: ...)">`, so:
 *
 *  - the correct file is fetched immediately, during first paint, with no
 *    hydration round-trip and no light-then-dark flash;
 *  - a dark-theme visitor never downloads a light file, and vice versa;
 *  - the intrinsic `width`/`height` are on the <img>, so the box is reserved
 *    before the bytes arrive and the swap never shifts layout.
 *
 * The srcset covers the same 1x/2x-ish widths as the rest of the site, keyed to
 * the same `sizes` contract, so retina and mobile still get the small file.
 */
type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto";
};

/**
 * The two widths each source actually exists in. The descriptors are the real
 * pixel widths of the files, which is what stops a 1408px plate being chosen
 * for a 600px slot on a retina screen.
 */
function srcSetFor(full: string, small: string, width: number) {
  return `${small} ${Math.round(width * 0.62)}w, ${full} ${width}w`;
}

/**
 * React 19 serialises the SVG-style `srcSet` prop as `srcSet=` in the markup,
 * and browsers only honour lowercase `srcset` on <source>. Spread the attribute
 * instead so the HTML that ships is what the HTML spec says.
 */
const srcsetAttr = (value: string) => ({ srcset: value }) as Record<string, string>;

export function ThemedImage({
  src,
  alt,
  width,
  height,
  sizes,
  className = "",
  priority = false,
  fetchPriority = "auto",
}: Props) {
  // The live <html> class is the source of truth; the media query alone is not
  // enough because a visitor can override their OS preference with the toggle.
  const [mounted, setMounted] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setLight(root.classList.contains("light"));
    sync();
    setMounted(true);

    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const dark = src;
  const darkSmall = src.replace(/\.webp$/, "-sm.webp");
  const lightSrc = src.replace(/\.webp$/, "-light.webp");
  const lightSmall = src.replace(/\.webp$/, "-light-sm.webp");

  const explicit = mounted;
  const set = explicit && light ? lightSrc : dark;

  return (
    <picture>
      {/* Before hydration the browser still picks the right theme on its own. */}
      {!explicit && (
        <source
          media="(prefers-color-scheme: light)"
          {...srcsetAttr(srcSetFor(lightSrc, lightSmall, width))}
          sizes={sizes}
        />
      )}
      <img
        src={set}
        {...srcsetAttr(
          srcSetFor(
            explicit && light ? lightSrc : dark,
            explicit && light ? lightSmall : darkSmall,
            width,
          ),
        )}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={fetchPriority}
        className={className}
      />
    </picture>
  );
}
