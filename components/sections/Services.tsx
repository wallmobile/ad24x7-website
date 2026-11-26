"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Layers } from "lucide-react";
import { SERVICES } from "@/lib/data";
import { Reveal, rise, stagger } from "@/components/ui/Reveal";
import { SectionBadge, SectionTitle } from "@/components/ui/SectionLabel";
import { GlossyIcon } from "@/components/ui/GlossyIcon";
import { GridFloor } from "@/components/ui/GridFloor";
import { Float } from "@/components/ui/Float";
import { Bell3D, Envelope3D, LikeBubble3D, Magnifier3D, Megaphone3D, PieChart3D, Planet3D, Play3D, Rocket3D } from "@/components/objects/Objects3D";

/** detail-panel background, cycling blue / dark / sky like the rest of the site */
const plates = [
  "linear-gradient(160deg, #2a85bc 0%, #1d6696 55%, #134a6e 100%)",
  "linear-gradient(160deg, #1c232c 0%, #0a0c10 75%)",
  "linear-gradient(160deg, #5aaee0 0%, #2a85bc 55%, #1d6696 100%)",
];

/** one 3D object per service, same order as SERVICES */
const objects = [Rocket3D, PieChart3D, LikeBubble3D, Envelope3D, Play3D, Magnifier3D, Megaphone3D, Planet3D, Bell3D];

export function Services() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const cur = SERVICES[active];
  const Obj = objects[active % objects.length];

  // auto-advance is driven by the progress bar at the top of the panel (see onAnimationEnd below)

  return (
    <section id="services" className="relative scroll-mt-24 px-4 pb-20 pt-10 sm:px-6 sm:pb-[90px]">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="mx-auto mb-9 max-w-[720px] text-center sm:mb-12">
          <SectionBadge icon={<Layers size={14} />}>
            What <strong className="font-display font-bold tracking-[-0.01em] text-brand-700">We Offer</strong>
          </SectionBadge>
          <SectionTitle className="mb-3 mt-4">
            Our core <span className="text-brand">services</span>
          </SectionTitle>
          <p className="text-lg leading-relaxed text-muted">
            From brand awareness to performance campaigns and everything in between — we&apos;ve got your digital growth covered.
          </p>
        </Reveal>

        {/* desktop: list + spotlight panel */}
        <Reveal delay={0.1} className="hidden lg:block">
          <div
            className="grid grid-cols-[0.72fr_1.28fr] items-stretch gap-5"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <ul
              role="tablist"
              aria-label="Our services"
              className="flex flex-col gap-1 rounded-[28px] border border-line bg-gradient-to-b from-[#eef1f5] to-[#e7ebf0] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,.7)] dark:from-white/[.05] dark:to-white/[.02] dark:shadow-none"
            >
              {SERVICES.map((s, i) => {
                const on = i === active;
                return (
                  <li key={s.num}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      className={`flex w-full items-center gap-4 rounded-xl py-2.5 pl-4 pr-3 text-left transition-all duration-300 ${
                        on
                          ? "bg-[#0a0c10] text-white shadow-[0_10px_24px_rgba(10,12,16,.28)] dark:border dark:border-white/10"
                          : "text-ink-2 hover:bg-white/60 dark:hover:bg-white/5"
                      }`}
                    >
                      <span className={`w-5 font-display text-[11px] font-semibold ${on ? "text-brand-300" : "text-subtle"}`}>{s.num}</span>
                      <span className={`flex-1 font-display text-[14.5px] font-semibold tracking-[-0.01em] ${on ? "text-white" : ""}`}>{s.name}</span>
                      <span
                        aria-hidden
                        className={`flex size-6 items-center justify-center rounded-full bg-brand-600 text-white transition-all duration-300 ${on ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
                      >
                        <ArrowRight size={13} />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div
              className="relative min-h-[490px] overflow-hidden rounded-[28px] border border-white/10 shadow-[0_30px_80px_rgba(29,102,150,.2)] transition-[background] duration-500"
              style={{ background: plates[active % 3] }}
            >
              <GridFloor height={200} size={40} perspective={420} color="rgba(255,255,255,.12)" animated={false} className="-left-[10%] -right-[10%] -bottom-10" />

              {/* progress: fills while this service is showing, then moves to the next one */}
              <div aria-hidden className="absolute inset-x-0 top-0 z-10 h-[3px] bg-white/10">
                <span
                  key={`${active}-${paused}`}
                  className="seg-fill absolute inset-0 origin-left bg-white/80"
                  style={reduce ? { animation: "none", transform: "scaleX(0)" } : { animationDuration: "5s", animationPlayState: paused ? "paused" : "running" }}
                  onAnimationEnd={() => !reduce && setActive((a) => (a + 1) % SERVICES.length)}
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="relative grid h-full min-h-[490px] grid-cols-[1.08fr_0.92fr] items-center gap-2 p-9 pr-6 text-white"
                >
                  {/* copy */}
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[12px] font-semibold tracking-wide">
                      <span aria-hidden className="size-1.5 rounded-full bg-white" />
                      Service {cur.num} <span className="text-white/60">/ {String(SERVICES.length).padStart(2, "0")}</span>
                    </span>
                    <h3 className="mt-5 font-display text-[38px] font-semibold leading-[1.05] tracking-[-0.035em]">{cur.name}</h3>
                    <p className="mt-4 text-[16.5px] leading-relaxed text-white/90">{cur.desc}</p>
                    <a
                      href="#contact"
                      className="group mt-7 inline-flex w-fit items-center gap-2.5 rounded-full bg-white py-2 pl-6 pr-2 text-[15px] font-semibold text-[#0a0c10] transition hover:-translate-y-0.5"
                    >
                      Get a Free Quote
                      <span className="flex size-9 items-center justify-center rounded-full bg-brand-600 text-white transition-transform group-hover:rotate-[-45deg]">
                        <ArrowRight size={16} />
                      </span>
                    </a>
                  </div>

                  {/* visual */}
                  <div className="relative flex h-full min-h-[300px] items-center justify-center">
                    <span aria-hidden className="absolute size-[78%] rounded-full bg-white/10 blur-2xl" />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute bottom-2 right-0 select-none font-display text-[120px] font-bold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,.28)]"
                    >
                      {cur.num}
                    </span>
                    <Float className="relative size-[250px]" distance={14} rotate={[-3, 3]} delay={0.1}>
                      <Obj />
                    </Float>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        {/* tablet / mobile: card grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-4 sm:grid-cols-2 lg:hidden"
        >
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.num}
              variants={rise}
              className="group flex flex-col gap-3 rounded-3xl border border-line bg-card p-6 transition duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-[0_26px_60px_rgba(29,102,150,.14)]"
            >
              <div className="flex items-start justify-between">
                <GlossyIcon icon={s.icon} tone={i % 3 === 1 ? "dark" : "blue"} size={52} className="group-hover:-rotate-[8deg] group-hover:scale-105" />
                <span className="font-display text-[15px] font-semibold text-subtle">{s.num}</span>
              </div>
              <h3 className="mt-1.5 font-display text-[21px] font-semibold tracking-[-0.02em]">{s.name}</h3>
              <p className="flex-1 text-[15px] leading-relaxed text-muted">{s.desc}</p>
              <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                Get a Free Quote
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
