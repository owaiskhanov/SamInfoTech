import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { company, items, nav } from "@/lib/site";

const siteUrl = company.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sam Infosystems | IT Solutions, Cloud & Security, Mumbai",
    template: "%s | Sam Infosystems",
  },
  description:
    "Mumbai-based IT solutions provider since 2000. Cloud, migration, managed services, cyber security, VAPT and firewalls, plus Azure, AWS and Microsoft 365.",
  applicationName: "Sam Infosystems",
  authors: [{ name: "Sam Infosystems Pvt Ltd", url: siteUrl }],
  creator: "Sam Infosystems Pvt Ltd",
  publisher: "Sam Infosystems Pvt Ltd",
  category: "Information Technology",
  keywords: [
    "Sam Infosystems",
    "IT solutions Mumbai",
    "cloud solutions provider",
    "cyber security services",
    "VAPT services",
    "firewall management",
    "managed IT services",
    "Microsoft Azure partner",
    "AWS partner",
    "Microsoft 365",
    "Google Workspace",
    "endpoint security",
    "mobile device management",
    "IT consultancy",
    "IT training",
    "Goregaon West Mumbai",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Sam Infosystems Pvt Ltd",
    title: "Sam Infosystems | IT Solutions, Cloud & Cyber Security Provider",
    description:
      "Security and cloud solutions provider with a strong focus on software. Architecting, deploying and supporting enterprise IT since 2000.",
    images: [
      {
        url: "/social-share.jpg",
        width: 1200,
        height: 630,
        alt: "Sam Infosystems, IT solutions, cloud and cyber security provider, Mumbai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sam Infosystems | IT Solutions, Cloud & Cyber Security",
    description:
      "Security and cloud solutions provider with a strong focus on software. Since 2000.",
    images: ["/social-share.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml", media: "(prefers-color-scheme: dark)" },
      { url: "/icon-light.svg", type: "image/svg+xml", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-32x32-light.png", sizes: "32x32", type: "image/png", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-96x96-light.png", sizes: "96x96", type: "image/png", media: "(prefers-color-scheme: light)" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#35c6dc" },
      { rel: "manifest", url: "/manifest.webmanifest" },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "Sam Infosystems",
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: true, address: true, email: true },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "msapplication-TileColor": "#080b12",
    "msapplication-config": "/browserconfig.xml",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#05070c" },
    { media: "(prefers-color-scheme: light)", color: "#f6f7f9" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: company.legalName,
  alternateName: [company.formerName, company.shortName],
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/android-chrome-512x512.png`,
    width: 512,
    height: 512,
  },
  image: `${siteUrl}/social-share.jpg`,
  description: company.description,
  foundingDate: "2000",
  email: company.emailGeneral,
  telephone: company.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${company.address.line1}, ${company.address.line2}`,
    addressLocality: "Mumbai",
    addressRegion: company.address.region,
    postalCode: company.address.postalCode,
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: company.phone,
      contactType: "sales",
      email: company.emailSales,
      areaServed: "IN",
      availableLanguage: ["en", "hi", "mr"],
    },
    {
      "@type": "ContactPoint",
      telephone: company.phone,
      contactType: "customer support",
      email: company.emailGeneral,
      areaServed: "IN",
      availableLanguage: ["en", "hi", "mr"],
    },
  ],
  sameAs: company.social.map((s) => s.href),
  knowsAbout: [
    "Cloud Solutions",
    "Cyber Security",
    "Managed Services",
    "Vulnerability Assessment and Penetration Testing",
    "Microsoft Azure",
    "Amazon Web Services",
    "Microsoft 365",
    "Google Workspace",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "Sam Infosystems Pvt Ltd",
  publisher: { "@id": `${siteUrl}/#organization` },
  inLanguage: "en-IN",
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const navigationSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Sam Infosystems site navigation",
  itemListElement: nav.flatMap((entry, i) =>
    "children" in entry && entry.children
      ? entry.children.map((c) => ({
          "@type": "SiteNavigationElement",
          position: i + 1,
          name: c.label,
          url: `${siteUrl}${c.href}`,
        }))
      : [
          {
            "@type": "SiteNavigationElement",
            position: i + 1,
            name: entry.label,
            url: `${siteUrl}${entry.href}`,
          },
        ],
  ),
};

/**
 * Runs before first paint. Order of preference:
 *   1. an explicit choice saved in localStorage,
 *   2. the operating system preference.
 * Dark stays the default when neither is available.
 * Kept as a string so it is inlined verbatim by React.
 */
const themeBoot = `(function(){try{
  var s = localStorage.getItem("theme");
  var d = s ? s === "light" : window.matchMedia("(prefers-color-scheme: light)").matches;
  var r = document.documentElement;
  if (d) { r.classList.add("light"); }
  r.style.colorScheme = d ? "light" : "dark";
  requestAnimationFrame(function(){ r.classList.add("theme-ready"); });
}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className="scroll-pt-24" suppressHydrationWarning>
      <body className="min-h-dvh bg-ink-950 text-mist-100 antialiased">
        {/* first thing in the document: resolves the theme before anything paints */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: themeBoot }}
        />
        <a
          href="#main"
          className="sr-only rounded-lg bg-brand-400 px-4 py-2 font-semibold text-ink-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, websiteSchema, navigationSchema]),
          }}
        />
      </body>
    </html>
  );
}
