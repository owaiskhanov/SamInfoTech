import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import wawoff2 from "wawoff2";

const root = process.cwd();
const SRC = path.join(root, "assets-src");
const PUB = path.join(root, "public");
const IMG = path.join(PUB, "images");

const log = (...a) => console.log("•", ...a);

/* ------------------------------- 1. photos ------------------------------- */

const photos = [
  { file: "hero-security.webp", out: "hero-security.webp", width: 1920, quality: 76 },
  { file: "hero-cloud.webp", out: "hero-cloud.webp", width: 1920, quality: 76 },
  { file: "about-team.webp", out: "about-team.webp", width: 1600, quality: 78 },
  { file: "security-soc.webp", out: "security-soc.webp", width: 1600, quality: 76 },
  { file: "solutions-core.webp", out: "solutions-core.webp", width: 1400, quality: 78 },
  { file: "contact-globe.webp", out: "contact-globe.webp", width: 1400, quality: 78 },
  { file: "products-grid.webp", out: "products-grid.webp", width: 1600, quality: 76 },
];

/**
 * The light theme does not dim the dark artwork with a CSS filter: it gets its
 * own files. Two different source families, two different treatments:
 *
 *  - digital / abstract renders (glowing wireframes, a holographic globe, a
 *    wall of glass tiles) are inverted into fine teal ink on paper, which is
 *    the print-illustration equivalent of the dark version;
 *  - photographs are not inverted at all, because a negative reads as an error.
 *    They are pushed to daylight: brighter, calmer, slightly desaturated, which
 *    is the honest light-mode counterpart of the same scene.
 */
const inkWash = (img, saturation = 1) =>
  img
    .negate()
    .modulate({ hue: 180, saturation })
    .linear(1.5, -76) // push the highlights to paper white, the marks to navy ink
    .removeAlpha();

const daylight = (img) =>
  img.modulate({ brightness: 1.5, saturation: 0.6 }).linear(1.02, 44);

const lightTreatment = { ink: inkWash, daylight };

/** A few sources carry stray hues that look off-brand as ink (the glass wall skews violet). */
const lightDesaturation = { "products-grid.webp": 0.4 };

const lightKinds = {
  "hero-security.webp": "ink",
  "hero-cloud.webp": "ink",
  "about-team.webp": "daylight",
  "security-soc.webp": "daylight",
  "solutions-core.webp": "ink",
  "contact-globe.webp": "ink",
  "products-grid.webp": "ink",
};

async function buildPhotos() {
  await mkdir(IMG, { recursive: true });
  for (const p of photos) {
    const input = path.join(SRC, p.file);
    if (!existsSync(input)) {
      console.warn("  ! missing source", p.file);
      continue;
    }
    const buf = await readFile(input);
    const meta = await sharp(buf).metadata();
    const target = Math.min(p.width, meta.width ?? p.width);

    // full-size webp
    const out = await sharp(buf)
      .resize({ width: target, withoutEnlargement: true })
      .webp({ quality: p.quality, effort: 6 })
      .toBuffer();
    await writeFile(path.join(IMG, p.out), out);

    // 2x-smaller variant for mobile / art-directed slots
    const small = await sharp(buf)
      .resize({ width: Math.round(target * 0.62), withoutEnlargement: true })
      .webp({ quality: p.quality - 4, effort: 6 })
      .toBuffer();
    await writeFile(path.join(IMG, p.out.replace(".webp", "-sm.webp")), small);

    // light-theme twin (-light.webp and -light-sm.webp)
    const kind = lightKinds[p.out] ?? "ink";
    const treatment = lightTreatment[kind];
    const sat = kind === "ink" ? (lightDesaturation[p.out] ?? 1) : 1;
    const lightOut = await treatment(
      sharp(buf).resize({ width: target, withoutEnlargement: true }),
      sat,
    )
      .webp({ quality: p.quality, effort: 6 })
      .toBuffer();
    await writeFile(path.join(IMG, p.out.replace(".webp", "-light.webp")), lightOut);

    const lightSmall = await treatment(
      sharp(buf).resize({ width: Math.round(target * 0.62), withoutEnlargement: true }),
      sat,
    )
      .webp({ quality: p.quality - 4, effort: 6 })
      .toBuffer();
    await writeFile(path.join(IMG, p.out.replace(".webp", "-light-sm.webp")), lightSmall);

    log(
      `${p.out}  ${(out.length / 1024).toFixed(0)}kB  (${target}px)` +
        `  · light ${(lightOut.length / 1024).toFixed(0)}kB`,
    );
  }
}

/* ------------------------------ 2. brand mark ------------------------------ */

