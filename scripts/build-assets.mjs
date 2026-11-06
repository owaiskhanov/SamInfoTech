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

/* ——————————————————————————————— 1. photos ——————————————————————————————— */

const photos = [
  { file: "hero-security.webp", out: "hero-security.webp", width: 1920, quality: 76 },
  { file: "hero-cloud.webp", out: "hero-cloud.webp", width: 1920, quality: 76 },
  { file: "about-team.webp", out: "about-team.webp", width: 1600, quality: 78 },
  { file: "security-soc.webp", out: "security-soc.webp", width: 1600, quality: 76 },
  { file: "solutions-core.webp", out: "solutions-core.webp", width: 1400, quality: 78 },
  { file: "contact-globe.webp", out: "contact-globe.webp", width: 1400, quality: 78 },
  { file: "products-grid.webp", out: "products-grid.webp", width: 1600, quality: 76 },
];

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

    log(`${p.out}  ${(out.length / 1024).toFixed(0)}kB  (${target}px)`);
  }
}

/* ——————————————————————————————— 2. brand mark ——————————————————————————————— */

const markInner = (grad = "g") => `
  <path d="M24 2.6 42.4 13v22L24 45.4 5.6 35V13L24 2.6Z"
        fill="url(#${grad})" fill-opacity="0.14" stroke="url(#${grad})"
        stroke-width="1.8" stroke-linejoin="round"/>
  <path d="M24 8.4 36.6 15.6v16.8L24 39.6 11.4 32.4V15.6L24 8.4Z"
        stroke="url(#${grad})" stroke-opacity="0.45" stroke-width="1" stroke-linejoin="round"/>
  <path d="M29.6 18.6c-1-1.5-2.9-2.4-5.3-2.4-3.3 0-5.6 1.8-5.6 4.5 0 2.6 2.1 3.8 5.4 4.5 3 .6 4.4 1.4 4.4 3.1 0 1.6-1.5 2.7-3.9 2.7-2.2 0-4-1-4.9-2.7"
        stroke="url(#${grad})" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="33.4" cy="16.4" r="1.7" fill="#67E8F9"/>
`;

const defs = `
  <defs>
    <linearGradient id="g" x1="8" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
      <stop stop-color="#67E8F9"/><stop offset="0.52" stop-color="#22D3EE"/><stop offset="1" stop-color="#3B82F6"/>
    </linearGradient>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#0A152A"/><stop offset="1" stop-color="#050B18"/>
    </linearGradient>
  </defs>
`;

const markSimple = (grad = "g") => `
  <path d="M24 2.6 42.4 13v22L24 45.4 5.6 35V13L24 2.6Z"
        fill="url(#${grad})" fill-opacity="0.18" stroke="url(#${grad})"
        stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M30 18.2c-1.2-1.7-3.3-2.7-6-2.7-3.8 0-6.4 2.1-6.4 5.2 0 3 2.4 4.3 6.1 5.1 3.4.7 5 1.6 5 3.5 0 1.8-1.7 3.1-4.4 3.1-2.5 0-4.5-1.1-5.5-3"
        stroke="url(#${grad})" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="34.4" cy="15.6" r="2.2" fill="#67E8F9"/>
`;

const iconSvgSimple = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  ${defs}
  <rect width="64" height="64" rx="14" fill="url(#bg)"/>
  <rect x="0.5" y="0.5" width="63" height="63" rx="13.5" fill="none" stroke="#22D3EE" stroke-opacity="0.28"/>
  <g transform="translate(8 8)">${markSimple("g")}</g>
</svg>`;

// maskable icons need their content inside the central 80% safe circle
const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  ${defs}
  <rect width="64" height="64" fill="#050B18"/>
  <g transform="translate(12.8 12.8) scale(0.8)">${markInner("g")}</g>
</svg>`;

const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  ${defs}
  <rect width="64" height="64" rx="14" fill="url(#bg)"/>
  <rect x="0.5" y="0.5" width="63" height="63" rx="13.5" fill="none" stroke="#22D3EE" stroke-opacity="0.28"/>
  <g transform="translate(8 8)">${markInner("g")}</g>
</svg>`;

const markOnlySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
  ${defs}${markInner("g")}
</svg>`;

