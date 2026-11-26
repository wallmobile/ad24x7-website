import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { MotionConfig } from "@/components/ui/MotionConfig";
import { JsonLd } from "@/components/JsonLd";
import { ORGANIZATION_LD, SITE, SITE_URL, WEBSITE_LD } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE.title, template: `%s | ${SITE.shortName}` },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  // sharing previews (WhatsApp, LinkedIn, Facebook, X…); the image comes from app/opengraph-image.tsx
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: "/",
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  // favicon: app/icon.svg, iOS home-screen icon: app/apple-icon.tsx (picked up automatically by Next.js)
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f4f6" },
    { media: "(prefers-color-scheme: dark)", color: "#05070a" },
  ],
};

// Runs before paint: saved choice, else the OS setting. Prevents a light flash in dark mode.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd data={ORGANIZATION_LD} />
        <JsonLd data={WEBSITE_LD} />
      </head>
      <body>
        <MotionConfig>{children}</MotionConfig>
      </body>
    </html>
  );
}
