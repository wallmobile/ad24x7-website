"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Filter, Sparkles, Target, UsersRound } from "lucide-react";
import { MARQUEE_SERVICES, WHY } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionLabel";
import { GlossyIcon } from "@/components/ui/GlossyIcon";

const featureIcons = [Target, Filter, UsersRound];

/** icon colour per card, same order as the circles: blue, black, blue */
const iconTones = ["blue", "dark", "blue"] as const;

/** coloured accent per feature (rail + underline on the left cards) */
const accents = ["bg-brand", "bg-[#4a525c]", "bg-[#7fc0ea]"];

/** circle placement inside the square diagram (percent), fill, label position and the chip shown when it is selected */
const circles = [
  {
    left: "19%", top: "0%",
    bg: "radial-gradient(circle at 35% 30%, #5aaee0, #1d6696 70%)",
    label: { left: "50%", top: "15%" },
    sub: "Measurable outcomes, real growth",
    chip: { badge: "4×", text: "Average ROAS Growth", pos: "-top-[7%] right-0", box: "border-line bg-card text-ink-2", badgeCls: "from-[#3b9ad1] to-[#1d6696]" },
  },
  {
    left: "0%", top: "35%",
    bg: "radial-gradient(circle at 35% 30%, #3a4551, #0a0c10 75%)",
    label: { left: "20%", top: "70%" },
    sub: "Awareness → Conversion → Retention",
    chip: { badge: String(MARQUEE_SERVICES.length), text: "Core Services", pos: "bottom-[2%] left-0", box: "border-white/10 bg-[#0A0C10] text-white", badgeCls: "from-[#4a525c] to-[#1a1f26]" },
  },
  {
    left: "38%", top: "35%",
    bg: "radial-gradient(circle at 35% 30%, #9fd6f7, #2a85bc 75%)",
    label: { left: "80%", top: "70%" },
    sub: "An extension of your team",
    chip: { badge: "95%", text: "Client Retention Rate", pos: "bottom-[2%] right-0", box: "border-line bg-card text-ink-2", badgeCls: "from-[#9fd6f7] to-[#2a85bc]" },
  },
];

