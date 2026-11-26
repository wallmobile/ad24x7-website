"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { Search } from "lucide-react";
import { GridFloor } from "@/components/ui/GridFloor";
import { Float } from "@/components/ui/Float";
import { Bell3D, Magnifier3D, PieChart3D } from "@/components/objects/Objects3D";

const CYCLE = 6; // seconds for one chart draw → hold → reset loop
const LINE = "M4 72 C 30 69, 52 62, 78 54 S 126 47, 154 35 S 214 26, 244 15 S 276 8, 292 4";

/** Types category names into the fake search box, one after another. */
function TypedWord({ words }: { words: string[] }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [text, setText] = useState(reduce ? words[0] : "");
  const [phase, setPhase] = useState<"type" | "hold" | "delete">("type");

  useEffect(() => {
    if (reduce) return;
    const word = words[i];
    let t: ReturnType<typeof setTimeout> | undefined;
    if (phase === "type") {
      if (text.length === word.length) setPhase("hold");
      else t = setTimeout(() => setText(word.slice(0, text.length + 1)), 90);
    } else if (phase === "hold") {
      t = setTimeout(() => setPhase("delete"), 1500);
    } else if (text.length === 0) {
      setI((n) => (n + 1) % words.length);
      setPhase("type");
    } else {
      t = setTimeout(() => setText((s) => s.slice(0, -1)), 45);
    }
    return () => clearTimeout(t);
  }, [phase, text, i, words, reduce]);

  return (
    <span className="whitespace-nowrap">
      {text}
      {!reduce && <motion.span aria-hidden animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} className="ml-px inline-block h-3.5 w-[2px] translate-y-[2px] bg-white" />}
    </span>
  );
}

/** A layer that drifts with the pointer; `depth` is how many px it moves at the panel edge. */
function Layer({ x, y, depth, className, children }: { x: MotionValue<number>; y: MotionValue<number>; depth: number; className: string; children: React.ReactNode }) {
  const tx = useTransform(x, (v) => v * depth);
  const ty = useTransform(y, (v) => v * depth);
  return (
    <motion.div style={{ x: tx, y: ty }} className={className}>
      {children}
    </motion.div>
  );
}

