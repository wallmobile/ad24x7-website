"use client";

import { useState } from "react";
import { Check, Link2, Linkedin, MessageCircle } from "lucide-react";

function XLogo() {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" aria-hidden>
      <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78zm-1.08 16.17h1.7L7.4 4.73H5.58z" />
    </svg>
  );
}

const btn =
  "flex size-10 items-center justify-center rounded-xl border border-line bg-card text-ink-2 shadow-[0_4px_12px_rgba(29,102,150,.06)] transition hover:-translate-y-0.5 hover:border-brand-600 hover:bg-brand-600 hover:text-white";

/** WhatsApp / LinkedIn / X share links + copy-link button. */
export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: nothing to do */
    }
  }

  const links = [
    { label: "Share on WhatsApp", href: `https://wa.me/?text=${t}%20${u}`, icon: <MessageCircle size={16} /> },
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, icon: <Linkedin size={16} /> },
    { label: "Share on X", href: `https://twitter.com/intent/tweet?text=${t}&url=${u}`, icon: <XLogo /> },
  ];

  return (
    <div className="flex items-center gap-2">
      {links.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label} className={btn}>
          {l.icon}
        </a>
      ))}
      <button type="button" onClick={copy} aria-label={copied ? "Link copied" : "Copy link"} className={`${btn} ${copied ? "!border-brand-600 !bg-brand-600 !text-white" : ""}`}>
        {copied ? <Check size={16} /> : <Link2 size={16} />}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Link copied" : ""}
      </span>
    </div>
  );
}
