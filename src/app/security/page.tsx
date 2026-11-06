import type { Metadata } from "next";
import { CollectionPage } from "@/components/CollectionPage";

export const metadata: Metadata = {
  title: "Cyber Security, VAPT & Firewall Services",
  description:
    "Enterprise security services: cyber security, VAPT, firewall management, endpoint security and mobile device management (MDM) from Sam Infosystems.",
  alternates: { canonical: "/security" },
  openGraph: {
    title: "Cyber security, VAPT & firewall services",
    description:
      "Layered, continuously monitored defence for networks, endpoints, devices and data.",
    images: ["/social-share.jpg"],
  },
};

export default function SecurityPage() {
  return <CollectionPage category="security" />;
}
