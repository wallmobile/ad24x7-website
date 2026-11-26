type Props = { children: React.ReactNode; align?: "center" | "start"; dark?: boolean };

/** Small eyebrow label with fading blue lines on both sides (from the hero). */
export function SectionLabel({ children, align = "center", dark = false }: Props) {
  return (
    <div
      className={`flex items-center gap-3.5 text-[15px] font-medium ${
        align === "center" ? "justify-center" : "justify-start"
      } ${dark ? "text-[#c4cdd6]" : "text-ink-2"}`}
    >
      <span aria-hidden className="h-[1.5px] w-12 bg-gradient-to-r from-transparent to-brand" />
      {children}
      <span aria-hidden className="h-[1.5px] w-12 bg-gradient-to-r from-brand to-transparent" />
    </div>
  );
}

/** Badge-style eyebrow: glass pill with a round gradient icon and fading lines on both sides. */
export function SectionBadge({ icon, children, align = "center" }: { icon: React.ReactNode; children: React.ReactNode; align?: "center" | "start" }) {
  return (
    <div className={`flex items-center gap-3 sm:gap-4 ${align === "center" ? "justify-center" : "justify-start"}`}>
      {align === "center" && <span aria-hidden className="h-[1.5px] w-10 bg-gradient-to-r from-transparent to-brand sm:w-[80px]" />}
      <p className="inline-flex items-center gap-2.5 rounded-full border border-brand/25 bg-white/70 py-1.5 pl-1.5 pr-5 text-[14px] font-medium text-ink-2 shadow-[0_8px_24px_rgba(41,127,177,.12)] backdrop-blur-md sm:text-[15px] dark:border-white/10 dark:bg-white/[.05] dark:shadow-none">
        <span className="flex size-7 items-center justify-center rounded-full bg-gradient-to-b from-[#3b9ad1] to-brand-600 text-white shadow-[inset_0_1px_0_rgba(255,255,255,.35)]">{icon}</span>
        <span>{children}</span>
      </p>
      <span aria-hidden className="h-[1.5px] w-10 bg-gradient-to-r from-brand to-transparent sm:w-[80px]" />
    </div>
  );
}

export function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={`font-display text-[clamp(34px,4.6vw,60px)] font-semibold leading-[1.05] tracking-[-0.04em] ${className}`}
    >
      {children}
    </h2>
  );
}
