"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { homeLink } from "@/lib/links";

/**
 * Floating pill navbar: stays fixed while scrolling, tightens + blurs once you scroll,
 * highlights the section you're on (sliding pill), has a light orbiting its border, collapses to a menu on mobile.
 */
export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // on blog pages the "Blog" link stays highlighted; on home the scroll-spy below takes over
  const [active, setActive] = useState<string>(
    isHome ? NAV_LINKS[0].href : pathname.startsWith("/blog") ? "#blog" : "",
  );
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const close = () => setOpen(false);
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("resize", close);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", close);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Which section is in the middle of the viewport → active link.
  useEffect(() => {
    if (!isHome) return;
    const seen = new Map<string, IntersectionObserverEntry>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e));
        const current = NAV_LINKS.find(
          (l) => seen.get(l.href.slice(1))?.isIntersecting,
        );
        if (current) setActive(current.href);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    NAV_LINKS.forEach((l) => {
      const el = document.getElementById(l.href.slice(1));
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [isHome]);

  const lit = hovered ?? active;

  return (
    <>
      {/* keeps the hero layout where the in-flow navbar used to be */}
      <div aria-hidden className="h-[60px] w-full shrink-0" />

      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
        className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-5 sm:px-6"
      >
        <div
          className={`pointer-events-auto relative transition-[width] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${
            scrolled
              ? "w-[1000px] max-w-full"
              : "w-[calc(100%-4rem)] max-w-[1200px]"
          }`}
        >
          <div className="relative flex items-center justify-between gap-3 rounded-[40px] border border-line bg-white/80 py-2 pl-5 pr-2 shadow-[0_14px_40px_rgba(10,12,16,.12)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0b0f15]/80 dark:shadow-[0_14px_44px_rgba(0,0,0,.55)]">
            <a
              href={isHome ? "#" : "/"}
              aria-label="Ad24x7 Technologies home"
              className="shrink-0"
            >
              <Image
                src="/logo-light.png"
                alt="Ad24x7 Technologies"
                width={892}
                height={237}
                priority
                className="h-7 w-auto dark:hidden"
              />
              <Image
                src="/logo-dark.png"
                alt="Ad24x7 Technologies"
                width={892}
                height={237}
                priority
                className="hidden h-7 w-auto dark:block"
              />
            </a>

            <nav
              aria-label="Main"
              onMouseLeave={() => setHovered(null)}
              className="hidden items-center gap-0.5 text-sm font-medium lg:flex"
            >
              {NAV_LINKS.map((l) => {
                const on = lit === l.href;
                return (
                  <a
                    key={l.href}
                    href={homeLink(l.href, isHome)}
                    onMouseEnter={() => setHovered(l.href)}
                    onFocus={() => setHovered(l.href)}
                    onBlur={() => setHovered(null)}
                    aria-current={active === l.href ? "location" : undefined}
                    className={`relative rounded-full px-3.5 py-2 transition-colors ${on ? "text-brand-700" : "text-ink-2"}`}
                  >
                    {on && (
                      <motion.span
                        layoutId="nav-pill"
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-brand/10 dark:bg-white/[.08]"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 34,
                        }}
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <a
                href={homeLink("#contact", isHome)}
                className={`group relative hidden items-center overflow-hidden rounded-full bg-gradient-to-b from-[#3b9ad1] to-brand-600 font-semibold text-white shadow-[0_8px_22px_rgba(41,127,177,.4),inset_0_1px_0_rgba(255,255,255,.35)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(41,127,177,.55),inset_0_1px_0_rgba(255,255,255,.35)] sm:inline-flex min-h-11 px-5 text-sm`}
              >
                <span
                  aria-hidden
                  className="absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-white/25 transition-all duration-700 group-hover:left-[150%]"
                />
                <span className="relative">Get a Free Quote</span>
              </a>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="flex size-11 items-center justify-center rounded-full bg-ink text-white lg:hidden dark:bg-brand-600"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            {/* light that travels around the whole border */}
            <span aria-hidden className="nav-border nav-border-glow" />
            <span aria-hidden className="nav-border" />
          </div>

          <AnimatePresence>
            {open && (
              <motion.nav
                id="mobile-menu"
                aria-label="Mobile"
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-x-0 top-[calc(100%+10px)] rounded-3xl border border-line bg-card/95 p-3 shadow-[0_24px_60px_rgba(10,12,16,.18)] backdrop-blur-xl lg:hidden"
              >
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={homeLink(l.href, isHome)}
                    onClick={() => setOpen(false)}
                    className={`flex min-h-12 items-center rounded-2xl px-4 text-[15px] font-medium hover:bg-[#f3f6f9] dark:hover:bg-white/5 ${
                      active === l.href
                        ? "bg-brand/10 text-brand-700"
                        : "text-ink-2"
                    }`}
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href={homeLink("#contact", isHome)}
                  onClick={() => setOpen(false)}
                  className="mt-2 flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#3b9ad1] to-brand-600 text-[15px] font-semibold text-white"
                >
                  Get a Free Quote
                </a>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
}
