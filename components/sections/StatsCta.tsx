"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CTA, STATS } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { GridFloor } from "@/components/ui/GridFloor";

/** Counts up from 0 to the number in `value` (keeps suffixes like "+"). */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const target = parseInt(value, 10);
  const suffix = value.replace(/^\d+/, "");
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, target]);

  return (
    <span ref={ref} aria-label={value}>
      {n}
      {suffix}
    </span>
  );
}

/** Compact banner: headline + buttons on one row, stats in a slim row underneath. */
export function StatsCta() {
  const [before, after] = CTA.title.split("scale");

  return (
    <section className="relative px-4 pb-14 pt-4 sm:px-6 sm:pb-16">
      <Reveal className="mx-auto max-w-[1200px]">
        <div
          className="relative overflow-hidden rounded-[24px] border border-white/10 px-6 py-7 text-white sm:rounded-[28px] sm:px-9 sm:py-8"
          style={{
            background:
              "radial-gradient(ellipse 50% 120% at 100% 0%, rgba(41,127,177,.6), transparent 65%), radial-gradient(ellipse 40% 100% at 0% 120%, rgba(41,127,177,.35), transparent 70%), #0A0C10",
          }}
        >
          <GridFloor height={150} size={40} perspective={420} color="rgba(90,174,224,.2)" animated={false} className="-left-[10%] -right-[10%] -bottom-10" />

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-[600px]">
              <h2 className="font-display text-[clamp(28px,3.4vw,42px)] font-semibold leading-[1.06] tracking-[-0.04em]">
                {before}
                {after !== undefined && <span className="text-brand-300">scale</span>}
                {after}
              </h2>
              <p className="mt-2 text-[15.5px] leading-relaxed text-[#c4cdd6]">{CTA.sub}</p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-2.5">
              <a
                href="#contact"
                className="group inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-white py-1 pl-5 pr-1 text-[14.5px] font-semibold text-[#0a0c10] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(255,255,255,.2)]"
              >
                Start a Conversation
                <span className="flex size-[38px] items-center justify-center rounded-full bg-gradient-to-b from-[#3b9ad1] to-brand-600 text-white transition-transform duration-300 group-hover:rotate-[-45deg]">
                  <ArrowRight size={16} strokeWidth={2.4} />
                </span>
              </a>
              <a
                href="#services"
                className="inline-flex min-h-[48px] items-center rounded-full border border-white/20 bg-white/[.06] px-5 text-[14.5px] font-semibold backdrop-blur-md transition hover:-translate-y-0.5 hover:border-brand-300/60 hover:bg-white/10"
              >
                Explore Services
              </a>
            </div>
          </div>

          <dl className="relative z-10 mt-6 grid grid-cols-2 gap-y-4 border-t border-white/10 pt-5 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <div key={s.label} className={`flex items-center gap-3 ${i > 0 ? "lg:border-l lg:border-white/10 lg:pl-6" : ""}`}>
                <dd className="font-display text-[28px] font-bold leading-none tracking-[-0.04em] text-brand-300 sm:text-[32px]">
                  <CountUp value={s.value} />
                </dd>
                <dt className="max-w-[110px] text-[12.5px] leading-tight text-[#c4cdd6]">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}