// Safari pinned-tab needs a single-colour silhouette
const pinnedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
  <path d="M24 2.6 42.4 13v22L24 45.4 5.6 35V13L24 2.6Zm0 5.8L11.4 15.6v16.8L24 39.6l12.6-7.2V15.6L24 8.4Z" fill="#000"/>
  <path d="M29.6 18.6c-1-1.5-2.9-2.4-5.3-2.4-3.3 0-5.6 1.8-5.6 4.5 0 2.6 2.1 3.8 5.4 4.5 3 .6 4.4 1.4 4.4 3.1 0 1.6-1.5 2.7-3.9 2.7-2.2 0-4-1-4.9-2.7v3.4c1.1 1.3 2.9 2.1 5 2.1 3.4 0 5.7-1.9 5.7-4.7 0-2.6-2-3.9-5.4-4.6-3-.6-4.4-1.3-4.4-2.9 0-1.5 1.4-2.5 3.8-2.5 2 0 3.6.8 4.5 2.2Z" fill="#000"/>
</svg>`;

const svgToPng = async (svg, width) => {
  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: width } });
  return resvg.render().asPng();
};

/* ————————————————————————————— 3. favicons & app icons ————————————————————————————— */

async function buildIcons() {
  await writeFile(path.join(PUB, "icon.svg"), iconSvg);
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
    ${defs}
    <rect width="180" height="180" fill="#050B18"/>
    <circle cx="90" cy="70" r="80" fill="#22D3EE" fill-opacity="0.10"/>
    <g transform="translate(30 30) scale(2.5)">${markInner("g")}</g>
  </svg>`;
  await writeFile(
    path.join(PUB, "apple-touch-icon.png"),
    await svgToPng(appleSvg, 180),
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
        background_color: "#050b18",
        theme_color: "#050b18",
        icons: [
          { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
          { src: "/maskable-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
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
      <TileColor>#050b18</TileColor>
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

/* ——————————————————————————————— 4. OG card ——————————————————————————————— */

async function loadFont(woffPath) {
  const woff = await readFile(woffPath);
  const decompress = wawoff2.decompress ?? wawoff2;
  return Buffer.from(await decompress(woff));
}

async function buildOg() {
  const soraBold = await loadFont(
    path.join(root, "node_modules/@fontsource-variable/sora/files/sora-latin-wght-normal.woff2"),
  );
  const manrope = await loadFont(
    path.join(root, "node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2"),
  );

  const hero = await sharp(path.join(IMG, "hero-security.webp"))
    .resize({ width: 760 })
    .modulate({ brightness: 1.05 })
    .jpeg({ quality: 82 })
    .toBuffer();
  const heroUri = `data:image/jpeg;base64,${hero.toString("base64")}`;

  // satori will not rasterise a nested <svg> image, so pre-render the mark to PNG
  const markPng = await svgToPng(markOnlySvg, 124);
  const markUri = `data:image/png;base64,${markPng.toString("base64")}`;

  const el = (style, children) => ({
    type: "div",
    props: { style: { display: "flex", ...style }, children },
  });

  const markup = el(
    {
      width: "1200px",
      height: "630px",
      background: "#050B18",
      position: "relative",
      overflow: "hidden",
    },
    [
      // backdrop orbs
      el(
        {
          position: "absolute",
          width: "720px",
          height: "720px",
          left: "-260px",
          top: "-300px",
          borderRadius: "9999px",
          background: "radial-gradient(circle, rgba(34,211,238,0.28), rgba(5,11,24,0) 68%)",
        },
        [],
      ),
      el(
        {
          position: "absolute",
          width: "620px",
          height: "620px",
          left: "300px",
          bottom: "-420px",
          borderRadius: "9999px",
          background: "radial-gradient(circle, rgba(59,130,246,0.22), rgba(5,11,24,0) 70%)",
        },
        [],
      ),
      // hero art, right side, fading into the background
      el(
        {
          position: "absolute",
          right: "0px",
          top: "0px",
          width: "620px",
          height: "630px",
          overflow: "hidden",
        },
        [
          {
            type: "img",
            props: {
              src: heroUri,
              width: 620,
              height: 630,
              style: { objectFit: "cover", objectPosition: "70% 50%", opacity: 0.85 },
            },
          },
          el(
            {
              position: "absolute",
              inset: "0px",
              background:
                "linear-gradient(90deg, #050B18 0%, rgba(5,11,24,0.72) 26%, rgba(5,11,24,0.12) 62%, rgba(5,11,24,0.55) 100%)",
            },
            [],
          ),
        ],
      ),
      // content
      el(
        {
          position: "relative",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "1200px",
          height: "630px",
          padding: "56px 64px 52px",
          boxSizing: "border-box",
        },
        [
          // brand row
          el({ alignItems: "center", gap: "18px" }, [
            { type: "img", props: { src: markUri, width: 62, height: 62 } },
            el({ flexDirection: "column" }, [
              el(
                {
                  fontFamily: "Sora",
                  fontSize: "26px",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#FFFFFF",
                },
                "SAM INFOSYSTEMS",
              ),
              el(
                {
                  fontFamily: "Manrope",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.34em",
                  color: "#67E8F9",
                  marginTop: "6px",
                },
                "PVT LTD  ·  SINCE 2000",
              ),
            ]),
          ]),

          // headline
          el({ flexDirection: "column", maxWidth: "700px" }, [
            el(
              {
                fontFamily: "Sora",
                fontSize: "18px",
                fontWeight: 600,
                letterSpacing: "0.28em",
                color: "#8EA0C0",
                marginBottom: "20px",
              },
              "MUMBAI  ·  INDIA",
            ),
            el(
              {
                fontFamily: "Sora",
                fontSize: "66px",
                fontWeight: 700,
                lineHeight: 1.06,
                letterSpacing: "-0.035em",
                color: "#FFFFFF",
              },
              "IT solutions,",
            ),
            el(
              {
                fontFamily: "Sora",
                fontSize: "66px",
                fontWeight: 700,
                lineHeight: 1.06,
                letterSpacing: "-0.035em",
                backgroundImage: "linear-gradient(100deg,#A5F3FC 0%,#38BDF8 48%,#60A5FA 100%)",
                backgroundClip: "text",
                color: "transparent",
              },
              "cloud & security.",
            ),
            el(
              {
                fontFamily: "Manrope",
                fontSize: "23px",
                fontWeight: 500,
                lineHeight: 1.5,
                color: "#B9C8E4",
                marginTop: "22px",
                maxWidth: "560px",
              },
              "Architecting, deploying and supporting enterprise technology since 2000.",
            ),
          ]),

          // footer row
          el({ alignItems: "center", justifyContent: "space-between", width: "1072px" }, [
            el({ alignItems: "center", gap: "14px" }, [
              el(
                {
                  fontFamily: "Manrope",
                  fontSize: "19px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  padding: "12px 22px",
                  borderRadius: "9999px",
                  backgroundImage: "linear-gradient(135deg,#67E8F9,#38BDF8 55%,#60A5FA)",
                },
                "saminfosystems.com",
              ),
            ]),
            el({ alignItems: "center", gap: "10px" }, [
              el({ width: "8px", height: "8px", borderRadius: "9999px", background: "#34D399" }, []),
              el(
                {
                  fontFamily: "Manrope",
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#8EA0C0",
                },
                "+91 98215 34588  ·  info@saminfosystems.com",
              ),
            ]),
          ]),
        ],
      ),
    ],
  );

  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Sora", data: soraBold, weight: 600, style: "normal" },
      { name: "Sora", data: soraBold, weight: 700, style: "normal" },
      { name: "Manrope", data: manrope, weight: 400, style: "normal" },
      { name: "Manrope", data: manrope, weight: 500, style: "normal" },
      { name: "Manrope", data: manrope, weight: 600, style: "normal" },
      { name: "Manrope", data: manrope, weight: 700, style: "normal" },
    ],
  });

  const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
  await writeFile(path.join(PUB, "opengraph-image.png"), png);

  // Twitter/X friendly JPEG variant (smaller, no alpha)
  const jpg = await sharp(png).jpeg({ quality: 90, mozjpeg: true }).toBuffer();
  await writeFile(path.join(PUB, "social-share.jpg"), jpg);

  log(
    `opengraph-image.png ${(png.length / 1024).toFixed(0)}kB · social-share.jpg ${(jpg.length / 1024).toFixed(0)}kB`,
  );
}

/* ——————————————————————————————— run ——————————————————————————————— */

await buildPhotos();
await buildIcons();
await buildOg();
log("done");