/** Venn diagram: three overlapping glass circles that meet at Ad24x7. Hover a circle or a card to focus it. */
export function WhyUs() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // switch to the next section by itself; hovering the diagram or cards pauses it
  useEffect(() => {
    if (reduce || paused) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % circles.length), 4500);
    return () => clearTimeout(t);
  }, [active, paused, reduce]);

  return (
    <section className="relative px-4 pb-14 pt-2 sm:px-6 sm:pb-16 sm:pt-0">
      <Reveal className="mx-auto mb-7 max-w-[720px] text-center sm:mb-9">
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <span aria-hidden className="h-[1.5px] w-10 bg-gradient-to-r from-transparent to-brand sm:w-[80px]" />
          <p className="inline-flex items-center gap-2.5 rounded-full border border-brand/25 bg-white/70 py-1.5 pl-1.5 pr-5 text-[14px] font-medium text-ink-2 shadow-[0_8px_24px_rgba(41,127,177,.12)] backdrop-blur-md sm:text-[15px] dark:border-white/10 dark:bg-white/[.05] dark:shadow-none">
            <span className="flex size-7 items-center justify-center rounded-full bg-gradient-to-b from-[#3b9ad1] to-brand-600 text-white shadow-[inset_0_1px_0_rgba(255,255,255,.35)]">
              <Sparkles size={14} />
            </span>
            <span>
              Why <strong className="font-display font-bold tracking-[-0.01em] text-brand-700">Ad24x7</strong>
            </span>
          </p>
          <span aria-hidden className="h-[1.5px] w-10 bg-gradient-to-r from-brand to-transparent sm:w-[80px]" />
        </div>
        <SectionTitle className="mb-3 mt-4">
          {WHY.title} <span className="text-brand">{WHY.accent}</span>
        </SectionTitle>
        <p className="text-lg leading-relaxed text-muted">{WHY.sub}</p>
      </Reveal>

      <div
        className="mx-auto grid max-w-[1200px] items-center gap-8 lg:grid-cols-2 lg:gap-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* left: compact feature cards */}
        <Reveal delay={0.1} className="order-1">
          <ul className="flex flex-col gap-2">
            {WHY.features.map((f, i) => {
              const on = i === active;
              return (
                <li key={f.title}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-current={on}
                    className={`relative flex w-full items-start gap-3 overflow-hidden rounded-xl border p-3 pb-4 text-left transition-all duration-300 sm:p-3.5 sm:pb-4 ${
                      on
                        ? "border-line bg-card shadow-[0_18px_44px_rgba(29,102,150,.14)] dark:shadow-[0_18px_44px_rgba(0,0,0,.4)]"
                        : "border-transparent bg-card/50 hover:border-line"
                    }`}
                  >
                    <span aria-hidden className={`absolute bottom-2.5 left-0 top-2.5 w-[3px] rounded-full transition-opacity duration-300 ${accents[i]} ${on ? "opacity-100" : "opacity-0"}`} />
                    <GlossyIcon icon={featureIcons[i]} tone={iconTones[i]} size={38} className={on ? "" : "opacity-60"} />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-3">
                        <span className="block font-display text-[16.5px] font-semibold tracking-[-0.02em] sm:text-[17px]">{f.title}</span>
                        <span className={`font-display text-[12px] font-medium ${on ? "text-ink-2" : "text-subtle"}`}>0{i + 1}</span>
                      </span>
                      <span className="mt-0.5 block text-[13px] leading-snug text-muted">{f.desc}</span>
                    </span>
                    <span aria-hidden className={`absolute bottom-1.5 left-4 h-[3px] rounded-full transition-all duration-500 ${accents[i]} ${on ? "w-7 opacity-100" : "w-0 opacity-0"}`} />
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>

        {/* right: diagram */}
        <Reveal className="order-2">
          <div className="relative mx-auto aspect-square w-full max-w-[470px]">
            <div aria-hidden className="absolute inset-[6%] rounded-full bg-brand/20 blur-3xl" />

            {/* thin orbit ring with two little satellites */}
            <div aria-hidden className="absolute -inset-[5%] animate-spin rounded-full border border-brand/15" style={{ animationDuration: "70s" }}>
              <span className="absolute right-[12%] top-[10%] size-2 rounded-full bg-[#0a0c10]" />
              <span className="absolute bottom-[8%] left-[44%] size-2.5 rounded-full bg-brand shadow-[0_0_0_4px_rgba(41,127,177,.18)]" />
            </div>

            {circles.map((c, i) => {
              const on = i === active;
              const Icon = featureIcons[i];
              return (
                <div key={i}>
                  <button
                    type="button"
                    aria-label={WHY.features[i].title}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="absolute aspect-square w-[62%] rounded-full border border-white/25 shadow-[0_24px_60px_rgba(10,12,16,.25)] outline-none transition-all duration-500 focus-visible:ring-4 focus-visible:ring-brand/40"
                    style={{
                      left: c.left,
                      top: c.top,
                      background: c.bg,
                      opacity: on ? 0.95 : 0.62,
                      transform: on ? "scale(1.05)" : "scale(1)",
                      zIndex: on ? 2 : 1,
                    }}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute z-10 flex w-[34%] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center text-white"
                    style={{ left: c.label.left, top: c.label.top }}
                  >
                    <span className="flex size-9 items-center justify-center rounded-full border border-white/25 bg-white/15 sm:size-10">
                      <Icon size={18} strokeWidth={2.2} />
                    </span>
                    <span className="mt-1.5 font-display text-[12px] font-semibold leading-tight sm:text-[15px]">{WHY.features[i].title}</span>
                    <span className="mt-1 hidden text-[10px] font-medium leading-tight text-white/80 sm:block">{c.sub}</span>
                  </div>
                </div>
              );
            })}

            {/* centre badge */}
            <div className="pointer-events-none absolute left-1/2 top-[54%] z-10 flex size-[25%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-white shadow-[0_14px_36px_rgba(10,12,16,.3)]">
              <Image src="/logo-light.png" alt="Ad24x7" width={892} height={237} className="h-auto w-[68%]" />
              <span className="mt-1 text-[7px] font-semibold uppercase tracking-[0.14em] text-ink-2 sm:text-[8.5px]">Since 2018</span>
            </div>

            {/* chip of the selected circle */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className={`absolute z-20 flex items-center gap-2.5 rounded-2xl border py-2 pl-2 pr-4 shadow-[0_12px_30px_rgba(10,12,16,.2)] ${circles[active].chip.box} ${circles[active].chip.pos}`}
              >
                <span className={`flex size-8 items-center justify-center rounded-xl bg-gradient-to-b font-display text-[12px] font-bold text-white ${circles[active].chip.badgeCls}`}>{circles[active].chip.badge}</span>
                <span className="whitespace-nowrap text-[12.5px] font-medium">{circles[active].chip.text}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
