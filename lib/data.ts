import {
  BarChart3,
  Mail,
  Megaphone,
  MonitorSmartphone,
  Newspaper,
  PenLine,
  Printer,
  RefreshCcw,
  Search,
  Share2,
  Star,
  TrendingUp,
  Youtube,
  Instagram,
  Linkedin,
  Facebook,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";

export const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "blog" },
  { label: "Contact", href: "#contact" },
] as const;

export const HERO = {
  eyebrow: "Since 2018 · Grow your Business",
  title: {
    before: "We Grow Brands in the ",
    accent: "Digital",
    after: " Universe",
  },
  sub: "Ad24x7 Technologies is a full-spectrum digital marketing agency delivering performance-driven solutions across web, social, search, and beyond.",
};

export const PLATFORMS: { name: string; icon: LucideIcon }[] = [
  { name: "Google Ads", icon: Search },
  { name: "Meta", icon: Facebook },
  { name: "YouTube", icon: Youtube },
  { name: "Instagram", icon: Instagram },
  { name: "LinkedIn", icon: Linkedin },
  { name: "WhatsApp", icon: MessageCircle },
];

export const MARQUEE_SERVICES: { name: string; icon: LucideIcon }[] = [
  { name: "Website Design", icon: MonitorSmartphone },
  { name: "Performance Marketing", icon: TrendingUp },
  { name: "Social Media", icon: Share2 },
  { name: "SEO", icon: Search },
  { name: "Content Marketing", icon: PenLine },
  { name: "Influencer Marketing", icon: Star },
  { name: "PR Marketing", icon: Newspaper },
  { name: "Retention Marketing", icon: RefreshCcw },
  { name: "Print Media", icon: Printer },
];

export const STATS = [
  { value: "7+", label: "Years of Excellence" },
  { value: "500+", label: "Projects Delivered" },
  { value: "200+", label: "Happy Clients" },
  { value: "9", label: "Core Services" },
];

export const WHY = {
  title: "Strategy meets",
  accent: "creativity",
  sub: "We blend data intelligence with bold creative thinking to build campaigns that don't just look good — they perform.",
  features: [
    {
      title: "Performance-First Approach",
      desc: "Every strategy is built around measurable outcomes and real business growth, not vanity metrics.",
      tone: "blue" as const,
    },
    {
      title: "Full-Funnel Expertise",
      desc: "From awareness to conversion and retention — we cover every stage of the customer journey.",
      tone: "blue" as const,
    },
    {
      title: "Dedicated Partnership",
      desc: "Your success is our success. We work as an extension of your team, not just another vendor.",
      tone: "dark" as const,
    },
  ],
};

export type Service = {
  num: string;
  name: string;
  desc: string;
  icon: LucideIcon;
};

export const SERVICES: Service[] = [
  {
    num: "01",
    icon: MonitorSmartphone,
    name: "Website Designing",
    desc: "We craft visually stunning, mobile-first websites with seamless UX. Landing pages, e-commerce stores, portfolios — built for speed, conversions, and brand impact.",
  },
  {
    num: "02",
    icon: BarChart3,
    name: "Performance Marketing",
    desc: "Precision-targeted paid media campaigns on Google Ads, Meta, YouTube & more. We optimise for ROAS, CPL & real business metrics — not just clicks.",
  },
  {
    num: "03",
    icon: Share2,
    name: "Social Media Marketing",
    desc: "Strategic content calendars, community management, and creative campaigns across Instagram, Facebook, LinkedIn, Twitter/X, and YouTube.",
  },
  {
    num: "04",
    icon: RefreshCcw,
    name: "Retention Marketing",
    desc: "Email automation, WhatsApp campaigns, push notifications & loyalty programs to bring customers back and maximise CLV.",
  },
  {
    num: "05",
    icon: PenLine,
    name: "Content Marketing",
    desc: "Blog writing, video scripts, infographics, case studies and more — strategic content that positions your brand as an authority.",
  },
  {
    num: "06",
    icon: Search,
    name: "SEO",
    desc: "Technical audits, on-page optimisation, link building and local SEO to drive sustainable organic traffic and higher rankings.",
  },
  {
    num: "07",
    icon: Printer,
    name: "Print Media",
    desc: "Brochures, hoardings, newspaper ads, banners & OOH — creative print campaigns that make your brand unforgettable offline.",
  },
  {
    num: "08",
    icon: Star,
    name: "Influencer Marketing",
    desc: "Curated collaborations with micro to mega influencers across niches — driving authentic brand advocacy and measurable reach.",
  },
  {
    num: "09",
    icon: Newspaper,
    name: "PR Marketing",
    desc: "Press releases, media outreach, crisis communication and thought leadership — building your brand's reputation and credibility.",
  },
];

export const CTA = {
  title: "Ready to scale your brand?",
  sub: "Let's build a custom strategy tailored to your business goals. Free consultation, no commitment.",
};

export type BlogTag =
  | "Performance"
  | "SEO"
  | "Social Media"
  | "Influencer"
  | "Retention"
  | "Content";

