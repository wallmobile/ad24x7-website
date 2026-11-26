"use client";

import { motion } from "framer-motion";
import { Crown, Heart, Palette, PenLine, Search, TrendingUp, Users, type LucideIcon } from "lucide-react";
import { TEAM } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge, SectionTitle } from "@/components/ui/SectionLabel";
import { LikeBubble3D, Magnifier3D, Megaphone3D, PieChart3D, Play3D, Rocket3D } from "@/components/objects/Objects3D";

const roleIcon = (role: string): LucideIcon =>
  /CEO|Founder/i.test(role) ? Crown
  : /Performance/i.test(role) ? TrendingUp
  : /Creative/i.test(role) ? Palette
  : /SEO/i.test(role) ? Search
  : /Social/i.test(role) ? Heart
  : PenLine;

/** a 3D object that suits each role */
const roleArt = (role: string) =>
  /CEO|Founder/i.test(role) ? Rocket3D
  : /Performance/i.test(role) ? PieChart3D
  : /Creative/i.test(role) ? Play3D
  : /SEO/i.test(role) ? Magnifier3D
  : /Social/i.test(role) ? LikeBubble3D
  : Megaphone3D;

function Avatar({ ini, dark, size, className = "" }: { ini: string; dark: boolean; size: number; className?: string }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full font-display font-bold text-white ${dark ? "glossy-dark" : "glossy-blue"} ${className}`}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.34) }}
    >
      {ini}
    </span>
  );
}

/** "Meet the Team": flip cards — front shows the person, back shows a 3D object for their role. */
export function Team() {
  return (
    <div className="mt-20">
      <Reveal className="mx-auto mb-9 max-w-[720px] text-center sm:mb-12">
        <SectionBadge icon={<Users size={14} />}>
          Meet the <strong className="font-display font-bold tracking-[-0.01em] text-brand-700">Team</strong>
        </SectionBadge>
        <SectionTitle className="mb-3 mt-4">
          The people behind <span className="text-brand">Ad24x7</span>
        </SectionTitle>
        <p className="text-lg leading-relaxed text-muted">Specialists in performance, creative, SEO, social and content — working as one team on your growth.</p>
      </Reveal>

      {/* flip cards: hover (or tap / focus) to see the back */}
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {TEAM.map((t, i) => {
          const Icon = roleIcon(t.role);
          const Art = roleArt(t.role);
          const dark = i % 2 === 1;
          return (
            <motion.li
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.2, 0.7, 0.2, 1] }}
              tabIndex={0}
              className="group h-[280px] rounded-[26px] outline-none [perspective:1000px] focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
            >
              <div className="relative size-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus:[transform:rotateY(180deg)]">
                {/* front */}
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[26px] border border-line bg-card p-5 text-center shadow-[0_18px_44px_rgba(29,102,150,.1)] [backface-visibility:hidden]">
                  <Avatar ini={t.ini} dark={i % 2 === 1} size={92} />
                  <p className="mt-5 font-display text-[17px] font-semibold text-ink">{t.name}</p>
                  <p className="mt-1 text-[12.5px] font-medium text-brand-700">{t.role}</p>
                </div>
                {/* back */}
                <div
                  aria-hidden
                  className={`absolute inset-0 flex flex-col items-center justify-between overflow-hidden rounded-[26px] p-5 text-center text-white [backface-visibility:hidden] [transform:rotateY(180deg)] ${
                    dark ? "bg-gradient-to-b from-[#3a4048] to-[#0a0c10]" : "bg-gradient-to-b from-[#5aaee0] to-[#134a6e]"
                  }`}
                >
                  <div className="grid-floor absolute -bottom-8 -left-[20%] -right-[20%] h-[150px] opacity-50 [--grid-color:rgba(255,255,255,.16)] [--grid-size:26px]" />
                  <span aria-hidden className="relative mt-2 size-[110px]">
                    <Art />
                  </span>
                  <div className="relative">
                    <p className="font-display text-[17px] font-semibold">{t.name}</p>
                    <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[12px] font-semibold backdrop-blur-sm">
                      <Icon size={12} /> {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
