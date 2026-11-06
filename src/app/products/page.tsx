import type { Metadata } from "next";
import { CollectionPage } from "@/components/CollectionPage";

export const metadata: Metadata = {
  title: "Azure, AWS, Microsoft 365 & Google Workspace",
  description:
    "Licensed and supported by Sam Infosystems: Azure, AWS, Microsoft 365, Adobe Creative Cloud, Tally, CorelDRAW, Sophos, Fortinet, AutoCAD and more.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Azure, AWS, Microsoft 365 & Google Workspace",
    description:
      "The enterprise platforms your business already trusts, licensed and supported locally.",
    images: ["/social-share.jpg"],
  },
};

export default function ProductsPage() {
  return <CollectionPage category="products" />;
}