export const BLOG_FILTERS: ("All" | BlogTag)[] = [
  "All",
  "Performance",
  "SEO",
  "Social Media",
  "Influencer",
  "Retention",
  "Content",
];

export const POSTS: {
  tag: BlogTag;
  icon: LucideIcon;
  meta: string;
  title: string;
  excerpt: string;
  tone: "blue" | "dark" | "sky";
}[] = [
  {
    tag: "Performance",
    icon: BarChart3,
    tone: "blue",
    meta: "March 01, 2026 · 6 min read",
    title:
      "How to Slash Your Cost-Per-Lead by 40% with Smart Google Ads Restructuring",
    excerpt:
      "Most brands waste 60% of their ad budget on poorly structured campaigns. Here's the exact framework we use to fix that...",
  },
  {
    tag: "SEO",
    icon: Search,
    tone: "dark",
    meta: "Feb 22, 2026 · 8 min read",
    title: "The 2026 SEO Playbook: What's Changed and What Actually Works Now",
    excerpt:
      "Google's algorithm has shifted dramatically. Here's what signals matter most in 2026 for sustainable organic rankings...",
  },
  {
    tag: "Social Media",
    icon: Share2,
    tone: "sky",
    meta: "Feb 15, 2026 · 5 min read",
    title:
      "Instagram Reels vs YouTube Shorts: Where Should Your Brand Invest in 2026?",
    excerpt:
      "Short-form video dominates — but the platform you choose can make or break your reach. Here's a data-backed breakdown...",
  },
  {
    tag: "Influencer",
    icon: Star,
    tone: "dark",
    meta: "Feb 08, 2026 · 7 min read",
    title: "Micro vs Mega Influencers: Which Drives Better ROI for Your Brand?",
    excerpt:
      "More followers doesn't always mean more sales. Our analysis of 50+ influencer campaigns reveals some surprising truths...",
  },
  {
    tag: "Retention",
    icon: RefreshCcw,
    tone: "blue",
    meta: "Jan 28, 2026 · 6 min read",
    title: "WhatsApp Marketing in 2026: Strategies That Actually Convert",
    excerpt:
      "WhatsApp Business API has matured — and brands using it right are seeing 3x the engagement of email. Here's how...",
  },
  {
    tag: "Content",
    icon: PenLine,
    tone: "sky",
    meta: "Jan 20, 2026 · 9 min read",
    title:
      "Content That Converts: The Ultimate Framework for B2C Brands in India",
    excerpt:
      "From vernacular content to viral storytelling — here's how India's top brands are winning with content in 2026...",
  },
];

export const ABOUT = {
  p1: "Ad24x7 Technologies was founded with a single, bold ambition: to make enterprise-grade digital marketing accessible to every ambitious brand. Since 2018, we've grown into a full-service agency with a passionate team of strategists, designers, media buyers, content creators, and tech experts — all working under one roof to deliver results that matter.",
  p2: "We believe marketing is not just about visibility — it's about building brands that people genuinely love, trust, and return to.",
};

export const TEAM = [
  { ini: "RK", name: "Rahul Kumar", role: "Founder & CEO" },
  { ini: "PS", name: "Priya Sharma", role: "Head of Performance" },
  { ini: "AV", name: "Arjun Verma", role: "Creative Director" },
  { ini: "SM", name: "Sneha Mehta", role: "SEO Strategist" },
  { ini: "NK", name: "Nikhil Kapoor", role: "Social Media Lead" },
  { ini: "DT", name: "Divya Tiwari", role: "Content Head" },
];

export const VALUES = [
  {
    name: "Results-Driven",
    desc: "Every decision is tied to measurable outcomes and real business impact.",
  },
  {
    name: "Innovation",
    desc: "We stay ahead of trends, always experimenting with what's next.",
  },
  {
    name: "Transparency",
    desc: "Open communication, honest reporting, no hidden agendas.",
  },
  {
    name: "Growth Mindset",
    desc: "We grow when our clients grow — it's a true partnership.",
  },
  {
    name: "Passion",
    desc: "We genuinely love what we do and it shows in every campaign.",
  },
];

export const CONTACT_SERVICES = [
  "Website Designing",
  "Performance Marketing",
  "Social Media Marketing",
  "Retention Marketing",
  "Content Marketing",
  "SEO",
  "Print Media",
  "Influencer Marketing",
  "PR Marketing",
  "Full-Service Package",
];

export const FOOTER = {
  blurb:
    "A leading digital marketing agency helping ambitious brands grow online since 2018. Strategy. Creativity. Results.",
  columns: [
    {
      title: "Services",
      links: [
        "Website Designing",
        "Performance Marketing",
        "Social Media",
        "SEO",
        "Content Marketing",
        "Influencer Marketing",
      ].map((l) => ({ label: l, href: "#services" })),
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#about" },
        { label: "Blog", href: "#blog" },
        { label: "Contact", href: "#contact" },
        { label: "Careers", href: "#" },
        { label: "Case Studies", href: "#" },
      ],
    },
    {
      title: "Quick Connect",
      links: [
        { label: "hello@ad24x7.com", href: "mailto:hello@ad24x7.com" },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
      ],
    },
  ],
};

export const ICONS = { Mail, Megaphone };
