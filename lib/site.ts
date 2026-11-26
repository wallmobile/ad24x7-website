/** Site-wide constants used for metadata, sharing previews, JSON-LD and the sitemap. */

// Set NEXT_PUBLIC_SITE_URL in your hosting env if the live domain is different.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://ad24x7.com").replace(/\/$/, "");

export const SITE = {
  name: "Ad24x7 Technologies",
  shortName: "Ad24x7",
  title: "Ad24x7 Technologies – Digital Marketing Agency",
  description:
    "Ad24x7 Technologies is a full-spectrum digital marketing agency delivering performance-driven solutions across web, social, search, and beyond.",
  email: "hello@ad24x7.com",
  foundingYear: "2018",
  country: "IN",
  locale: "en_IN",
};

/** schema.org data describing the business — read by Google for the knowledge panel / rich results. */
export const ORGANIZATION_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: SITE.name,
  alternateName: SITE.shortName,
  url: SITE_URL,
  logo: `${SITE_URL}/logo-light.png`,
  image: `${SITE_URL}/opengraph-image`,
  description: SITE.description,
  email: SITE.email,
  foundingDate: SITE.foundingYear,
  address: { "@type": "PostalAddress", addressCountry: SITE.country },
  areaServed: SITE.country,
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "10:00",
    closes: "19:00",
  },
  knowsAbout: [
    "Website Designing",
    "Performance Marketing",
    "Social Media Marketing",
    "Retention Marketing",
    "Content Marketing",
    "SEO",
    "Print Media",
    "Influencer Marketing",
    "PR Marketing",
  ],
  // TODO: add the real profile URLs (LinkedIn, Instagram…) once they're available:
  // sameAs: ["https://www.linkedin.com/company/…", "https://www.instagram.com/…"],
};

export const WEBSITE_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE.name,
  url: SITE_URL,
  inLanguage: "en-IN",
  publisher: { "@id": `${SITE_URL}/#organization` },
};
