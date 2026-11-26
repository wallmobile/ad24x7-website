"use client";

import { MotionConfig as FMMotionConfig } from "framer-motion";

/** Respects the user's OS "reduce motion" setting for every Framer Motion animation. */
export function MotionConfig({ children }: { children: React.ReactNode }) {
  return <FMMotionConfig reducedMotion="user">{children}</FMMotionConfig>;
}
