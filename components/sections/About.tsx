"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Flag, Layers, Trophy, Users } from "lucide-react";
import { ABOUT, STATS, VALUES } from "@/lib/data";
import { Team } from "@/components/sections/Team";
import { Reveal, rise, stagger } from "@/components/ui/Reveal";
import { SectionBadge, SectionLabel, SectionTitle } from "@/components/ui/SectionLabel";
import { GlossyIcon } from "@/components/ui/GlossyIcon";

/** Journey steps, built only from facts already in ABOUT + STATS. */
const stat = (label: string) => STATS.find((s) => s.label.includes(label))?.value ?? "";
const STEPS = [
  { icon: Flag, title: "Founded in 2018", desc: "To make enterprise-grade digital marketing accessible to every ambitious brand." },
  { icon: Users, title: "A full-service team", desc: "Strategists, designers, media buyers, content creators and tech experts." },
  { icon: Trophy, title: `${stat("Projects")} projects delivered`, desc: `For ${stat("Clients")} happy clients.` },
  { icon: Layers, title: `${stat("Services")} core services today`, desc: "All under one roof, delivering results that matter." },
];

/* Our Story animations */
const EASE = [0.2, 0.7, 0.2, 1] as const;
const textStagger = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } };

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 px-4 pb-24 sm:px-6 sm:pb-[110px]">
      <div className="mx-auto max-w-[1200px]">
        {/* Our Story — header above the card, same as other sections */}
        <Reveal className="mb-7 text-center sm:mb-9">
          <SectionBadge icon={<Flag size={14} />}>
            Our <strong className="font-display font-bold tracking-[-0.01em] text-brand-700">Story</strong>
          </SectionBadge>
          <SectionTitle className="mb-3 mt-4">
            Empowering brands since <span className="text-brand">2018</span>
          </SectionTitle>
          <p className="mx-auto max-w-[620px] text-lg leading-relaxed text-muted">
            Seven years of helping ambitious brands grow. Here&apos;s who we are and what drives us.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="grid overflow-hidden rounded-[32px] border border-line bg-card shadow-[0_30px_80px_rgba(29,102,150,.1)] lg:grid-cols-[1fr_1fr]">
            <motion.div
              variants={textStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col justify-center p-7 sm:p-10 lg:p-12"
            >
              <motion.p variants={fadeUp} className="text-[16.5px] leading-[1.8] text-muted">
                {ABOUT.p1}
              </motion.p>
              <motion.figure variants={fadeUp} className="relative mt-6 pl-4">
                {/* quote bar grows top → bottom */}
                <motion.span
                  aria-hidden
                  variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 0.7, delay: 0.15, ease: EASE } } }}
                  className="absolute inset-y-0 left-0 w-[3px] origin-top rounded-full bg-brand"
                />
                <blockquote className="font-display text-[18px] font-medium leading-[1.5] tracking-[-0.01em] text-ink">{ABOUT.p2}</blockquote>
              </motion.figure>
              <motion.div variants={fadeUp} className="mt-8">
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-[#0a0c10] px-5 py-2.5 text-[13.5px] font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(10,12,16,.3)] dark:border dark:border-white/15"
                  >
                    Work with us
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </a>
                  <a href="#services" className="group inline-flex items-center gap-1.5 px-2 py-2.5 text-[13.5px] font-semibold text-brand-700">
                    Explore services
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            </motion.div>

            <div className="relative overflow-hidden bg-gradient-to-br from-[#eef6fc] to-[#d4e9f7] p-7 sm:p-10 lg:p-12 dark:from-[#0e1a26] dark:to-[#0a2236]">
              {/* slow drifting glow */}
              <motion.div
                aria-hidden
                animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute -right-20 top-10 size-[280px] rounded-full bg-white/60 blur-3xl dark:bg-brand/20"
              />

              <motion.p
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: EASE }}
                className="relative mb-6 text-[12.5px] font-bold uppercase tracking-[0.14em] text-brand-700"
              >
                Our journey
              </motion.p>

              <Journey />
            </div>
          </div>
          </Reveal>

        <Team />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-5 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-5"
        >
          {VALUES.map((v) => (
            <motion.div
              key={v.name}
              variants={rise}
              className="rounded-3xl border border-line border-t-[3px] border-t-brand bg-card p-6 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_60px_rgba(29,102,150,.14)]"
            >
              <p className="mb-2 font-display text-lg font-semibold">{v.name}</p>
              <p className="text-sm leading-relaxed text-muted">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/** Journey stepper: the line fills as you scroll, and each step lights up when the line reaches it. */
function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  const dotTop = useTransform(progress, (v) => `${v * 100}%`);
  const [active, setActive] = useState(-1);

  useMotionValueEvent(progress, "change", (v) => {
    const last = STEPS.length - 1;
    let n = -1;
    for (let i = 0; i <= last; i++) if (v >= (i / last) * 0.97 + 0.02) n = i;
    setActive(n);
  });

  return (
    <ol ref={ref} className="relative">
      {/* rail, fill and travelling dot */}
      <span aria-hidden className="absolute bottom-[22px] left-[21px] top-[22px] w-[2px]">
        <span className="absolute inset-0 rounded-full bg-brand/15" />
        <motion.span style={{ scaleY: progress }} className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-brand-600 to-brand-300" />
        <motion.span
          style={{ top: dotTop }}
          className="absolute left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_4px_rgba(41,127,177,.35),0_0_18px_rgba(41,127,177,.8)]"
        />
      </span>

      {STEPS.map((s, i) => {
        const on = i <= active;
        const Icon = s.icon;
        return (
          <li key={s.title} className="group relative flex gap-4 pb-6 last:pb-0">
            {/* icon: muted tile → glossy blue when reached */}
            <span className={`relative z-10 size-11 shrink-0 transition-transform duration-500 ${on ? "scale-100" : "scale-90"}`}>
              <span className="absolute inset-0 flex items-center justify-center rounded-[13px] border border-brand/20 bg-white text-brand/50 dark:bg-[#0e1218]">
                <Icon size={20} strokeWidth={2} />
              </span>
              <span className={`absolute inset-0 transition-opacity duration-500 ${on ? "opacity-100" : "opacity-0"}`}>
                <GlossyIcon icon={Icon} tone={i === STEPS.length - 1 ? "dark" : "blue"} size={44} className="group-hover:-rotate-6 group-hover:scale-110" />
              </span>
            </span>

            <div
              className={`flex-1 rounded-2xl border px-4 py-3 backdrop-blur-sm transition-all duration-500 group-hover:-translate-y-0.5 ${
                on
                  ? "translate-x-0 border-brand/25 bg-white opacity-100 shadow-[0_16px_34px_rgba(29,102,150,.14)] dark:bg-white/[.08] dark:shadow-none"
                  : "translate-x-3 border-white/60 bg-white/50 opacity-60 dark:border-white/5 dark:bg-white/[.03]"
              }`}
            >
              <p className="font-display text-[16px] font-semibold text-ink">{s.title}</p>
              <p className="mt-0.5 text-[13.5px] leading-snug text-muted">{s.desc}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
