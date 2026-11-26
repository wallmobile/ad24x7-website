"use client";

/**
 * Code-drawn glossy "3D" marketing objects (pure SVG, no images).
 * Each uses useId() so gradient ids never collide when used more than once.
 */
import { useId, useRef } from "react";
import { motion, useAnimationFrame, useReducedMotion } from "framer-motion";

type SvgProps = { className?: string };
const base = "h-full w-full overflow-visible";
const uid = (raw: string) => raw.replace(/[^a-zA-Z0-9_-]/g, "");

/* ── Megaphone (promotion) ───────────────────────────── */
export function Megaphone3D({ className = "" }: SvgProps) {
  const id = uid(useId());
  return (
    <svg viewBox="0 0 260 260" className={`${base} ${className}`} style={{ filter: "drop-shadow(0 30px 30px rgba(10,12,16,.22))" }}>
      <defs>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FDFDFE" /><stop offset=".35" stopColor="#C9CED4" /><stop offset=".6" stopColor="#8E959D" /><stop offset=".85" stopColor="#D7DBE0" /><stop offset="1" stopColor="#9AA1A9" />
        </linearGradient>
        <radialGradient id={`${id}r`} cx=".35" cy=".3" r=".9"><stop offset="0" stopColor="#FFF" /><stop offset=".45" stopColor="#C4C9CF" /><stop offset="1" stopColor="#6E757D" /></radialGradient>
        <radialGradient id={`${id}i`} cx=".6" cy=".55" r=".7"><stop offset="0" stopColor="#3A4048" /><stop offset="1" stopColor="#9AA1A9" /></radialGradient>
        <linearGradient id={`${id}u`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8FD0F5" /><stop offset=".5" stopColor="#297FB1" /><stop offset="1" stopColor="#134A6E" /></linearGradient>
      </defs>
      <rect x="38" y="112" width="44" height="58" rx="14" fill={`url(#${id}u)`} />
      <path d="M70 104 L176 50 Q186 130 176 214 L70 164 Z" fill={`url(#${id}b)`} />
      <path d="M78 112 L170 66" stroke="#FFF" strokeWidth="6" strokeLinecap="round" opacity=".7" />
      <ellipse cx="180" cy="132" rx="34" ry="86" fill={`url(#${id}r)`} />
      <ellipse cx="184" cy="132" rx="22" ry="66" fill={`url(#${id}i)`} />
      <ellipse cx="190" cy="132" rx="8" ry="22" fill="#2A2F36" />
      <path d="M92 164 Q96 206 118 214 L130 210 Q112 196 114 172 Z" fill={`url(#${id}b)`} />
    </svg>
  );
}

/* ── Like bubble (social media) ──────────────────────── */
export function LikeBubble3D({ className = "", glow = "rgba(41,127,177,.38)" }: SvgProps & { glow?: string }) {
  const id = uid(useId());
  const bubble = "M60 40 H200 Q230 40 230 70 V160 Q230 190 200 190 H124 L80 230 L88 190 H60 Q30 190 30 160 V70 Q30 40 60 40Z";
  const heart = "M130 166 C70 126 78 72 110 76 C122 78 128 87 130 94 C132 87 138 78 150 76 C182 72 190 126 130 166Z";
  return (
    <svg viewBox="0 0 260 260" className={`${base} ${className}`} style={{ filter: `drop-shadow(0 34px 30px ${glow})` }}>
      <defs>
        <radialGradient id={`${id}b`} gradientUnits="userSpaceOnUse" cx="90" cy="60" r="220">
          <stop offset="0" stopColor="#C4E7FC" /><stop offset=".35" stopColor="#4A9ED4" /><stop offset=".75" stopColor="#1D6696" /><stop offset="1" stopColor="#0C3450" />
        </radialGradient>
        <linearGradient id={`${id}h`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFF" /><stop offset="1" stopColor="#D5E6F2" /></linearGradient>
      </defs>
      <path transform="translate(10 12)" d={bubble} fill="#0C3450" />
      <path d={bubble} fill={`url(#${id}b)`} />
      <path d={heart} transform="translate(4 6)" fill="#0C3450" opacity=".35" />
      <motion.path
        d={heart}
        fill={`url(#${id}h)`}
                animate={{ scale: [1, 1.12, 1, 1.08, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.2 }}
      />
      <path d="M58 58 Q100 50 150 52" stroke="#FFF" strokeWidth="7" strokeLinecap="round" fill="none" opacity=".55" />
    </svg>
  );
}

/* ── Pie chart (analytics) ───────────────────────────── */
export function PieChart3D({ className = "" }: SvgProps) {
  const id = uid(useId());
  const C = 2 * Math.PI * 50;
  const segs: [string, number, number][] = [
    ["#297FB1", 0.38, 0],
    ["#0A0C10", 0.27, 0.38],
    ["#9FD0EE", 0.2, 0.65],
  ];
  return (
    <svg viewBox="0 0 260 260" className={`${base} ${className}`} style={{ filter: "drop-shadow(0 34px 30px rgba(29,102,150,.32))" }}>
      <defs>
        <linearGradient id={`${id}w`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFF" /><stop offset="1" stopColor="#CFE3F1" /></linearGradient>
        <radialGradient id={`${id}g`} cx=".3" cy=".25" r=".8"><stop offset="0" stopColor="#FFF" stopOpacity=".55" /><stop offset=".5" stopColor="#FFF" stopOpacity="0" /></radialGradient>
      </defs>
      <circle cx="140" cy="144" r="100" fill="#0C3450" />
      {segs.map(([c, f, o]) => (
        <circle key={c} cx="130" cy="130" r="50" fill="none" stroke={c} strokeWidth="100" strokeDasharray={`${C * f} ${C}`} strokeDashoffset={-C * o} transform="rotate(-90 130 130)" />
      ))}
      <motion.g animate={{ x: [10, 18, 10], y: [-8, -14, -8] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
        <circle cx="130" cy="130" r="50" fill="none" stroke={`url(#${id}w)`} strokeWidth="100" strokeDasharray={`${C * 0.15} ${C}`} strokeDashoffset={-C * 0.85} transform="rotate(-90 130 130)" />
      </motion.g>
      <circle cx="130" cy="130" r="100" fill={`url(#${id}g)`} />
    </svg>
  );
}

/* ── Target + dart (targeting) ───────────────────────── */
export function Target3D({ className = "" }: SvgProps) {
  const id = uid(useId());
  return (
    <svg viewBox="0 0 260 260" className={`${base} ${className}`} style={{ filter: "drop-shadow(0 30px 30px rgba(10,12,16,.25))" }}>
      <defs>
        <radialGradient id={`${id}g`} cx=".3" cy=".25" r=".85"><stop offset="0" stopColor="#FFF" stopOpacity=".6" /><stop offset=".55" stopColor="#FFF" stopOpacity="0" /></radialGradient>
        <linearGradient id={`${id}f`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8FD0F5" /><stop offset="1" stopColor="#1D6696" /></linearGradient>
      </defs>
      <circle cx="128" cy="142" r="100" fill="#0A0C10" />
      <circle cx="118" cy="132" r="100" fill="#FFF" />
      <circle cx="118" cy="132" r="80" fill="#297FB1" />
      <circle cx="118" cy="132" r="60" fill="#FFF" />
      <circle cx="118" cy="132" r="40" fill="#1D6696" />
      <circle cx="118" cy="132" r="20" fill="#0A0C10" />
      <circle cx="118" cy="132" r="100" fill={`url(#${id}g)`} />
      <motion.g animate={{ x: [0, 6, 0], y: [0, -6, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M122 128 L226 30" stroke="#0A0C10" strokeWidth="9" strokeLinecap="round" />
        <path d="M210 30 L238 8 L232 40 Z" fill={`url(#${id}f)`} />
        <path d="M226 46 L252 26 L238 56 Z" fill={`url(#${id}f)`} opacity=".85" />
      </motion.g>
    </svg>
  );
}

/* ── Rocket (launch / growth) ────────────────────────── */
export function Rocket3D({ className = "" }: SvgProps) {
  const id = uid(useId());
  return (
    <svg viewBox="0 0 260 260" className={`${base} ${className}`} style={{ filter: "drop-shadow(0 30px 30px rgba(41,127,177,.35))" }}>
      <defs>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#C4E7FC" /><stop offset=".4" stopColor="#4A9ED4" /><stop offset="1" stopColor="#0C3450" /></linearGradient>
        <linearGradient id={`${id}k`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#4A525C" /><stop offset="1" stopColor="#000" /></linearGradient>
        <radialGradient id={`${id}w`} cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#FFF" /><stop offset="1" stopColor="#B9D6EA" /></radialGradient>
        <linearGradient id={`${id}fl`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFF" /><stop offset=".5" stopColor="#7FC0EA" /><stop offset="1" stopColor="#297FB1" stopOpacity="0" /></linearGradient>
      </defs>
      <g transform="rotate(38 130 130)">
        <motion.path
          d="M108 190 Q130 268 152 190 Z"
          fill={`url(#${id}fl)`}
          style={{ originY: 0 }}
          animate={{ scaleY: [1, 1.25, 1] }}
          transition={{ duration: 0.35, repeat: Infinity, ease: "easeInOut" }}
        />
        <path d="M96 140 L58 196 L100 182 Z" fill={`url(#${id}k)`} />
        <path d="M164 140 L202 196 L160 182 Z" fill={`url(#${id}k)`} />
        <rect x="104" y="174" width="52" height="18" rx="6" fill="#22282F" />
        <path d="M130 16 C170 48 178 112 166 178 H94 C82 112 90 48 130 16Z" fill={`url(#${id}b)`} />
        <path d="M130 16 C150 32 162 56 166 82 H94 C98 56 110 32 130 16Z" fill="#0A0C10" opacity=".9" />
        <circle cx="130" cy="112" r="22" fill={`url(#${id}w)`} stroke="#0A0C10" strokeWidth="7" />
        <path d="M104 92 Q104 140 110 170" stroke="#FFF" strokeWidth="5" strokeLinecap="round" fill="none" opacity=".45" />
      </g>
    </svg>
  );
}

/* ── Play button (video marketing) ───────────────────── */
export function Play3D({ className = "" }: SvgProps) {
  const id = uid(useId());
  return (
    <svg viewBox="0 0 260 260" className={`${base} ${className}`} style={{ filter: "drop-shadow(0 34px 30px rgba(10,12,16,.30))" }}>
      <defs>
        <linearGradient id={`${id}k`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4A525C" /><stop offset=".45" stopColor="#0A0C10" /><stop offset="1" stopColor="#000" /></linearGradient>
        <linearGradient id={`${id}t`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#C4E7FC" /><stop offset=".5" stopColor="#4A9ED4" /><stop offset="1" stopColor="#1D6696" /></linearGradient>
      </defs>
      <g transform="rotate(12 130 130)">
        <rect x="48" y="52" width="180" height="170" rx="50" fill="#000" />
        <rect x="36" y="40" width="180" height="170" rx="50" fill={`url(#${id}k)`} />
        <path d="M58 70 Q90 52 160 54" stroke="#FFF" strokeWidth="7" strokeLinecap="round" fill="none" opacity=".35" />
        <path d="M104 88 Q104 78 113 83 L166 116 Q174 122 166 128 L113 160 Q104 165 104 155Z" fill={`url(#${id}t)`} />
      </g>
    </svg>
  );
}

/* ── Envelope (email / retention) ────────────────────── */
export function Envelope3D({ className = "" }: SvgProps) {
  const id = uid(useId());
  return (
    <svg viewBox="0 0 260 260" className={`${base} ${className}`} style={{ filter: "drop-shadow(0 30px 30px rgba(29,102,150,.30))" }}>
      <defs>
        <linearGradient id={`${id}e`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFF" /><stop offset="1" stopColor="#D3E1EC" /></linearGradient>
        <radialGradient id={`${id}s`} cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#C4E7FC" /><stop offset=".45" stopColor="#2A85BC" /><stop offset="1" stopColor="#0C3450" /></radialGradient>
      </defs>
      <g transform="rotate(-10 130 130)">
        <path d="M30 100 L130 40 L230 100 V210 H30Z" fill="#9FB4C6" />
        <motion.g animate={{ y: [0, -16, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
          <rect x="58" y="56" width="144" height="110" rx="8" fill="#FFF" />
          <rect x="76" y="78" width="80" height="9" rx="4" fill="#297FB1" />
          <rect x="76" y="98" width="108" height="7" rx="3" fill="#DCE7EF" />
          <rect x="76" y="114" width="96" height="7" rx="3" fill="#DCE7EF" />
        </motion.g>
        <path d="M30 104 L130 166 L230 104 V200 Q230 216 214 216 H46 Q30 216 30 200Z" fill={`url(#${id}e)`} />
        <path d="M36 208 L112 152 M224 208 L148 152" stroke="#C3D3E0" strokeWidth="4" strokeLinecap="round" />
        <circle cx="130" cy="166" r="28" fill={`url(#${id}s)`} />
        <text x="130" y="177" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight={700} fontSize="30" fill="#FFF">@</text>
      </g>
    </svg>
  );
}

/* ── Notification bell (push / retention) ────────────── */
export function Bell3D({ className = "" }: SvgProps) {
  const id = uid(useId());
  return (
    <svg viewBox="0 0 260 260" className={`${base} ${className}`} style={{ filter: "drop-shadow(0 30px 30px rgba(41,127,177,.30))" }}>
      <defs>
        <linearGradient id={`${id}c`} gradientUnits="userSpaceOnUse" x1="70" y1="40" x2="200" y2="200">
          <stop offset="0" stopColor="#FFF" /><stop offset=".3" stopColor="#B7BEC6" /><stop offset=".55" stopColor="#6A717A" /><stop offset=".78" stopColor="#E1E5EA" /><stop offset="1" stopColor="#848B94" />
        </linearGradient>
        <radialGradient id={`${id}b`} cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#C4E7FC" /><stop offset=".45" stopColor="#2A85BC" /><stop offset="1" stopColor="#0C3450" /></radialGradient>
      </defs>
      <motion.g
        style={{ originY: 0 }}
        animate={{ rotate: [0, 12, -10, 6, 0, 0] }}
        transition={{ duration: 3, repeat: Infinity, times: [0, 0.1, 0.2, 0.3, 0.4, 1] }}
      >
        <circle cx="130" cy="44" r="12" fill={`url(#${id}c)`} />
        <circle cx="130" cy="206" r="20" fill={`url(#${id}b)`} />
        <path d="M130 50 C84 50 74 92 74 124 C74 152 64 168 46 184 H214 C196 168 186 152 186 124 C186 92 176 50 130 50Z" fill={`url(#${id}c)`} />
        <ellipse cx="130" cy="186" rx="86" ry="14" fill="#5E656D" />
        <path d="M96 80 Q90 110 92 150" stroke="#FFF" strokeWidth="8" strokeLinecap="round" fill="none" opacity=".6" />
      </motion.g>
      <circle cx="196" cy="62" r="30" fill={`url(#${id}b)`} stroke="#FFF" strokeWidth="5" />
      <path d="M184 62 H208 M196 50 V74" stroke="#FFF" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

/* ── Planet with ring + orbiting moon (hero, right) ──── */
export function Planet3D({ className = "" }: SvgProps) {
  const id = uid(useId());
  const reduce = useReducedMotion();
  const backRef = useRef<SVGCircleElement>(null);
  const frontRef = useRef<SVGCircleElement>(null);
  const RX = 122, RY = 36, CX = 130, CY = 130;
  const ringBack = `M${CX - RX} ${CY + 8} A${RX} ${RY} 0 0 1 ${CX + RX} ${CY + 8}`;
  const ringFront = `M${CX - RX} ${CY + 8} A${RX} ${RY} 0 0 0 ${CX + RX} ${CY + 8}`;

  // The moon travels the ring ellipse. Lower half = in front of the planet, upper half = behind it.
  useAnimationFrame((t) => {
    const a = reduce ? 0.9 : (t / 1000) * ((Math.PI * 2) / 9);
    const sin = Math.sin(a);
    const x = CX + RX * Math.cos(a);
    const y = CY + 8 + RY * sin;
    const r = 11 + 4 * sin; // bigger when near the viewer
    const front = sin >= 0;
    const set = (el: SVGCircleElement | null, on: boolean) => {
      if (!el) return;
      el.setAttribute("cx", x.toFixed(2));
      el.setAttribute("cy", y.toFixed(2));
      el.setAttribute("r", r.toFixed(2));
      el.setAttribute("opacity", on ? "1" : "0");
    };
    set(backRef.current, !front);
    set(frontRef.current, front);
  });

  return (
    <svg viewBox="0 0 260 260" className={`${base} ${className}`} style={{ filter: "drop-shadow(0 30px 40px rgba(41,127,177,.45))" }}>
      <defs>
        <radialGradient id={`${id}p`} cx=".32" cy=".28" r=".85">
          <stop offset="0" stopColor="#9FD6F7" /><stop offset=".4" stopColor="#3C93CC" /><stop offset=".8" stopColor="#14588A" /><stop offset="1" stopColor="#0A2F4D" />
        </radialGradient>
        <linearGradient id={`${id}r`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" style={{ stopColor: "var(--planet-ring)" }} stopOpacity=".2" /><stop offset=".5" style={{ stopColor: "var(--planet-ring)" }} /><stop offset="1" style={{ stopColor: "var(--planet-ring)" }} stopOpacity=".2" />
        </linearGradient>
        <radialGradient id={`${id}m`} cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#D8F0FF" /><stop offset=".5" stopColor="#5AAEE0" /><stop offset="1" stopColor="#1D6696" /></radialGradient>
      </defs>
      <g transform="rotate(-16 130 130)">
        <path d={ringBack} fill="none" stroke={`url(#${id}r)`} strokeWidth="7" strokeLinecap="round" style={{ opacity: "var(--planet-ring-back)" }} />
        <circle ref={backRef} fill={`url(#${id}m)`} opacity="0" />
        <circle cx="130" cy="130" r="80" fill={`url(#${id}p)`} />
        <ellipse cx="104" cy="96" rx="34" ry="20" fill="#FFF" opacity=".16" transform="rotate(-30 104 96)" />
        <path d={ringFront} fill="none" stroke={`url(#${id}r)`} strokeWidth="9" strokeLinecap="round" />
        <circle ref={frontRef} fill={`url(#${id}m)`} opacity="0" />
      </g>
    </svg>
  );
}

/* ── Magnifying glass (hero, left) ───────────────────── */
export function Magnifier3D({ className = "" }: SvgProps) {
  const id = uid(useId());
  return (
    <svg viewBox="0 0 260 260" className={`${base} ${className}`} style={{ filter: "drop-shadow(0 30px 30px rgba(0,0,0,.35))" }}>
      <defs>
        <linearGradient id={`${id}m`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFF" /><stop offset=".3" stopColor="#B7BEC6" /><stop offset=".55" stopColor="#6A717A" /><stop offset=".8" stopColor="#DDE1E6" /><stop offset="1" stopColor="#7C838C" />
        </linearGradient>
        <radialGradient id={`${id}g`} cx=".4" cy=".35" r=".8"><stop offset="0" stopColor="#3C7FA8" /><stop offset=".6" stopColor="#1D4F72" /><stop offset="1" stopColor="#12364F" /></radialGradient>
        <linearGradient id={`${id}h`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#6CB8E6" /><stop offset=".5" stopColor="#297FB1" /><stop offset="1" stopColor="#134A6E" /></linearGradient>
      </defs>
      <path d="M156 156 L222 222" stroke={`url(#${id}h)`} strokeWidth="30" strokeLinecap="round" />
      <path d="M160 152 L218 210" stroke="#FFF" strokeWidth="5" strokeLinecap="round" opacity=".35" />
      <circle cx="102" cy="102" r="76" fill={`url(#${id}m)`} />
      <circle cx="102" cy="102" r="58" fill={`url(#${id}g)`} />
      <path d="M62 84 Q72 62 98 56" stroke="#FFF" strokeWidth="7" strokeLinecap="round" fill="none" opacity=".5" />
    </svg>
  );
}
