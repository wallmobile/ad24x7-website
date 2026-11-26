import type { LucideIcon } from "lucide-react";

type Props = { icon: LucideIcon; tone?: "blue" | "dark"; size?: number; className?: string };

/** Glossy 3D-style icon tile in brand blue or ink black. */
export function GlossyIcon({ icon: Icon, tone = "blue", size = 56, className = "" }: Props) {
  return (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center transition-transform duration-300 ${
        tone === "blue" ? "glossy-blue" : "glossy-dark"
      } ${className}`}
      style={{ width: size, height: size, borderRadius: Math.round(size / 3.4) }}
    >
      <Icon color="#fff" strokeWidth={2} size={Math.round(size / 2.2)} />
    </span>
  );
}
