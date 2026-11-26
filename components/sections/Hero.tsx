"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HERO, MARQUEE_SERVICES } from "@/lib/data";
import { Navbar } from "./Navbar";
import { GridFloor } from "@/components/ui/GridFloor";
import { Float } from "@/components/ui/Float";
import { RotatingWord } from "@/components/ui/RotatingWord";
import { Megaphone3D, Planet3D } from "@/components/objects/Objects3D";

const ROTATING_WORDS = [HERO.title.accent, "Creative", "Social", "Marketing", "Growth"] as const;

const ease = [0.2, 0.7, 0.2, 1] as const;
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
});

export function Hero() {
  return (
    <section
      id="top"
      className="hero-bg relative -mx-2.5 -mt-2.5 flex min-h-[calc(100svh-20px)] flex-col items-center overflow-hidden px-4 pb-4 pt-[26px] sm:-mx-[18px] sm:-mt-[18px] sm:min-h-[680px] sm:px-6 sm:pt-10"
    >
      <div aria-hidden className="stars pointer-events-none absolute inset-0" />
      <GridFloor />
      {/* fades the grid floor into the page so the hero has no hard bottom edge */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-b from-transparent to-canvas" />
      <Navbar />

      {/* Copy */}
      <div className="relative z-10 mt-8 w-full max-w-[860px] text-center sm:mt-[44px] sm:w-auto">
        <motion.div {...fadeUp(0.12)} className="flex items-center justify-center gap-2.5 whitespace-nowrap text-[13px] font-medium text-ink-2 sm:gap-4 sm:text-[15px]">
          <motion.span
            aria-hidden
            className="h-[1.5px] w-6 origin-right bg-gradient-to-r from-transparent to-brand sm:w-[70px]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <p className="eyebrow-pill relative inline-flex items-center gap-2.5 rounded-full border border-brand/25 bg-white/70 py-1.5 pl-1.5 pr-4 shadow-[0_8px_24px_rgba(41,127,177,.12)] backdrop-blur-md sm:gap-3 sm:pr-5 dark:border-white/10 dark:bg-white/[.05] dark:shadow-none">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#3b9ad1] to-brand-600 px-3 py-1 font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.35)] sm:px-3.5">
              <span aria-hidden className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-white/80" />
                <span className="relative inline-flex size-2 rounded-full bg-white" />
              </span>
              {HERO.eyebrow.split(" · ")[0]}
            </span>
            <span aria-hidden className="text-brand">·</span>
            <span className="font-semibold tracking-[-0.01em] text-ink">{HERO.eyebrow.split(" · ")[1]}</span>
          </p>
          <motion.span
            aria-hidden
            className="h-[1.5px] w-6 origin-left bg-gradient-to-r from-brand to-transparent sm:w-[70px]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <motion.h1
          {...fadeUp(0.24)}
          className="my-5 font-display text-[clamp(40px,6.2vw,80px)] font-semibold leading-[1.04] tracking-[-0.04em] sm:my-[22px]"
        >
          <span className="sr-only">
            {HERO.title.before}
            {HERO.title.accent}
            {HERO.title.after}
          </span>
          <span aria-hidden>
            {HERO.title.before}
            <br />
            <RotatingWord words={ROTATING_WORDS} />
            {HERO.title.after}
          </span>
        </motion.h1>

        <motion.p {...fadeUp(0.36)} className="mx-auto mb-8 max-w-[560px] text-base leading-relaxed text-muted sm:text-lg">
          {HERO.sub}
        </motion.p>

        <motion.div {...fadeUp(0.36)} className="flex flex-wrap justify-center gap-3">
          <a
            href="#services"
            className="group relative inline-flex min-h-[54px] items-center gap-3 overflow-hidden rounded-full bg-gradient-to-b from-[#3b9ad1] to-brand-600 py-1.5 pl-7 pr-1.5 text-[15px] font-semibold text-white shadow-[0_12px_30px_rgba(41,127,177,.42),inset_0_1px_0_rgba(255,255,255,.35)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(41,127,177,.58),inset_0_1px_0_rgba(255,255,255,.35)] active:translate-y-0"
          >
            <span
              aria-hidden
              className="absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-white/25 transition-all duration-700 group-hover:left-[150%]"
            />
            <span className="relative">Explore Services</span>
            <span className="relative flex size-[42px] items-center justify-center rounded-full bg-white text-brand-600 transition-transform duration-300 group-hover:rotate-[-45deg]">
              <ArrowRight size={18} strokeWidth={2.4} />
            </span>
          </a>
          <a
            href="#contact"
            className="group relative inline-flex min-h-[54px] items-center overflow-hidden rounded-full border border-brand/35 bg-white/70 px-8 text-[15px] font-semibold text-ink shadow-[0_8px_24px_rgba(41,127,177,.12)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-brand/10 hover:shadow-[0_14px_34px_rgba(41,127,177,.25)] active:translate-y-0 dark:border-white/15 dark:bg-white/[.05] dark:shadow-none dark:hover:border-brand/60 dark:hover:bg-brand/15"
          >
            <span className="relative">Get a Free Quote</span>
            <span
              aria-hidden
              className="absolute inset-x-8 bottom-2 h-[2px] origin-left scale-x-0 rounded-full bg-brand transition-transform duration-300 group-hover:scale-x-100"
            />
          </a>
        </motion.div>

        {/* tablet / small laptop (sm–xl): the two 3D objects sit right under the buttons, fully on screen.
            Hidden on phones; the big side-by-side-with-headline version is xl and up, below. */}
        <div className="relative mt-10 hidden items-center justify-between sm:flex xl:hidden">
          <div aria-hidden className="pointer-events-none absolute inset-x-[20%] inset-y-3 rounded-full bg-brand/15 blur-2xl" />
          <Float from="left" trigger="mount" rotate={[-14, -8]} className="size-[clamp(84px,26vw,112px)] shrink-0 sm:size-[124px] lg:size-[140px]">
            <Megaphone3D />
          </Float>
          <Float from="right" trigger="mount" rotate={[6, -4]} distance={16} duration={7} delay={0.45} className="size-[clamp(78px,24vw,104px)] shrink-0 sm:size-[116px] lg:size-[130px]">
            <Planet3D />
          </Float>
        </div>
      </div>

      {/* 3D objects beside the headline — wide desktop (xl) only. Below xl they sit under the hero buttons instead (see above). */}
      <Float
        from="left"
        trigger="mount"
        rotate={[-14, -8]}
        className="absolute left-[3%] top-[250px] z-0 hidden size-[clamp(200px,17vw,260px)] xl:block"
      >
        <Megaphone3D />
      </Float>
      <Float
        from="right"
        trigger="mount"
        rotate={[6, -4]}
        distance={22}
        duration={7}
        delay={0.45}
        className="absolute right-[4%] top-[270px] z-0 hidden size-[clamp(190px,16vw,250px)] xl:block"
      >
        <Planet3D />
      </Float>

      {/* Services marquee */}
      <motion.div {...fadeUp(0.6)} className="relative z-10 mb-10 mt-auto w-full pt-8 text-center sm:mb-4 sm:mt-[44px] sm:pt-0">
        <div className="mb-5 flex items-center justify-center gap-3 text-[14px] font-medium text-ink-2 sm:gap-5 sm:text-[16px]">
          <span aria-hidden className="h-[1.5px] w-6 shrink-0 bg-gradient-to-r from-transparent to-brand sm:w-20" />
          {/* phone: always exactly two centred lines; tablet and up: one line with a dot between */}
          <p className="flex flex-col items-center gap-y-1 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-3">
            <span className="whitespace-nowrap">
              Trusted by <strong className="font-display text-[1.15em] font-bold text-brand-700">200+</strong> happy clients
            </span>
            <span aria-hidden className="hidden size-1 rounded-full bg-brand sm:block" />
            <span className="whitespace-nowrap">
              <strong className="font-display text-[1.15em] font-bold text-brand-700">500+</strong> projects delivered
            </span>
          </p>
          <span aria-hidden className="h-[1.5px] w-6 shrink-0 bg-gradient-to-r from-brand to-transparent sm:w-20" />
        </div>
        <div className="-mx-4 overflow-hidden whitespace-nowrap py-3 sm:-mx-6">
          <div className="inline-flex animate-marquee hover:[animation-play-state:paused]" style={{ animationDuration: "46s" }}>
            {[...MARQUEE_SERVICES, ...MARQUEE_SERVICES].map(({ name, icon: Icon }, i) => (
              <span
                key={`${name}-${i}`}
                aria-hidden={i >= MARQUEE_SERVICES.length}
                className="group mr-3 inline-flex items-center gap-3 rounded-full border border-line bg-white/70 py-2 pl-2 pr-5 shadow-[0_6px_18px_rgba(41,127,177,.08)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-[0_10px_26px_rgba(41,127,177,.22)] dark:border-white/10 dark:bg-white/[.04] dark:shadow-none dark:hover:border-brand/50 dark:hover:bg-brand/10"
              >
                <span className="glossy-blue flex size-8 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110">
                  <Icon size={16} color="#fff" strokeWidth={2.2} />
                </span>
                <span className="font-display text-[15px] font-semibold text-ink-2 sm:text-base">{name}</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
