import type { Metadata } from "next";
import { CollectionPage } from "@/components/CollectionPage";

export const metadata: Metadata = {
  title: "Cloud, Migration & Managed IT Solutions",
  description:
    "Cloud solutions, migration services, managed services, security service management, IT consultancy and IT training, delivered end to end from Mumbai.",
  alternates: { canonical: "/solutions" },
  openGraph: {
    title: "Cloud, migration & managed IT solutions",
    description:
      "Scalable cloud infrastructure, smooth migrations, proactive managed services and expert IT consultancy.",
    images: ["/social-share.jpg"],
  },
};

export default function SolutionsPage() {
  return <CollectionPage category="solutions" />;
}
