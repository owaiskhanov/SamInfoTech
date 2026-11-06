import type { MetadataRoute } from "next";
import { company } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/_next/"] },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
    ],
    sitemap: `${company.url}/sitemap.xml`,
    host: company.url,
  };
}