const MARK = `
  <path d="M20 2.4 34.8 11v17.6L20 37.2 5.2 28.6V11L20 2.4Z"
        fill="none" stroke="#35C6DC" stroke-width="1.4" stroke-linejoin="round"/>
  <path d="M24.6 15.4c-.9-1.3-2.5-2.1-4.6-2.1-2.9 0-4.9 1.6-4.9 3.9 0 2.3 1.8 3.3 4.7 3.9 2.6.6 3.8 1.2 3.8 2.7 0 1.4-1.3 2.4-3.4 2.4-1.9 0-3.5-.9-4.3-2.4"
        fill="none" stroke="#35C6DC" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="27.9" cy="13.4" r="1.5" fill="#35C6DC"/>
`;

/** Flat, gradient-free wordmark tile used for every favicon size. */
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="12" fill="#080B12"/>
  <rect x="0.5" y="0.5" width="63" height="63" rx="11.5" fill="none" stroke="#262F3D"/>
  <g transform="translate(12 12)">${MARK}</g>
</svg>`;

/** Bolder variant that survives 16–32px rasterisation. */
const iconSvgSimple = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="10" fill="#080B12"/>
  <g transform="translate(11 11) scale(1.05)">
    <path d="M20 2.4 34.8 11v17.6L20 37.2 5.2 28.6V11L20 2.4Z"
          fill="none" stroke="#35C6DC" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M24.6 15.4c-.9-1.3-2.5-2.1-4.6-2.1-2.9 0-4.9 1.6-4.9 3.9 0 2.3 1.8 3.3 4.7 3.9 2.6.6 3.8 1.2 3.8 2.7 0 1.4-1.3 2.4-3.4 2.4-1.9 0-3.5-.9-4.3-2.4"
          fill="none" stroke="#35C6DC" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="27.9" cy="13.4" r="2.4" fill="#35C6DC"/>
  </g>
</svg>`;

/** Maskable icon: mark kept inside the central 80% safe zone. */
const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" fill="#080B12"/>
  <g transform="translate(12.8 12.8) scale(0.8)">${MARK}</g>
</svg>`;

/** Transparent mark, used inside the social card. */
const markOnlySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">${MARK}</svg>`;

/** Safari pinned-tab silhouette: single flat colour. */
const pinnedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
  <path d="M20 1.6 35.6 10.6v18.8L20 38.4 4.4 29.4V10.6L20 1.6Zm0 2.9L7 11.7v16.6l13 7.2 13-7.2V11.7L20 4.5Z" fill="#000"/>
  <path d="M25.9 15.9c-1-1.4-2.7-2.3-5-2.3-3.2 0-5.4 1.8-5.4 4.3 0 2.5 2 3.6 5.2 4.3 2.9.6 4.2 1.3 4.2 3 0 1.5-1.4 2.6-3.7 2.6-2.1 0-3.9-1-4.7-2.6v3.3c1.1 1.2 2.8 2 4.8 2 3.3 0 5.5-1.8 5.5-4.5 0-2.5-1.9-3.7-5.2-4.4-2.9-.6-4.2-1.2-4.2-2.8 0-1.4 1.3-2.4 3.6-2.4 1.9 0 3.4.8 4.3 2.1Z" fill="#000"/>
</svg>`;

const svgToPng = async (svg, width) => {
  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: width } });
  return resvg.render().asPng();
};

/* --------------------------- 3. favicons & app icons --------------------------- */

/** Light-theme favicon: paper tile, ink-cyan mark, so it sits in a light tab bar. */
const iconSvgLight = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="12" fill="#F6F7F9"/>
  <rect x="0.5" y="0.5" width="63" height="63" rx="11.5" fill="none" stroke="#CFD6E1"/>
  <g transform="translate(12 12)">${MARK.split("#35C6DC").join("#0B7285")}</g>
</svg>`;

