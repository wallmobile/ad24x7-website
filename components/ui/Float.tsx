"use client";

import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** vertical travel in px */
  distance?: number;
  /** rotation range in degrees: [from, to] */
  rotate?: [number, number];
  duration?: number;
  delay?: number;
  /** direction the object flies in from on first view */
  from?: "left" | "right" | "none";
  /** "view" = animate when scrolled into view, "mount" = animate on page load (use above the fold) */
  trigger?: "view" | "mount";
};

/** Wraps a decorative 3D object: flies in once, then bobs forever. */
export function Float({
  children,
  className = "",
  distance = 18,
  rotate = [0, 0],
  duration = 6,
  delay = 0.3,
  from = "none",
  trigger = "view",
}: Props) {
  const x = from === "left" ? -120 : from === "right" ? 120 : 0;
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none ${className}`}
      initial={{ opacity: 0, x, y: 40, scale: 0.7, rotate: from === "left" ? -30 : from === "right" ? 40 : 0 }}
      {...(trigger === "mount"
        ? { animate: { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 } }
        : { whileInView: { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }, viewport: { once: true } })}
      transition={{ duration: 1.2, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <motion.div
        className="h-full w-full"
        animate={{ y: [0, -distance, 0], rotate: [rotate[0], rotate[1], rotate[0]] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
