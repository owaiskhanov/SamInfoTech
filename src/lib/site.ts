/**
 * Single source of truth for every piece of copy extracted from
 * https://saminfosystems.com. Used by the pages, the sitemap,
 * the OG-image generator and the JSON-LD structured data.
 */

export const company = {
  legalName: "Sam Infosystems Pvt Ltd",
  shortName: "Sam Infosystems",
  formerName: "SAM INFOTECH",
  founded: 2000,
  tagline: "IT Solutions, Cloud & Security",
  description:
    "Sam Infosystems Pvt Ltd is a comprehensive IT solutions provider with a strong focus on software, cloud and security technologies. Since 2000 we have helped businesses architect, deploy and adopt the latest in enterprise IT.",
  url: "https://saminfosystems.com",
  phone: "+91-9821534588",
  phoneHref: "tel:+919821534588",
  emailGeneral: "info@saminfosystems.com",
  emailSales: "sales@saminfosystems.com",
  address: {
    line1: "101-102, Neminath Square",
    line2: "Ram Mandir Signal, Swami Vivekananda Rd",
    locality: "Goregaon West, Mumbai",
    region: "Maharashtra",
    postalCode: "400104",
    country: "India",
    full: "101-102, Neminath Square, Ram Mandir Signal, Swami Vivekananda Rd, Goregaon West, Mumbai, Maharashtra 400104, India.",
    mapQuery: "Neminath+Square+Goregaon+West+Mumbai+400104",
  },
  social: [
    { label: "Facebook", href: "https://www.facebook.com/", icon: "facebook" },
    { label: "X (Twitter)", href: "https://x.com/", icon: "x" },
    { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
    { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
  ],
} as const;

export type ItemCategory = "solutions" | "security" | "products";

export type Item = {
  slug: string;
  name: string;
  /** Breadcrumb eyebrow shown above the title, e.g. "SECURITY" */
  eyebrow: string;
  category: ItemCategory;
  /** Short card blurb (truncated the way the old grid did it). */
  excerpt: string;
  /** Full copy from the original detail page. */
  body: string;
  /** 3-4 highlights written for the revamp, keep the original meaning. */
  highlights: string[];
  icon: string;
  accent: string;
};

export const items: Item[] = [
  // ----------------------------- SOLUTIONS -----------------------------
  {
    slug: "cloud-solutions",
    name: "Cloud Solutions",
    eyebrow: "SOLUTIONS",
    category: "solutions",
    icon: "cloud",
    accent: "#38bdf8",
    excerpt:
      "Our Cloud Solutions offer scalable and flexible cloud infrastructure tailored to your business needs.",
    body:
      "Our Cloud Solutions offer scalable and flexible cloud infrastructure tailored to your business needs. We provide seamless integration, ensuring high availability and performance for your applications and data.",
    highlights: [
      "Scalable, right-sized cloud infrastructure",
      "Seamless integration with your existing stack",
      "High availability for every workload",
      "Performance your applications and data deserve",
    ],
  },
  {
    slug: "migration-services",
    name: "Migration Services",
    eyebrow: "SOLUTIONS",
    category: "solutions",
    icon: "migration",
    accent: "#60a5fa",
    excerpt:
      "We specialize in smooth and efficient migration services, moving your data and applications to the cloud or new platforms with minimal disruption.",
    body:
      "We specialize in smooth and efficient migration services, moving your data and applications to the cloud or new platforms with minimal disruption. Our team ensures a secure and seamless transition.",
    highlights: [
      "Data and application migrations",
      "Cloud or cross-platform moves",
      "Minimal disruption to daily operations",
      "A secure, seamless transition",
    ],
  },
  {
    slug: "managed-services",
    name: "Managed Services",
    eyebrow: "SOLUTIONS",
    category: "solutions",
    icon: "shield-check",
    accent: "#818cf8",
    excerpt:
      "With our Managed Services, we take care of your IT infrastructure and operations, providing proactive monitoring, maintenance, and support.",
    body:
      "With our Managed Services, we take care of your IT infrastructure and operations, providing proactive monitoring, maintenance, and support. This allows you to focus on your core business activities.",
    highlights: [
      "End-to-end IT infrastructure management",
      "Proactive monitoring and maintenance",
      "Responsive day-to-day support",
      "Free your team to focus on the business",
    ],
  },
  {
    slug: "security-service-management",
    name: "Security Service Management",
    eyebrow: "SOLUTIONS",
    category: "solutions",
    icon: "lock",
    accent: "#2dd4bf",
    excerpt:
      "Our Security Service Management offers comprehensive protection for your IT environment.",
    body:
      "Our Security Service Management offers comprehensive protection for your IT environment. We implement robust security measures to safeguard your data and systems from threats and vulnerabilities.",
    highlights: [
      "Comprehensive protection for your IT environment",
      "Robust, layered security measures",
      "Safeguards data and systems",
      "Closes threats and vulnerabilities early",
    ],
  },
  {
    slug: "it-consultancy",
    name: "IT Consultancy",
    eyebrow: "SOLUTIONS",
    category: "solutions",
    icon: "compass",
    accent: "#fbbf24",
    excerpt:
      "Our IT consultancy services provide expert guidance in technology strategy, system integration, cloud adoption, and IT infrastructure management.",
    body:
      "Our IT consultancy services provide expert guidance in technology strategy, system integration, cloud adoption, and IT infrastructure management, helping businesses optimize their IT systems for improved efficiency, security, and growth.",
    highlights: [
      "Technology strategy and roadmaps",
      "System integration expertise",
      "Cloud adoption guidance",
      "Infrastructure optimised for efficiency, security and growth",
    ],
  },
  {
    slug: "it-training",
    name: "IT Training",
    eyebrow: "SOLUTIONS",
    category: "solutions",
    icon: "graduation",
    accent: "#f472b6",
    excerpt:
      "Our IT training services offer specialized courses and workshops in various technologies, including cloud computing, cybersecurity, and software development.",
    body:
      "Our IT training services offer specialized courses and workshops in various technologies, including cloud computing, cybersecurity, and software development, designed to enhance the skills of individuals and teams for better productivity and performance.",
    highlights: [
      "Specialised courses and workshops",
      "Cloud computing and cybersecurity tracks",
      "Software development upskilling",
      "Better productivity and performance for teams",
    ],
  },

  // ----------------------------- SECURITY -----------------------------
  {
    slug: "mobile-device-management-mdm",
    name: "Mobile Device Management (MDM)",
    eyebrow: "SECURITY",
    category: "security",
    icon: "devices",
    accent: "#38bdf8",
    excerpt:
      "Mobile Device Management (MDM) is a comprehensive solution that enables organizations to secure, monitor, and manage mobile devices within their network.",
    body:
      "Mobile Device Management (MDM) is a comprehensive solution that enables organizations to secure, monitor, and manage mobile devices within their network. MDM solutions offer features such as remote access, device tracking, application control, and data encryption, ensuring that mobile devices remain compliant with security policies. By centralizing device management, MDM enhances productivity, reduces security risks, and enables businesses to effectively safeguard their mobile workforce, all while maintaining control over device configurations and data access.",
    highlights: [
      "Remote access and device tracking",
      "Application control and data encryption",
      "Policy compliance across your fleet",
      "A safeguarded, productive mobile workforce",
    ],
  },
  {
    slug: "endpoint-security",
    name: "Endpoint Security",
    eyebrow: "SECURITY",
    category: "security",
    icon: "laptop-shield",
    accent: "#4ade80",
    excerpt:
      "Safeguard your organization’s network and data with our advanced Endpoint Security solutions.",
    body:
      "Safeguard your organization’s network and data with our advanced Endpoint Security solutions. Our experts provide comprehensive protection against cyber threats by securing all endpoints, including desktops, laptops, mobile devices, and servers. With real-time threat detection, automated patch management, and robust encryption, our endpoint security ensures seamless protection and compliance across your network. Strengthen your defense perimeter and maintain operational continuity with our reliable and proactive endpoint security solutions, ensuring your business stays secure, always.",
    highlights: [
      "Every endpoint: desktops, laptops, mobiles, servers",
      "Real-time threat detection",
      "Automated patch management",
      "Encryption, compliance and operational continuity",
    ],
  },
  {
    slug: "cyber-security",
    name: "Cyber Security",
    eyebrow: "SECURITY",
    category: "security",
    icon: "globe-shield",
    accent: "#2dd4bf",
    excerpt:
      "Secure your organization with our premier Cybersecurity services. Our expert team will protect your systems, networks, and data from cyber threats.",
    body:
      "Secure your organization with our premier Cybersecurity services. Our expert team will protect your systems, networks, and data from cyber threats, ensuring compliance and safeguarding sensitive information. With advanced threat detection, real-time monitoring, and robust defence mechanisms, our cybersecurity solutions enhance your security posture and operational efficiency. Protect your business with our top-tier cybersecurity services, your security is our priority.",
    highlights: [
      "Systems, networks and data protected",
      "Advanced threat detection",
      "Real-time monitoring",
      "Compliance and robust defence mechanisms",
    ],
  },
  {
    slug: "firewall",
    name: "Firewall",
    eyebrow: "SECURITY",
    category: "security",
    icon: "firewall",
    accent: "#fb7185",
    excerpt:
      "Enhance your organization’s security with our advanced Firewall services. Our expert team will monitor and control network traffic to block threats.",
    body:
      "Enhance your organization’s security with our advanced Firewall services. Our expert team will monitor and control network traffic to block threats, prevent hacking, and stop virus attacks. Our firewalls also protect against spyware and ensure data privacy, providing a robust defence against cyber threats. Regular firewall management not only strengthens your security posture but also ensures compliance with regulatory standards and effective risk management. Safeguard your sensitive information with our top-notch firewall services, your security is our priority.",
    highlights: [
      "Network traffic monitoring and control",
      "Blocks threats, hacking and virus attacks",
      "Spyware protection and data privacy",
      "Regulatory compliance and risk management",
    ],
  },
  {
    slug: "vapt",
    name: "VAPT",
    eyebrow: "SECURITY",
    category: "security",
    icon: "bug",
    accent: "#f59e0b",
    excerpt:
      "Boost your organization’s security with our top-notch Vulnerability Assessment and Penetration Testing (VAPT) services.",
    body:
      "Boost your organization’s security with our top-notch Vulnerability Assessment and Penetration Testing (VAPT) services. We identify and exploit vulnerabilities in your systems, providing detailed reports and actionable recommendations. Regular VAPT ensures enhanced security, regulatory compliance, and effective risk management. Protect your sensitive information from cyber threats with our expert VAPT services, your security is our priority.",
    highlights: [
      "Vulnerability assessment and penetration testing",
      "Real-world exploitation of weaknesses",
      "Detailed reports with actionable fixes",
      "Enhanced security and regulatory compliance",
    ],
  },

  // ----------------------------- PRODUCTS -----------------------------
  {
    slug: "microsoft-azure",
    name: "Microsoft Azure",
    eyebrow: "PRODUCTS",
    category: "products",
    icon: "azure",
    accent: "#38bdf8",
    excerpt:
      "Azure is a comprehensive set of cloud services that developers and IT professionals use to build, deploy, and manage applications.",
    body:
      "Azure is a comprehensive set of cloud services that developers and IT professionals use to build, deploy, and manage applications through a global network of data centers.",
    highlights: [
      "Build, deploy and manage applications",
      "A global network of data centers",
      "Services for developers and IT pros",
      "Enterprise-grade scale and resilience",
    ],
  },
  {
    slug: "amazon-web-services-aws",
    name: "Amazon Web Services (AWS)",
    eyebrow: "PRODUCTS",
    category: "products",
    icon: "aws",
    accent: "#fbbf24",
    excerpt:
      "Amazon Web Services is a leading cloud computing platform that offers a wide range of services, including computing power, storage, networking, databases, AI/ML, and IoT.",
    body:
      "Amazon Web Services is a leading cloud computing platform that offers a wide range of services, including computing power, storage, networking, databases, AI/ML, and IoT. It enables businesses to innovate faster with a highly flexible and secure global infrastructure.",
    highlights: [
      "Computing, storage and networking",
      "Databases, AI/ML and IoT services",
      "Highly flexible, secure global infrastructure",
      "Innovate faster with managed services",
    ],
  },
  {
    slug: "microsoft-365",
    name: "Microsoft 365",
    eyebrow: "PRODUCTS",
    category: "products",
    icon: "microsoft365",
    accent: "#60a5fa",
    excerpt:
      "Office 365 offers subscription plans that include access to Office applications and other productivity services enabled over the Internet.",
    body:
      "Office 365 offers subscription plans that include access to Office applications and other productivity services enabled over the Internet. It includes plans for home and business use.",
    highlights: [
      "Subscription access to Office applications",
      "Productivity services delivered over the internet",
      "Plans for home and business",
      "Always-current, cloud-connected tooling",
    ],
  },
  {
    slug: "adobe-creative-cloud",
    name: "Adobe Creative Cloud",
    eyebrow: "PRODUCTS",
    category: "products",
    icon: "adobe",
    accent: "#f472b6",
    excerpt:
      "Adobe Creative Cloud offers a suite of tools for graphic design, video editing, web development, and photography.",
    body:
      "Adobe Creative Cloud offers a suite of tools for graphic design, video editing, web development, and photography. It includes popular apps like Photoshop, Illustrator, and Premiere Pro, with cloud storage for seamless collaboration and accessibility.",
    highlights: [
      "Photoshop, Illustrator, Premiere Pro and more",
      "Graphic design, video, web and photography",
      "Cloud storage for your assets",
      "Seamless collaboration and accessibility",
    ],
  },
  {
    slug: "tally-erp-9",
    name: "Tally ERP.9",
    eyebrow: "PRODUCTS",
    category: "products",
    icon: "tally",
    accent: "#4ade80",
    excerpt:
      "Tally ERP.9 is GST-ready ERP software used for billing, accounting, inventory management, and purchases.",
    body:
      "Tally ERP.9 is GST-ready ERP software used for billing, accounting, inventory management, and purchases by over a million businesses across 100 countries.",
    highlights: [
      "GST-ready billing and accounting",
      "Inventory management and purchases",
      "Trusted by over a million businesses",
      "In use across 100 countries",
    ],
  },
  {
    slug: "coreldraw-graphics-suite-x7",
    name: "CorelDRAW Graphics Suite X7",
    eyebrow: "PRODUCTS",
    category: "products",
    icon: "coreldraw",
    accent: "#facc15",
    excerpt:
      "CorelDRAW is a vector graphics editor developed and marketed by Corel Corporation.",
    body:
      "CorelDRAW is a vector graphics editor developed and marketed by Corel Corporation. It includes CorelDRAW and Corel Photo-Paint along with other graphic-related programs for professional design needs.",
    highlights: [
      "Professional vector graphics editing",
      "Includes CorelDRAW and Photo-Paint",
      "A full suite of graphic tools",
      "Built for professional design work",
    ],
  },
  {
    slug: "sophos-cyberoam",
    name: "Sophos Cyberoam",
    eyebrow: "PRODUCTS",
    category: "products",
    icon: "sophos",
    accent: "#818cf8",
    excerpt:
      "Offers comprehensive perimeter protection with its range of Network Security appliances (UTMs/Next Generation Firewalls).",
    body:
      "Offers comprehensive perimeter protection with its range of Network Security appliances (UTMs/Next Generation Firewalls), centralized management appliances, and centralized reporting solutions.",
    highlights: [
      "UTMs and Next-Generation Firewalls",
      "Centralised management appliances",
      "Centralised reporting solutions",
      "Comprehensive perimeter protection",
    ],
  },
  {
    slug: "fortinet",
    name: "Fortinet",
    eyebrow: "PRODUCTS",
    category: "products",
    icon: "fortinet",
    accent: "#fb7185",
    excerpt:
      "The FortiGate next-gen firewall is a high-performance network security appliance.",
    body:
      "The FortiGate next-gen firewall is a high-performance network security appliance that adds intrusion prevention, application and user visibility, SSL inspection, and unknown threat detection to the traditional firewall.",
    highlights: [
      "High-performance FortiGate NGFW",
      "Intrusion prevention built in",
      "Application and user visibility",
      "SSL inspection and unknown threat detection",
    ],
  },
  {
    slug: "autocad",
    name: "AutoCAD",
    eyebrow: "PRODUCTS",
    category: "products",
    icon: "autocad",
    accent: "#f97316",
    excerpt:
      "AutoCAD is a computer-aided design (CAD) software developed by Autodesk, widely used by architects, engineers, and construction professionals.",
    body:
      "AutoCAD is a computer-aided design (CAD) software developed by Autodesk, widely used by architects, engineers, and construction professionals. It provides powerful tools for 2D and 3D drafting, modelling, and visualization, enabling users to create precise drawings and designs with ease. AutoCAD supports automation, collaboration, and customization, making it a versatile tool for various industries.",
    highlights: [
      "Powerful 2D and 3D drafting",
      "Modelling and visualisation tools",
      "Automation, collaboration and customisation",
      "Built for architects and engineers",
    ],
  },
  {
    slug: "google-workspace",
    name: "Google Workspace",
    eyebrow: "PRODUCTS",
    category: "products",
    icon: "googleworkspace",
    accent: "#34d399",
    excerpt:
      "Google Workspace is a cloud-based productivity suite that includes Gmail, Google Drive, Docs, Sheets, Meet, and more.",
    body:
      "Google Workspace is a cloud-based productivity suite that includes Gmail, Google Drive, Docs, Sheets, Meet, and more. It enables seamless collaboration, secure data storage, and communication for businesses of all sizes.",
    highlights: [
      "Gmail, Drive, Docs, Sheets and Meet",
      "Seamless real-time collaboration",
      "Secure cloud data storage",
      "For businesses of all sizes",
    ],
  },
  {
    slug: "hr-solutions",
    name: "HR Solutions",
    eyebrow: "PRODUCTS",
    category: "products",
    icon: "hr",
    accent: "#a78bfa",
    excerpt:
      "HR solutions provides an all-in-one cloud-based HR management solution, offering payroll processing, leave and attendance tracking, employee management, and compliance management.",
    body:
      "HR solutions provides an all-in-one cloud-based HR management solution, offering payroll processing, leave and attendance tracking, employee management, and compliance management. It helps businesses streamline HR operations and enhance employee experience with user-friendly features.",
    highlights: [
      "Payroll processing",
      "Leave and attendance tracking",
      "Employee and compliance management",
      "Streamlined HR operations",
    ],
  },
];

export const categories = [
  {
    key: "solutions" as const,
    label: "Solutions",
    title: "Solutions that carry your business",
    blurb:
      "From cloud infrastructure to training, we architect, deploy and support the technology your teams rely on every day.",
  },
  {
    key: "security" as const,
    title: "Security that never blinks",
    label: "Security",
    blurb:
      "Layered, continuously monitored defence for your networks, endpoints, devices and data.",
  },
  {
    key: "products" as const,
    title: "Products we deliver and support",
    label: "Products",
    blurb:
      "Licensed, deployed and supported by Sam Infosystems: the platforms your business already trusts.",
  },
];

export const getItem = (slug: string) => items.find((i) => i.slug === slug);
export const byCategory = (key: ItemCategory) => items.filter((i) => i.category === key);

export const about = {
  intro:
    "Sam Infosystems Pvt Ltd, formerly known as SAM INFOTECH, is a comprehensive IT solutions provider with a strong focus on software and cloud technologies. Established in 2000, the company was founded with a visionary approach to architect, deploy, and guide customers in adopting the latest advancements in IT technology.",
  intro2:
    "Over the years, we have remained committed to our core values of delivering not just superior IT services but also offering strategic consultation and reliable guidance to our clients. At Sam Infosystems, we measure success not by the number of sales but by the quality of relationships we build. Every new project is a partnership, and every partnership is an opportunity to grow together. We empower businesses by enabling them to embrace innovation while ensuring a seamless and customer-centric experience at every step.",
  homeIntro:
    "Over the years, we have remained committed to our core values of delivering not just superior IT services but also offering strategic consultation and reliable guidance to our clients. At Sam Infosystems, we measure success not by the number of sales but by the quality of relationships we build. Every new project is a partnership, and every partnership is an opportunity to grow together. We empower businesses by enabling them to embrace innovation while ensuring a seamless and customer-centric experience at every step. Our vision is To be a globally trusted IT solutions provider, recognized for our commitment to innovation, excellence, and building enduring relationships and to empower businesses by bridging the gap between technology and success, enabling them to thrive in an ever-evolving digital landscape.",
  mission:
    "Our mission is to not only provide exceptional IT services but to foster long-lasting relationships by offering timely consultation, guidance, and a customer-centric approach. We are dedicated to enabling our clients to embrace the latest technologies and achieve their goals through collaboration and trust.",
  vision:
    "Our vision is to be a globally trusted IT solutions provider, recognized for our commitment to innovation, excellence, and building enduring relationships, and to empower businesses by bridging the gap between technology and success, enabling them to thrive in an ever-evolving digital landscape.",
  values: [
    {
      title: "Relationships over sales",
      body: "We measure success by the quality of the relationships we build, not by the number of deals we close.",
      icon: "handshake",
    },
    {
      title: "Partnership by default",
      body: "Every new project is a partnership, and every partnership is an opportunity to grow together.",
      icon: "partners",
    },
    {
      title: "Guidance, not just delivery",
      body: "Strategic consultation and reliable guidance sit alongside superior IT services on every engagement.",
      icon: "compass",
    },
    {
      title: "Customer-centric innovation",
      body: "We help businesses embrace innovation while keeping the experience seamless and customer-centric.",
      icon: "spark",
    },
  ],
};

export const heroSlides = [
  {
    eyebrow: "Since 2000",
    titleLead: "Security Solutions",
    titleAccent: "Provider",
    subtitle: "With a strong focus on software and security",
    body:
      "Layered, continuously monitored defence across your networks, endpoints, devices and data, delivered by a team that has been doing it since 2000.",
    stat: "24×7 monitoring & response",
    cta: { label: "Explore security", href: "/solutions#security" },
  },
  {
    eyebrow: "Cloud · Software",
    titleLead: "Cloud Solutions",
    titleAccent: "Provider",
    subtitle: "With a strong focus on software and cloud technologies",
    body:
      "Architect, migrate and operate cloud infrastructure built for high availability: Azure, AWS and Google Cloud, supported end to end by Sam Infosystems.",
    stat: "Multi-cloud, single partner",
    cta: { label: "Explore cloud", href: "/solutions#solutions" },
  },
];

export const stats = [
  { value: 2000, label: "Founded in", display: "2000", suffix: "" },
  { value: 100, label: "Countries our products reach", display: "100+", suffix: "+" },
  { value: 1, label: "Million+ businesses use the tools we deliver", display: "1M+", suffix: "" },
  { value: 22, label: "Services, security & products under one roof", display: "22", suffix: "" },
];

export const quote = {
  title: "Get a Free Quote",
  subtitle: "Please fill this form and we'll get back to you as soon as possible!",
  services: ["Online Store", "Website Presentation", "Marketing", "SEO & SEM"],
  budgets: ["Under $1000", "Between $1000 - $3000", "Between $3000 - $10000", "Over $10000"],
};

export const offer = {
  title: "Enjoy 15% Off",
  subtitle: "Sign up to receive the latest offers and news in industry.",
  finePrint:
    "Offer valid only for new email subscribers. Enter your email address and receive 15% off your first order and a promo code will be sent to your inbox. Exclusions apply.",
};

export type NavEntry = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const nav: NavEntry[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "Cloud Solutions", href: "/portfolio/cloud-solutions" },
      { label: "Migration Services", href: "/portfolio/migration-services" },
      { label: "Managed Services", href: "/portfolio/managed-services" },
      { label: "Security Service Management", href: "/portfolio/security-service-management" },
      { label: "IT Consultancy", href: "/portfolio/it-consultancy" },
      { label: "IT Training", href: "/portfolio/it-training" },
    ],
  },
  {
    label: "Security",
    href: "/security",
    children: [
      { label: "Mobile Device Management (MDM)", href: "/portfolio/mobile-device-management-mdm" },
      { label: "Endpoint Security", href: "/portfolio/endpoint-security" },
      { label: "Cyber Security", href: "/portfolio/cyber-security" },
      { label: "Firewall", href: "/portfolio/firewall" },
      { label: "VAPT", href: "/portfolio/vapt" },
    ],
  },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Microsoft Azure", href: "/portfolio/microsoft-azure" },
      { label: "Amazon Web Services (AWS)", href: "/portfolio/amazon-web-services-aws" },
      { label: "Microsoft 365", href: "/portfolio/microsoft-365" },
      { label: "Adobe Creative Cloud", href: "/portfolio/adobe-creative-cloud" },
      { label: "Tally ERP.9", href: "/portfolio/tally-erp-9" },
      { label: "CorelDRAW Graphics Suite X7", href: "/portfolio/coreldraw-graphics-suite-x7" },
      { label: "Sophos Cyberoam", href: "/portfolio/sophos-cyberoam" },
      { label: "Fortinet", href: "/portfolio/fortinet" },
      { label: "AutoCAD", href: "/portfolio/autocad" },
      { label: "Google Workspace", href: "/portfolio/google-workspace" },
      { label: "HR Solutions", href: "/portfolio/hr-solutions" },
    ],
  },
  { label: "Contact Us", href: "/contact-us" },
];