async function buildIcons() {
  await writeFile(path.join(PUB, "icon.svg"), iconSvg);
  await writeFile(path.join(PUB, "icon-light.svg"), iconSvgLight);
  await writeFile(path.join(PUB, "safari-pinned-tab.svg"), pinnedSvg);

  const pngs = {};
  for (const s of [16, 32]) pngs[s] = await svgToPng(iconSvgSimple, s);
  for (const s of [48, 96, 192, 512]) pngs[s] = await svgToPng(iconSvg, s);
  pngs.maskable = await svgToPng(maskableSvg, 512);
  await writeFile(path.join(PUB, "favicon-32x32.png"), pngs[32]);
  await writeFile(path.join(PUB, "favicon-96x96.png"), pngs[96]);
  await writeFile(path.join(PUB, "android-chrome-192x192.png"), pngs[192]);
  await writeFile(path.join(PUB, "android-chrome-512x512.png"), pngs[512]);
  await writeFile(path.join(PUB, "maskable-512x512.png"), pngs.maskable);

  // light twins, offered through media="(prefers-color-scheme: light)"
  await writeFile(
    path.join(PUB, "favicon-32x32-light.png"),
    await svgToPng(iconSvgLight, 32),
  );
  await writeFile(
    path.join(PUB, "favicon-96x96-light.png"),
    await svgToPng(iconSvgLight, 96),
  );

  // .ico container with 16/32/48 frames
  const ico = await sharp(pngs[48]).toFormat("png").toBuffer();
  const icoOut = buildIco([
    { size: 16, data: pngs[16] },
    { size: 32, data: pngs[32] },
    { size: 48, data: ico },
  ]);
  await writeFile(path.join(PUB, "favicon.ico"), icoOut);

  // apple touch icon: no transparency, brand-dark background, slightly inset mark
  const appleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="180" height="180">
    <rect width="180" height="180" fill="#080B12"/>
    <g transform="translate(34 34) scale(2.8)">${MARK}</g>
  </svg>`;
  await writeFile(
    path.join(PUB, "apple-touch-icon.png"),
    await svgToPng(appleSvg, 180),
  );

  const appleLightSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="180" height="180">
    <rect width="180" height="180" fill="#F6F7F9"/>
    <g transform="translate(34 34) scale(2.8)">${MARK.split("#35C6DC").join("#0B7285")}</g>
  </svg>`;
  await writeFile(
    path.join(PUB, "apple-touch-icon-light.png"),
    await svgToPng(appleLightSvg, 180),
  );

  // metadata for PWA / Windows tiles
  await writeFile(
    path.join(PUB, "manifest.webmanifest"),
    JSON.stringify(
      {
        name: "Sam Infosystems Pvt Ltd",
        short_name: "Sam Infosystems",
        description:
          "IT solutions, cloud and security provider based in Mumbai, India. Since 2000.",
        start_url: "/",
        display: "standalone",
        // Chrome honours `color_scheme` for the standalone splash screen, so the
        // installed app opens on the same theme the site was last using.
        background_color: "#080B12",
        theme_color: "#05070c",
        icons: [
          { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
          { src: "/maskable-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
          { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png", purpose: "monochrome" },
        ],
      },
      null,
      2,
    ),
  );

  await writeFile(
    path.join(PUB, "browserconfig.xml"),
    `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="/android-chrome-192x192.png"/>
      <TileColor>#080B12</TileColor>
    </tile>
  </msapplication>
</browserconfig>
`,
  );

  log("favicon.ico (16/32/48), icon.svg, apple-touch-icon, PWA icons, manifest, browserconfig");
}

/** Minimal ICO writer (PNG-compressed frames, supported by all modern browsers). */
function buildIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);

  const dir = Buffer.alloc(16 * entries.length);
  let offset = 6 + 16 * entries.length;
  entries.forEach((e, i) => {
    const b = i * 16;
    dir.writeUInt8(e.size >= 256 ? 0 : e.size, b + 0);
    dir.writeUInt8(e.size >= 256 ? 0 : e.size, b + 1);
    dir.writeUInt8(0, b + 2);
    dir.writeUInt8(0, b + 3);
    dir.writeUInt16LE(1, b + 4);
    dir.writeUInt16LE(32, b + 6);
    dir.writeUInt32LE(e.data.length, b + 8);
    dir.writeUInt32LE(offset, b + 12);
    offset += e.data.length;
  });

  return Buffer.concat([header, dir, ...entries.map((e) => e.data)]);
}

/* ------------------------------- 4. OG card ------------------------------- */

async function loadFont(woffPath) {
  const woff = await readFile(woffPath);
  const decompress = wawoff2.decompress ?? wawoff2;
  return Buffer.from(await decompress(woff));
}

/** Palette for one OG card variant. Same layout, two flat colour ways. */
const ogThemes = {
  dark: {
    suffix: "",
    page: "#080B12",
    hairline: "#262F3D",
    title: "#F6F8FB",
    accent: "#6FDCEA",
    body: "#AAB5C6",
    muted: "#66707F",
    eyebrow: "#8590A3",
    pillBg: "#6FDCEA",
    pillInk: "#04222A",
    photo: "hero-security.webp",
    scrim: "rgba(8,11,18,0.45)",
    viewport: "#05070c",
  },
  light: {
    suffix: "-light",
    page: "#F6F7F9",
    hairline: "#CFD6E1",
    title: "#0A0F16",
    accent: "#0B7285",
    body: "#3D4857",
    muted: "#6C7686",
    eyebrow: "#56606F",
    pillBg: "#0B7285",
    pillInk: "#F7FDFF",
    photo: "hero-security-light.webp",
    scrim: "rgba(246,247,249,0.30)",
    viewport: "#f6f7f9",
  },
};

async function buildOg(themeName) {
  const t = ogThemes[themeName];

  const interTight = await loadFont(
    path.join(root, "node_modules/@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2"),
  );
  const inter = await loadFont(
    path.join(root, "node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2"),
  );

  const hero = await sharp(path.join(IMG, t.photo))
    .resize({ width: 760 })
    .modulate({ brightness: themeName === "dark" ? 1.05 : 1.0 })
    .jpeg({ quality: 82 })
    .toBuffer();
  const heroUri = `data:image/jpeg;base64,${hero.toString("base64")}`;

  // satori will not rasterise a nested <svg> image, so pre-render the mark to PNG
  const markPng = await svgToPng(markOnlySvg, 104);
  const markUri = `data:image/png;base64,${markPng.toString("base64")}`;

  const el = (style, children) => ({
    type: "div",
    props: { style: { display: "flex", ...style }, children },
  });

  const markup = el(
    {
      width: "1200px",
      height: "630px",
      background: t.page,
      position: "relative",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "58px 64px 54px",
      boxSizing: "border-box",
    },
    [
      // flat photo panel on the right with a hairline edge
      el(
        {
          position: "absolute",
          right: "0px",
          top: "0px",
          width: "520px",
          height: "630px",
          overflow: "hidden",
          borderLeft: `1px solid ${t.hairline}`,
        },
        [
          {
            type: "img",
            props: {
              src: heroUri,
              width: 520,
              height: 630,
              style: { objectFit: "cover", objectPosition: "72% 50%" },
            },
          },
          el(
            {
              position: "absolute",
              inset: "0px",
              backgroundColor: t.scrim,
            },
            [],
          ),
        ],
      ),

      // brand row
      el({ alignItems: "center", gap: "15px", width: "580px" }, [
        { type: "img", props: { src: markUri, width: 48, height: 48 } },
        el({ flexDirection: "column" }, [
          el(
            {
              fontFamily: "InterTight",
              fontSize: "23px",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: t.title,
            },
            "Sam Infosystems",
          ),
          el(
            {
              fontFamily: "Inter",
              fontSize: "10px",
              fontWeight: 400,
              letterSpacing: "0.3em",
              color: t.muted,
              marginTop: "8px",
            },
            "PVT LTD  ·  SINCE 2000",
          ),
        ]),
      ]),

      // headline
      el({ flexDirection: "column", maxWidth: "580px" }, [
        el(
          {
            fontFamily: "Inter",
            fontSize: "14px",
            fontWeight: 500,
            letterSpacing: "0.26em",
            color: t.eyebrow,
            marginBottom: "20px",
          },
          "MUMBAI · INDIA",
        ),
        el(
          {
            fontFamily: "InterTight",
            fontSize: "62px",
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            color: t.title,
          },
          "IT solutions,",
        ),
        el(
          {
            fontFamily: "InterTight",
            fontSize: "62px",
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            color: t.accent,
          },
          "cloud & security.",
        ),
        el(
          {
            fontFamily: "Inter",
            fontSize: "19px",
            fontWeight: 300,
            lineHeight: 1.5,
            color: t.body,
            marginTop: "22px",
            maxWidth: "460px",
          },
          "Architecting, deploying and supporting enterprise technology since 2000.",
        ),
      ]),

      // footer row
      el({ alignItems: "center", width: "1030px", gap: "18px" }, [
        el(
          {
            fontFamily: "Inter",
            fontSize: "15px",
            fontWeight: 500,
            color: t.pillInk,
            padding: "10px 18px",
            borderRadius: "6px",
            backgroundColor: t.pillBg,
          },
          "saminfosystems.com",
        ),
        el(
          {
            fontFamily: "Inter",
            fontSize: "14px",
            fontWeight: 300,
            color: t.muted,
          },
          "+91 98215 34588  ·  info@saminfosystems.com",
        ),
      ]),
    ],
  );

  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      { name: "InterTight", data: interTight, weight: 300, style: "normal" },
      { name: "InterTight", data: interTight, weight: 500, style: "normal" },
      { name: "Inter", data: inter, weight: 300, style: "normal" },
      { name: "Inter", data: inter, weight: 400, style: "normal" },
      { name: "Inter", data: inter, weight: 500, style: "normal" },
    ],
  });

  const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
  await writeFile(path.join(PUB, `opengraph-image${t.suffix}.png`), png);

  // Twitter/X friendly JPEG variant (smaller, no alpha)
  const jpg = await sharp(png).jpeg({ quality: 90, mozjpeg: true }).toBuffer();
  await writeFile(path.join(PUB, `social-share${t.suffix}.jpg`), jpg);

  log(
    `opengraph-image${t.suffix}.png ${(png.length / 1024).toFixed(0)}kB · social-share${t.suffix}.jpg ${(jpg.length / 1024).toFixed(0)}kB`,
  );
}

/* --------------------------------- run --------------------------------- */

await buildPhotos();
await buildIcons();
await buildOg("dark");
await buildOg("light");
log("done");
