import type { MetadataRoute } from "next";
import { company, items } from "@/lib/site";

const base = company.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about-us`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/solutions`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/security`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/products`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/contact-us`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
  ];

  const detail: MetadataRoute.Sitemap = items.map((i) => ({
    url: `${base}/portfolio/${i.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...pages, ...detail];
}
