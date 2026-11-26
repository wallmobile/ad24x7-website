"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BookOpen, ChevronRight, Search, X } from "lucide-react";
import { BLOG_FILTERS, type BlogTag } from "@/lib/data";
import { PostArt, toneBg } from "@/components/blog/postArt";
import { BlogHeroScene } from "@/components/blog/BlogHeroScene";

/** serializable card data (passed from the server page) */
export type HubPost = {
  slug: string;
  tag: BlogTag;
  tone: "blue" | "dark" | "sky";
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
};

type Topic = "All" | BlogTag;

/** Blog landing: hero + search, topic chips, article grid and a sidebar (topics, latest, CTA). */
export function BlogHub({ posts }: { posts: HubPost[] }) {
  const [topic, setTopic] = useState<Topic>("All");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const shown = posts.filter((p) => (topic === "All" || p.tag === topic) && (!q || `${p.title} ${p.excerpt} ${p.tag}`.toLowerCase().includes(q)));
  const topics = BLOG_FILTERS.filter((t): t is BlogTag => t !== "All");
  const latest = posts.slice(0, 3);

  function reset() {
    setTopic("All");
    setQuery("");
  }

  return (
    <div className="mx-auto max-w-[1200px]">
      {/* ───────── hero ───────── */}
      <header className="relative overflow-hidden rounded-[32px] border border-line bg-gradient-to-br from-[#f5fafe] via-[#eaf4fb] to-[#d4e9f7] p-6 shadow-[0_30px_80px_rgba(29,102,150,.1)] sm:p-9 lg:p-11 dark:from-[#0e1a26] dark:via-[#0b1520] dark:to-[#0a2236] dark:shadow-[0_30px_80px_rgba(0,0,0,.45)]">
        <div className="relative grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-[13px] font-medium text-muted">
              <Link href="/" className="transition-colors hover:text-brand-700">
                Home
              </Link>
              <ChevronRight size={13} aria-hidden />
              <span aria-current="page" className="text-ink-2">
                Blog
              </span>
            </nav>

            <p className="inline-flex items-center gap-2.5 rounded-full border border-brand/25 bg-white/70 py-1.5 pl-1.5 pr-5 text-[14px] font-medium text-ink-2 shadow-[0_8px_24px_rgba(41,127,177,.12)] backdrop-blur-md sm:text-[15px] dark:border-white/10 dark:bg-white/[.05] dark:shadow-none">
              <span className="flex size-7 items-center justify-center rounded-full bg-gradient-to-b from-[#3b9ad1] to-brand-600 text-white shadow-[inset_0_1px_0_rgba(255,255,255,.35)]">
                <BookOpen size={14} />
              </span>
              Insights · Archive
            </p>

            <h1 className="mt-5 font-display text-[clamp(34px,4.4vw,56px)] font-semibold leading-[1.04] tracking-[-0.045em]">
              Ideas that help brands <span className="text-brand">grow online</span>
            </h1>
            <p className="mt-4 max-w-[470px] text-[16.5px] leading-relaxed text-muted">
              Stay ahead with expert insights on digital marketing, growth strategies, and industry trends from the Ad24x7 team.
            </p>

            {/* search */}
            <div className="relative mt-6 max-w-[440px]">
              <Search size={18} aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-subtle" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles…"
                aria-label="Search articles"
                className="min-h-12 w-full rounded-full border border-edge bg-white/90 py-3 pl-11 pr-11 text-[15px] text-ink shadow-[0_10px_26px_rgba(29,102,150,.08)] outline-none transition placeholder:text-subtle focus:border-brand focus:shadow-[0_0_0_4px_rgba(41,127,177,.15)] dark:bg-white/[.06] [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-2.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-subtle transition hover:bg-field hover:text-ink">
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* animated visual (typing search, growth chart, 3D objects) */}
          <BlogHeroScene topics={topics} />
        </div>
      </header>

      {/* ───────── topic chips + count ───────── */}
      <div className="mt-8 flex items-center justify-between gap-4">
        <ul className="-mx-1 flex gap-2 overflow-x-auto px-1 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Filter by topic">
          {(["All", ...topics] as Topic[]).map((t) => {
            const on = topic === t;
            return (
              <li key={t} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setTopic(t)}
                  aria-pressed={on}
                  className={`rounded-full border px-4 py-2 text-[13.5px] font-semibold transition ${
                    on ? "border-[#0a0c10] bg-[#0a0c10] text-white shadow-[0_8px_18px_rgba(10,12,16,.2)] dark:border-brand-600 dark:bg-brand-600" : "border-edge bg-card text-ink-2 hover:border-brand/40 hover:text-ink"
                  }`}
                >
                  {t}
                </button>
              </li>
            );
          })}
        </ul>
        <p aria-live="polite" className="hidden shrink-0 text-[13px] font-medium text-muted sm:block">
          {shown.length} {shown.length === 1 ? "article" : "articles"}
        </p>
      </div>

      {/* ───────── grid + sidebar ───────── */}
      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_300px]">
        <div>
          {shown.length === 0 ? (
            <div className="rounded-[26px] border border-dashed border-edge bg-card px-6 py-16 text-center">
              <p className="font-display text-[22px] font-semibold text-ink">No articles found</p>
              <p className="mt-2 text-[15px] text-muted">Try a different word, or browse all topics.</p>
              <button type="button" onClick={reset} className="mt-5 min-h-11 rounded-full bg-[#0a0c10] px-5 text-[14px] font-semibold text-white dark:bg-brand-600">
                Clear filters
              </button>
            </div>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2">
              <AnimatePresence mode="popLayout" initial={false}>
                {shown.map((p) => (
                  <motion.li
                    key={p.slug}
                    layout
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      href={`/blog/${p.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-line bg-card p-2.5 shadow-[0_14px_40px_rgba(29,102,150,.07)] transition duration-300 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-[0_26px_60px_rgba(29,102,150,.15)]"
                    >
                      <div className="relative flex h-[190px] items-center justify-center overflow-hidden rounded-[20px]" style={{ background: toneBg[p.tone] }}>
                        <div className="grid-floor absolute -bottom-6 -left-[15%] -right-[15%] h-[110px] opacity-60 [--grid-color:rgba(255,255,255,.18)] [--grid-size:26px]" />
                        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11.5px] font-bold text-[#0a0c10] shadow-[0_4px_12px_rgba(10,12,16,.15)]">{p.tag}</span>
                        <PostArt tag={p.tag} className="relative size-[132px] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" />
                      </div>
                      <div className="flex flex-1 flex-col px-3.5 pb-3 pt-4">
                        <p className="text-[12px] font-medium text-subtle">
                          {p.date} · {p.readTime}
                        </p>
                        <h2 className="mt-2 font-display text-[19px] font-semibold leading-snug tracking-[-0.02em] text-ink">{p.title}</h2>
                        <p className="mt-2 line-clamp-3 flex-1 text-[14px] leading-relaxed text-muted">{p.excerpt}</p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-brand-700">
                          Read Article <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>

        <aside className="space-y-5 lg:sticky lg:top-28" aria-label="Blog sidebar">
          {/* browse topics */}
          <section className="rounded-[26px] border border-line bg-card p-5 shadow-[0_14px_40px_rgba(29,102,150,.06)]">
            <h2 className="font-display text-[17px] font-semibold text-ink">Browse topics</h2>
            <ul className="mt-3 divide-y divide-line">
              {topics.map((t) => {
                const on = topic === t;
                const n = posts.filter((p) => p.tag === t).length;
                return (
                  <li key={t}>
                    <button
                      type="button"
                      onClick={() => setTopic(on ? "All" : t)}
                      aria-pressed={on}
                      className={`group flex w-full items-center justify-between gap-2 py-2.5 text-left text-[14.5px] font-medium transition-colors ${on ? "text-brand-700" : "text-ink-2 hover:text-brand-700"}`}
                    >
                      {t}
                      <span className="flex items-center gap-2 text-[12px] text-subtle">
                        {n}
                        <ChevronRight size={15} className={`transition-transform ${on ? "translate-x-0.5 text-brand" : "group-hover:translate-x-0.5"}`} />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* latest */}
          <section className="rounded-[26px] border border-line bg-card p-5 shadow-[0_14px_40px_rgba(29,102,150,.06)]">
            <h2 className="font-display text-[17px] font-semibold text-ink">Latest articles</h2>
            <ol className="mt-3 space-y-4">
              {latest.map((p, i) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="group flex gap-3">
                    <span className="font-display text-[15px] font-bold text-brand">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[14px] font-medium leading-snug text-ink-2 transition-colors group-hover:text-brand-700">{p.title}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>

          {/* CTA */}
          <section className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-[#5aaee0] via-[#2273a8] to-[#0b2f4a] p-6 text-white shadow-[0_24px_60px_rgba(29,102,150,.3)]">
            <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 size-[160px] rounded-full bg-white/20 blur-3xl" />
            <h2 className="relative font-display text-[22px] font-semibold leading-tight tracking-[-0.02em]">Need a growth plan?</h2>
            <p className="relative mt-1.5 text-[14px] text-white/85">Strategy. Creativity. Results.</p>
            <Link
              href="/#contact"
              className="group relative mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-[14px] font-semibold text-[#0a0c10] transition hover:-translate-y-0.5"
            >
              Get Free Quote <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
}
