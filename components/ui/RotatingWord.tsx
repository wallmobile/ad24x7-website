"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Props = { words: readonly string[]; className?: string };

/** Types a word out, holds it, deletes it, then types the next one — forever. */
export function RotatingWord({ words, className = "" }: Props) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [text, setText] = useState(words[0]);
  const [phase, setPhase] = useState<"hold" | "delete" | "type">("hold");

  useEffect(() => {
    if (reduce) return;
    const word = words[i];
    let t: ReturnType<typeof setTimeout>;

    if (phase === "hold") {
      t = setTimeout(() => setPhase("delete"), i === 0 && text === words[0] ? 2200 : 1800);
    } else if (phase === "delete") {
      if (text.length === 0) {
        setI((n) => (n + 1) % words.length);
        setPhase("type");
      } else {
        t = setTimeout(() => setText((s) => s.slice(0, -1)), 45);
      }
    } else {
      if (text.length === word.length) setPhase("hold");
      else t = setTimeout(() => setText(word.slice(0, text.length + 1)), 95);
    }
    return () => clearTimeout(t);
  }, [phase, text, i, words, reduce]);

  return (
    <span className={`relative inline-block min-w-[.35em] whitespace-nowrap ${className}`}>
      <span className="shimmer-text">{reduce ? words[0] : text}</span>
      {!reduce && <span aria-hidden className="type-underline" />}
    </span>
  );
}
