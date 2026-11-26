"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/** Light / dark switch. The initial class is set by the inline script in app/layout.tsx (no flash). */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={`flex size-11 shrink-0 items-center justify-center rounded-full border border-edge bg-field text-ink-2 transition hover:-translate-y-0.5 hover:text-brand-700 ${className}`}
    >
      {dark === null ? <span className="size-[18px]" /> : dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
