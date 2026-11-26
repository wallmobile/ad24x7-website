"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUp, Facebook, Heart, Instagram, Linkedin, Sparkle, Youtube } from "lucide-react";
import { FOOTER } from "@/lib/data";
import { homeLink } from "@/lib/links";

function XLogo({ size = 15 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden>
      <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78zm-1.08 16.17h1.7L7.4 4.73H5.58z" />
    </svg>
  );
}

// TODO: replace "#" with the real profile URLs.
const socials = [
  { label: "Facebook", href: "#", icon: <Facebook size={15} /> },
  { label: "Instagram", href: "#", icon: <Instagram size={15} /> },
  { label: "LinkedIn", href: "#", icon: <Linkedin size={15} /> },
  { label: "X (Twitter)", href: "#", icon: <XLogo /> },
  { label: "YouTube", href: "#", icon: <Youtube size={15} /> },
];

const [services, company, quick] = FOOTER.columns;

/** blue copy of the wordmark is only visible inside this circle, centred on the cursor */
const spotlightMask = "radial-gradient(circle at var(--x) var(--y), #000 0%, #000 12%, transparent 30%)";
const spotlight: React.CSSProperties = { maskImage: spotlightMask, WebkitMaskImage: spotlightMask };
const TAGLINE = "Strategy. Creativity. Results.";

function LinkColumn({ col, isHome }: { col: (typeof FOOTER.columns)[number]; isHome: boolean }) {
  return (
    <div>
      <p className="mb-3 font-display text-[15px] font-semibold text-ink">{col.title}</p>
      <ul className="flex flex-col gap-0.5 text-[14px] sm:gap-2">
        {col.links.map((l) => (
          <li key={l.label}>
            <a href={homeLink(l.href, isHome)} className="group inline-flex items-center gap-1 py-1.5 text-muted transition-colors hover:text-brand-700 sm:py-0">
              {l.label}
              <ArrowRight size={12} className="-translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const isHome = usePathname() === "/";
  const mark = useRef<HTMLDivElement>(null);
  const [hasMouse, setHasMouse] = useState(false);
  useEffect(() => setHasMouse(window.matchMedia("(hover: hover) and (pointer: fine)").matches), []);

  // move the blue spotlight on the big wordmark with the cursor
  function onMove(e: React.PointerEvent) {
    const el = mark.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--y", `${((e.clientY - r.top) / r.height) * 100}%`);
  }
  function onLeave() {
    mark.current?.style.setProperty("--x", "44%");
    mark.current?.style.setProperty("--y", "55%");
  }

  const blurb = FOOTER.blurb.replace(TAGLINE, "").trim();

  return (
    <footer onPointerMove={onMove} onPointerLeave={onLeave} className="relative -mx-2.5 -mb-2.5 sm:-mx-[18px] sm:-mb-[18px]">
      <div className="overflow-hidden rounded-t-[36px] border-t border-line bg-card px-5 pb-6 pt-12 shadow-[0_-20px_60px_rgba(29,102,150,.06)] sm:px-10 sm:pt-14">
        <div className="mx-auto max-w-[1200px]">
          {/* top: brand + links */}
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
            {/* brand card: logo, blurb, socials + quote button */}
            <div className="relative overflow-hidden rounded-[24px] border border-line bg-gradient-to-br from-card via-[#f3f8fc] to-[#e1eef8] p-6 shadow-[0_18px_44px_rgba(29,102,150,.08)] sm:p-7 dark:from-[#0e1218] dark:via-[#0d1620] dark:to-[#0e1a26] dark:shadow-none">
              <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-[200px] rounded-full bg-white/80 blur-3xl dark:bg-brand/10" />
              <div className="relative">
                <Image src="/logo-light.png" alt="Ad24x7 Technologies" width={892} height={237} className="h-[36px] w-auto dark:hidden" />
                <Image src="/logo-dark.png" alt="Ad24x7 Technologies" width={892} height={237} className="hidden h-[36px] w-auto dark:block" />
                <p className="mt-4 max-w-[420px] text-[14.5px] leading-[1.7] text-ink">
                  {blurb} <span className="font-semibold">{TAGLINE}</span>
                </p>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                  <ul className="flex gap-1.5 sm:gap-2">
                    {socials.map((s) => (
                      <li key={s.label}>
                        <a
                          href={s.href}
                          aria-label={s.label}
                          className="glossy-blue flex size-10 items-center justify-center rounded-xl text-white transition hover:-translate-y-0.5 hover:brightness-110 sm:size-9"
                        >
                          {s.icon}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={homeLink("#contact", isHome)}
                    className="group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#0a0c10] px-5 text-[13.5px] sm:min-h-10 sm:w-auto font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(10,12,16,.25)] dark:border dark:border-white/15"
                  >
                    Get Free Quote
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3">
              <LinkColumn col={services} isHome={isHome} />
              <LinkColumn col={company} isHome={isHome} />
              <div className="col-span-2 sm:col-span-1">
                <LinkColumn col={quick} isHome={isHome} />
              </div>
            </div>
          </div>

          {/* hint */}
          {hasMouse && (
            <p className="mt-8 flex items-center justify-end gap-1.5 text-[13px] text-muted">
              Move your cursor over the footer <Sparkle size={13} className="text-brand" />
            </p>
          )}

          {/* big wordmark with a cursor spotlight */}
          <div
            ref={mark}
            aria-hidden
            className="relative mt-6 select-none text-center font-display sm:mt-4 text-[clamp(84px,19vw,280px)] font-bold leading-[0.9] tracking-[-0.06em] [--x:44%] [--y:55%]"
          >
            <span className="block text-[#e6ecf2] dark:text-[#161d25]">ad24x7</span>
            <span className="absolute inset-0 block bg-gradient-to-br from-[#8fd0f5] via-[#297fb1] to-[#134a6e] bg-clip-text text-transparent" style={spotlight}>
              ad24x7
            </span>
          </div>

          {/* bottom bar: phone = copyright on two lines, then credit + back-to-top; sm+ = one row */}
          <div className="mt-4 flex flex-col gap-3 border-t border-line pt-5 text-[13px] text-muted sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <span>
              <span className="block sm:inline">© {new Date().getFullYear()} Ad24x7 Technologies.</span>{" "}
              <span className="block sm:inline">All rights reserved. Since 2018.</span>
            </span>
            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <span className="inline-flex items-center gap-1.5">
                Crafted with <Heart size={13} className="fill-[#e0245e] text-[#e0245e]" /> for Digital Growth
              </span>
              <a
                href="#"
                aria-label="Back to top"
                className="glossy-blue flex size-10 shrink-0 items-center justify-center rounded-full text-white transition hover:-translate-y-1 hover:brightness-110"
              >
                <ArrowUp size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
