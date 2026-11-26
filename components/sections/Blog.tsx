"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionLabel";
import { GridFloor } from "@/components/ui/GridFloor";
import { Float } from "@/components/ui/Float";
import { art, toneBg } from "@/components/blog/postArt";
import type { Post } from "@/lib/posts";

/** Featured story with a 3D illustration, and a row of all articles underneath to switch between them. */
export function Blog({ posts }: { posts: Pick<Post, "slug" | "tag" | "tone" | "title" | "excerpt" | "date" | "readTime">[] }) {
  const [active, setActive] = useState(Math.min(2, posts.length - 1));
  if (posts.length === 0) return null;
  const post = posts[active] ?? posts[0];
  const Art = art[post.tag];
  const { date, readTime: read } = post;

  return (
    <section
      id="blog"
      className="relative scroll-mt-24 px-4 pb-20 pt-4 sm:px-6 sm:pb-[90px]"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* header: text on the left, link on the right */}
        <Reveal className="relative mb-7 sm:mb-9">
          <div className="mx-auto max-w-[720px] text-center">
            {/* visible label is the badge; the h2 keeps the heading outline for SEO / screen readers */}
            <h2 className="sr-only">Our blog</h2>
            <SectionBadge icon={<BookOpen size={14} />}>
              Our{" "}
              <strong className="font-display font-bold tracking-[-0.01em] text-brand-700">
                Blog
              </strong>
            </SectionBadge>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Stay ahead with expert insights on digital marketing, growth
              strategies, and industry trends from the Ad24x7 team.
            </p>
          </div>
          <div className="mt-4 flex justify-center lg:absolute lg:bottom-1 lg:right-0 lg:mt-0">
            <a
              href="/blog"
              className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand-700"
            >
              View all articles
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </Reveal>

        {/* featured story */}
        <Reveal delay={0.05}>
          <div className="relative overflow-hidden rounded-[32px] border border-line bg-gradient-to-br from-[#eef6fc] to-[#cfe6f6] shadow-[0_30px_80px_rgba(29,102,150,.14)] dark:from-[#0e1a26] dark:to-[#0a2236] dark:shadow-[0_30px_80px_rgba(0,0,0,.5)]">
            <GridFloor
              height={170}
              size={44}
              perspective={420}
              animated={false}
              className="-left-[10%] -right-[10%] -bottom-10 opacity-80"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 top-1/2 size-[420px] -translate-y-1/2 rounded-full bg-white/50 blur-3xl dark:bg-brand/20"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="relative grid min-h-[340px] items-center gap-6 p-7 sm:p-10 md:grid-cols-[1.15fr_0.85fr] lg:min-h-[380px] lg:px-14"
              >
                <div>
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12.5px]">
                    <span className="rounded-full bg-white px-3 py-1 font-bold text-[#0a0c10] shadow-[0_4px_12px_rgba(29,102,150,.12)] dark:bg-white/90">
                      {post.tag}
                    </span>
                    <span className="font-medium text-muted">
                      {date} · {read}
                    </span>
                  </p>
                  <h3 className="mt-4 max-w-[540px] font-display text-[clamp(28px,3.4vw,42px)] font-semibold leading-[1.08] tracking-[-0.035em]">
                    {post.title}
                  </h3>
                  <p className="mt-3 max-w-[460px] text-[15.5px] leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                  <a
                    href={`/blog/${post.slug}`}
                    className="group mt-6 inline-flex items-center gap-2 rounded-full bg-[#0a0c10] px-5 py-3 text-[13.5px] font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(10,12,16,.3)] dark:border dark:border-white/15"
                  >
                    Read Article
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </a>
                </div>

                <div className="relative hidden items-center justify-center md:flex">
                  <Float
                    className="size-[260px] lg:size-[300px]"
                    distance={14}
                    rotate={[-3, 3]}
                    delay={0.1}
                  >
                    <Art />
                  </Float>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        {/* all articles: tap one to feature it */}
        <Reveal delay={0.1}>
          <ul
            role="tablist"
            aria-label="Articles"
            className="-mx-4 mt-5 flex snap-x gap-3 overflow-x-auto px-4 pb-3 pt-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {posts.map((p, i) => {
              const Thumb = art[p.tag];
              const on = i === active;
              return (
                <li
                  key={p.slug}
                  className="w-[214px] shrink-0 snap-start sm:w-[230px]"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={`group relative flex h-full w-full items-center gap-3 overflow-hidden rounded-[18px] border p-2.5 pb-3 text-left transition-all duration-300 ${
                      on
                        ? "-translate-y-1 border-brand/50 bg-card shadow-[0_18px_40px_rgba(29,102,150,.18)]"
                        : "border-line bg-card/70 hover:-translate-y-0.5 hover:border-brand/30"
                    }`}
                  >
                    {/* icon on the left */}
                    <span
                      className="flex h-[72px] w-[82px] shrink-0 items-center justify-center overflow-hidden rounded-xl"
                      style={{ background: toneBg[p.tone] }}
                    >
                      <Thumb
                        className={`size-[58px] transition-transform duration-500 ${on ? "scale-110" : "group-hover:scale-105"}`}
                      />
                    </span>

                    {/* content on the right */}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-semibold text-brand-700">
                        {p.tag}
                      </span>
                      <span
                        className={`mt-0.5 line-clamp-2 text-[14.5px] font-semibold leading-snug ${on ? "text-ink" : "text-ink-2"}`}
                      >
                        {p.title}
                      </span>
                    </span>

                    <span
                      aria-hidden
                      className={`absolute inset-x-2.5 bottom-1 h-[3px] origin-left rounded-full bg-gradient-to-r from-brand-600 to-brand-300 transition-transform duration-500 ${on ? "scale-x-100" : "scale-x-0"}`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
