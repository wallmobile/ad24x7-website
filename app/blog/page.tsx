import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BlogHub, type HubPost } from "@/components/blog/BlogHub";
import { JsonLd } from "@/components/JsonLd";
import { getAllPosts } from "@/lib/posts";
import { SITE, SITE_URL } from "@/lib/site";

const description = "Expert insights on digital marketing, growth strategies, and industry trends from the Ad24x7 team.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: { canonical: "/blog" },
  // re-list the site image: setting openGraph here would otherwise drop the one from app/opengraph-image.tsx
  openGraph: { type: "website", url: "/blog", title: `Blog | ${SITE.shortName}`, description, images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: `Blog | ${SITE.shortName}`, description, images: ["/opengraph-image"] },
};

export const revalidate = 60;

export default async function BlogIndex() {
  const all = await getAllPosts();
  // only plain data crosses into the client component (no icons / article bodies)
  const posts: HubPost[] = all.map(({ slug, tag, tone, title, excerpt, date, readTime }) => ({ slug, tag, tone, title, excerpt, date, readTime }));

  return (
    <main className="overflow-x-clip p-2.5 sm:p-[18px]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: `${SITE.name} Blog`,
          url: `${SITE_URL}/blog`,
          publisher: { "@id": `${SITE_URL}/#organization` },
          blogPost: all.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${SITE_URL}/blog/${p.slug}`, datePublished: p.dateISO })),
        }}
      />
      <Navbar />

      <section className="px-4 pb-20 pt-6 sm:px-6 sm:pt-8">
        <BlogHub posts={posts} />
      </section>

      <Footer />
    </main>
  );
}