/** Animated hero visual for the blog page: typing search, self-drawing growth chart, floating 3D objects, parallax. */
export function BlogHeroScene({ topics }: { topics: string[] }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 90, damping: 18 });
  const y = useSpring(my, { stiffness: 90, damping: 18 });

  const loop = (times: number[]) => ({ duration: CYCLE, times, repeat: Infinity, ease: "easeInOut" as const });

  return (
    <div
      aria-hidden
      data-hero-scene
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
        my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative hidden min-h-[300px] overflow-hidden rounded-[28px] bg-gradient-to-br from-[#5aaee0] via-[#2273a8] to-[#0b2f4a] shadow-[0_24px_60px_rgba(29,102,150,.3)] lg:block"
    >
      <GridFloor height={170} size={40} perspective={400} color="rgba(255,255,255,.14)" animated={false} className="-bottom-10" />

      {/* slow drifting glows */}
      <motion.div animate={reduce ? undefined : { x: [0, 40, 0], y: [0, 20, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute -left-12 -top-12 size-[230px] rounded-full bg-white/20 blur-3xl" />
      <motion.div animate={reduce ? undefined : { x: [0, -30, 0], y: [0, -24, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute -bottom-16 right-0 size-[240px] rounded-full bg-[#05070a]/30 blur-3xl" />

      {/* chart card */}
      <Layer x={x} y={y} depth={-6} className="absolute inset-x-[8%] bottom-[9%] top-[31%] z-10 overflow-hidden rounded-[22px] border border-white/25 bg-white/10 shadow-[0_18px_44px_rgba(5,7,10,.25)] backdrop-blur-md">
        {/* skeleton "article" header */}
        <div className="flex items-center gap-2.5 p-3.5">
          <span className="size-6 rounded-full bg-white/30" />
          <span className="space-y-1.5">
            <motion.span animate={reduce ? undefined : { opacity: [0.35, 0.7, 0.35] }} transition={{ duration: 2.4, repeat: Infinity }} className="block h-2 w-24 rounded-full bg-white/40" />
            <motion.span animate={reduce ? undefined : { opacity: [0.25, 0.5, 0.25] }} transition={{ duration: 2.4, repeat: Infinity, delay: 0.4 }} className="block h-2 w-14 rounded-full bg-white/30" />
          </span>
        </div>

        {/* growth line draws itself, glows, then resets */}
        <svg viewBox="0 0 300 80" fill="none" className="absolute inset-x-2 bottom-2 w-[calc(100%-1rem)]">
          <defs>
            <linearGradient id="bh-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity=".38" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[20, 40, 60].map((gy) => (
            <line key={gy} x1="0" x2="300" y1={gy} y2={gy} stroke="#fff" strokeOpacity=".14" strokeDasharray="3 5" />
          ))}
          <motion.path
            d={`${LINE} L292 80 L4 80 Z`}
            fill="url(#bh-area)"
            initial={{ opacity: reduce ? 1 : 0 }}
            animate={reduce ? undefined : { opacity: [0, 0, 1, 1, 0] }}
            transition={loop([0, 0.3, 0.55, 0.9, 1])}
          />
          <motion.path
            d={LINE}
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: reduce ? 1 : 0 }}
            animate={reduce ? undefined : { pathLength: [0, 1, 1, 1], opacity: [1, 1, 1, 0] }}
            transition={loop([0, 0.45, 0.9, 1])}
          />
          <motion.g initial={{ opacity: reduce ? 1 : 0 }} animate={reduce ? undefined : { opacity: [0, 0, 1, 1, 0] }} transition={loop([0, 0.42, 0.5, 0.9, 1])}>
            <circle cx="292" cy="4" r="9" fill="#fff" fillOpacity=".25" />
            <circle cx="292" cy="4" r="4.5" fill="#fff" />
          </motion.g>
        </svg>
      </Layer>

      {/* typing search pill */}
      <Layer x={x} y={y} depth={10} className="absolute left-1/2 top-[8%] z-20 -translate-x-1/2">
        <div className="flex items-center gap-2 rounded-full border border-white/30 bg-white/20 py-2 pl-3.5 pr-5 text-[13px] font-semibold text-white shadow-[0_10px_26px_rgba(5,7,10,.25)] backdrop-blur-md">
          <Search size={14} className="shrink-0 opacity-90" />
          <span className="inline-block min-w-[96px]">
            <TypedWord words={topics} />
          </span>
        </div>
      </Layer>

      {/* pie chart */}
      <Layer x={x} y={y} depth={20} className="absolute left-[3%] top-[6%] z-20 size-[112px]">
        <Float className="size-full" distance={10} rotate={[-6, 4]}>
          <PieChart3D />
        </Float>
      </Layer>

      {/* magnifier tile — the glass scans around */}
      <Layer x={x} y={y} depth={14} className="absolute right-[4%] top-[5%] z-20 size-[110px]">
        <Float className="size-full" distance={8} rotate={[3, -2]} delay={0.4}>
          <div className="flex size-full items-center justify-center overflow-hidden rounded-[26px] border border-white/10 bg-gradient-to-br from-[#2a3038] to-[#05070a] shadow-[0_20px_44px_rgba(5,7,10,.45)]">
            <motion.div
              animate={reduce ? undefined : { x: [0, 9, -7, 0], y: [0, -6, 7, 0], rotate: [0, 7, -5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="size-[84px]"
            >
              <Magnifier3D />
            </motion.div>
          </div>
        </Float>
      </Layer>

      {/* bell: swings now and then, with a soft ping ring */}
      <Layer x={x} y={y} depth={26} className="absolute bottom-[4%] right-[3%] z-20 size-[68px]">
        <motion.span
          animate={reduce ? undefined : { scale: [0.7, 1.7], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 2.4, ease: "easeOut" }}
          className="absolute inset-[18%] rounded-full bg-white/35"
        />
        <Float className="size-full" distance={7} rotate={[0, 0]} delay={0.7}>
          <motion.div
            style={{ transformOrigin: "50% 12%" }}
            animate={reduce ? undefined : { rotate: [0, -16, 13, -9, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 4.5, ease: "easeInOut" }}
            className="size-full"
          >
            <Bell3D />
          </motion.div>
        </Float>
      </Layer>

      {/* "new article" toast pops in and out */}
      <motion.div
        initial={{ opacity: reduce ? 1 : 0, y: 10 }}
        animate={reduce ? undefined : { opacity: [0, 0, 1, 1, 0], y: [10, 10, 0, 0, -6] }}
        transition={loop([0, 0.4, 0.5, 0.9, 1])}
        className="absolute bottom-[3%] left-[5%] z-20 flex items-center gap-2 rounded-full border border-white/30 bg-white/90 py-1.5 pl-2.5 pr-3.5 text-[11.5px] font-semibold text-[#0a0c10] shadow-[0_10px_24px_rgba(5,7,10,.3)]"
      >
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-brand" />
        </span>
        New article published
      </motion.div>
    </div>
  );
}
