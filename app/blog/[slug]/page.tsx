import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { PostArt, toneBg } from "@/components/blog/postArt";
import { ShareLinks } from "@/components/blog/ShareLinks";
import { BlogHeroScene } from "@/components/blog/BlogHeroScene";
import { JsonLd } from "@/components/JsonLd";
import { BLOG_FILTERS } from "@/lib/data";
import { getAllPosts, getPost } from "@/lib/posts";
import { SITE, SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

// new WordPress posts are rendered on first visit, then cached and refreshed every 60s
export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: post.title, description: post.excerpt, publishedTime: post.dateISO, section: post.tag },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

/** category names typed into the hero search box */
const TOPICS: string[] = BLOG_FILTERS.filter((t) => t !== "All");

/** WordPress / static article HTML, styled to match the site (no per-tag components needed) */
function Body({ html }: { html: string }) {
  return (
    <div
      className="text-[17px] leading-[1.8] text-ink-2 [&>p:first-child]:text-[19px] [&>p:first-child]:leading-[1.75] [&>p:first-child]:text-ink [&_a]:font-medium [&_a]:text-brand-700 [&_a]:underline [&_a]:underline-offset-2 [&_blockquote]:my-8 [&_blockquote]:rounded-2xl [&_blockquote]:border [&_blockquote]:border-brand/20 [&_blockquote]:bg-brand-100/60 [&_blockquote]:p-5 [&_blockquote]:font-display [&_blockquote]:text-[18px] [&_blockquote]:font-medium [&_blockquote]:text-ink dark:[&_blockquote]:bg-brand/10 [&_figure]:my-8 [&_figcaption]:mt-2 [&_figcaption]:text-center [&_figcaption]:text-[13px] [&_figcaption]:text-muted [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:scroll-mt-28 [&_h2]:font-display [&_h2]:text-[26px] [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:tracking-[-0.025em] [&_h2]:text-ink [&_h3]:mb-2 [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-[21px] [&_h3]:font-semibold [&_h3]:text-ink [&_iframe]:aspect-video [&_iframe]:h-auto [&_iframe]:w-full [&_iframe]:rounded-2xl [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-2xl [&_li]:pl-1 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_p]:my-5 [&_strong]:font-semibold [&_strong]:text-ink [&_table]:my-6 [&_table]:w-full [&_table]:text-left [&_td]:border [&_td]:border-line [&_td]:p-2 [&_th]:border [&_th]:border-line [&_th]:p-2 [&_ul]:my-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:marker:text-brand"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

const sideCard = "rounded-[26px] border border-line bg-card p-5 shadow-[0_14px_40px_rgba(29,102,150,.06)]";

export default async function PostPage({ params }: Props) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  const related = (await getAllPosts()).filter((p) => p.slug !== post.slug).slice(0, 3);
  const toc = post.headings;
  const url = `${SITE_URL}/blog/${post.slug}`;

  return (
    <main className="overflow-x-clip p-2.5 sm:p-[18px]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.dateISO,
          articleSection: post.tag,
          url,
          mainEntityOfPage: url,
          image: `${url}/opengraph-image`,
          author: { "@type": "Organization", name: SITE.name, url: SITE_URL },
          publisher: { "@id": `${SITE_URL}/#organization` },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
            { "@type": "ListItem", position: 3, name: post.title, item: url },
          ],
        }}
      />
      <Navbar />

      <article className="px-4 pb-20 pt-6 sm:px-6 sm:pt-8">
        <div className="mx-auto max-w-[1200px]">
          {/* ───────── hero ───────── */}
          <header className="relative overflow-hidden rounded-[32px] border border-line bg-gradient-to-br from-[#f5fafe] via-[#eaf4fb] to-[#d4e9f7] p-6 shadow-[0_30px_80px_rgba(29,102,150,.1)] sm:p-9 lg:p-11 dark:from-[#0e1a26] dark:via-[#0b1520] dark:to-[#0a2236] dark:shadow-[0_30px_80px_rgba(0,0,0,.45)]">
            <div className="relative grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1.5 text-[13px] font-medium text-muted">
                  <Link href="/" className="transition-colors hover:text-brand-700">
                    Home
                  </Link>
                  <ChevronRight size={13} aria-hidden />
                  <Link href="/blog" className="transition-colors hover:text-brand-700">
                    Blog
                  </Link>
                  <ChevronRight size={13} aria-hidden />
                  <span aria-current="page" className="text-ink-2">
                    {post.tag}
                  </span>
                </nav>

                <p className="flex flex-wrap items-center gap-3 text-[12.5px]">
                  <span className="rounded-full bg-white px-3 py-1 font-bold text-[#0a0c10] shadow-[0_4px_12px_rgba(29,102,150,.12)] dark:bg-white/90">{post.tag}</span>
                  <time dateTime={post.dateISO} className="font-medium text-muted">
                    {post.date}
                  </time>
                  <span className="font-medium text-muted">· {post.readTime}</span>
                </p>
                <h1 className="mt-4 font-display text-[clamp(30px,3.8vw,48px)] font-semibold leading-[1.08] tracking-[-0.04em]">{post.title}</h1>
                <p className="mt-4 max-w-[560px] text-[16.5px] leading-relaxed text-muted">{post.excerpt}</p>
              </div>

              <BlogHeroScene topics={TOPICS} />
            </div>
          </header>

          {/* ───────── article + sidebar ───────── */}
          <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_300px]">
            <div className="rounded-[28px] border border-line bg-card p-6 shadow-[0_14px_40px_rgba(29,102,150,.06)] sm:p-10">
              <div className="mx-auto max-w-[700px]">
                <Body html={post.html} />

                <div className="mt-10 flex items-center gap-3.5 border-t border-line pt-6">
                  <span className="glossy-blue flex size-11 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white">A7</span>
                  <div>
                    <p className="font-display text-[15.5px] font-semibold text-ink">{SITE.name}</p>
                    <p className="text-[13px] text-muted">Strategy. Creativity. Results.</p>
                  </div>
                </div>
              </div>
            </div>

            <aside className="space-y-5 lg:sticky lg:top-28" aria-label="Article sidebar">
              {toc.length > 1 && (
                <nav className={sideCard} aria-label="On this page">
                  <h2 className="font-display text-[17px] font-semibold text-ink">On this page</h2>
                  <ol className="mt-3 divide-y divide-line">
                    {toc.map((h, i) => (
                      <li key={h.id}>
                        <a href={`#${h.id}`} className="group flex items-start gap-3 py-2.5 text-[14px] font-medium leading-snug text-ink-2 transition-colors hover:text-brand-700">
                          <span className="mt-px font-display text-[13px] font-bold text-brand">{String(i + 1).padStart(2, "0")}</span>
                          {h.text.replace(/^\d+\.\s*/, "")}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              <section className={sideCard}>
                <h2 className="font-display text-[17px] font-semibold text-ink">Share this article</h2>
                <div className="mt-3">
                  <ShareLinks url={url} title={post.title} />
                </div>
              </section>

              <section className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-[#5aaee0] via-[#2273a8] to-[#0b2f4a] p-6 text-white shadow-[0_24px_60px_rgba(29,102,150,.3)]">
                <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 size-[160px] rounded-full bg-white/20 blur-3xl" />
                <h2 className="relative font-display text-[22px] font-semibold leading-tight tracking-[-0.02em]">Need a growth plan?</h2>
                <p className="relative mt-1.5 text-[14px] text-white/85">Talk to us about {post.tag}. Strategy. Creativity. Results.</p>
                <Link
                  href="/#contact"
                  className="group relative mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-[14px] font-semibold text-[#0a0c10] transition hover:-translate-y-0.5"
                >
                  Get Free Quote <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </section>
            </aside>
          </div>

          {/* ───────── keep reading ───────── */}
          <section className="mt-14" aria-labelledby="keep-reading">
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 id="keep-reading" className="font-display text-[clamp(26px,3vw,34px)] font-semibold tracking-[-0.035em]">
                Keep reading
              </h2>
              <Link href="/blog" className="group inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-brand-700">
                All articles <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-line bg-card p-2.5 shadow-[0_14px_40px_rgba(29,102,150,.07)] transition duration-300 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-[0_26px_60px_rgba(29,102,150,.15)]"
                  >
                    <div className="relative flex h-[170px] items-center justify-center overflow-hidden rounded-[20px]" style={{ background: toneBg[p.tone] }}>
                      <div className="grid-floor absolute -bottom-6 -left-[15%] -right-[15%] h-[100px] opacity-60 [--grid-color:rgba(255,255,255,.18)] [--grid-size:26px]" />
                      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11.5px] font-bold text-[#0a0c10] shadow-[0_4px_12px_rgba(10,12,16,.15)]">{p.tag}</span>
                      <PostArt tag={p.tag} className="relative size-[116px] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" />
                    </div>
                    <div className="flex flex-1 flex-col px-3.5 pb-3 pt-4">
                      <p className="text-[12px] font-medium text-subtle">
                        {p.date} · {p.readTime}
                      </p>
                      <h3 className="mt-2 line-clamp-3 font-display text-[18px] font-semibold leading-snug tracking-[-0.02em] text-ink">{p.title}</h3>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-brand-700">
                        Read Article <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>

      <Footer />
    </main>
  );
}
