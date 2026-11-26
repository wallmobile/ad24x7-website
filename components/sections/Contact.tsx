"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Clock, Mail, Phone } from "lucide-react";
import { CONTACT_SERVICES } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

const chips = [
  { icon: Mail, title: "Email Us", text: "hello@ad24x7.com", href: "mailto:hello@ad24x7.com" },
  { icon: Phone, title: "Call Us", text: "Mon – Sat, 10 AM – 7 PM" },
  { icon: Clock, title: "Response Time", text: "4–8 business hours" },
];

const field =
  "w-full min-h-10 rounded-xl border border-white/25 bg-white/15 px-3.5 py-2 text-[14px] text-white outline-none backdrop-blur-sm transition placeholder:text-white/60 focus:border-white/70 focus:bg-white/20 focus:shadow-[0_0_0_4px_rgba(255,255,255,.15)]";
const label = "flex flex-col gap-1 text-[12px] font-semibold text-white/90";

/** Radar map: dotted globe-ish disc, rings, crosshair, rotating sweep and the office pin. */
function Radar() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[190px] sm:max-w-[230px]">
      <div className="absolute inset-0 overflow-hidden rounded-full border border-white/25 bg-white/[.04] shadow-[inset_0_0_60px_rgba(255,255,255,.08)]">
        {/* dot grid, fading toward the edge */}
        <div
          aria-hidden
          className="absolute inset-0 [mask-image:radial-gradient(circle,#000_55%,transparent_75%)]"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.55) 1.2px, transparent 1.7px)", backgroundSize: "15px 15px" }}
        />
        {/* rings + crosshair */}
        <span aria-hidden className="absolute inset-[16%] rounded-full border border-white/15" />
        <span aria-hidden className="absolute inset-[33%] rounded-full border border-white/15" />
        <span aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-white/20" />
        <span aria-hidden className="absolute inset-y-0 left-1/2 w-px bg-white/20" />
        {/* sweep */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,rgba(255,255,255,.08)_320deg,rgba(255,255,255,.5)_360deg)] motion-safe:animate-[spin_6s_linear_infinite]"
        />
      </div>

      {/* office pin */}
      <div className="absolute left-[62%] top-[42%] -translate-x-1/2 -translate-y-1/2">
        <span aria-hidden className="absolute inset-0 rounded-full bg-white/40 motion-safe:animate-ping" />
        <span className="relative block size-6 rounded-full border-[5px] border-white/80 bg-[#0a0c10] shadow-[0_0_0_6px_rgba(255,255,255,.15),0_8px_20px_rgba(10,12,16,.4)]" />
        <div className="absolute bottom-full left-1/2 mb-3 w-max -translate-x-[10%] rounded-xl bg-white px-3 py-1.5 shadow-[0_10px_24px_rgba(10,12,16,.25)]">
          <p className="text-[10.5px] font-medium text-muted">Our Office</p>
          <p className="text-[13px] font-semibold text-[#0a0c10]">Ad24×7 · India</p>
        </div>
      </div>
    </div>
  );
}

/** Custom service dropdown (glass trigger + white list). Submits as `service` via a hidden input. */
function ServiceSelect({ labelId }: { labelId: string }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [hi, setHi] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);

  // close on outside click
  useEffect(() => {
    if (!open) return;
    const off = (e: MouseEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", off);
    return () => document.removeEventListener("mousedown", off);
  }, [open]);

  // keep the highlighted option in view
  useEffect(() => {
    if (open) list.current?.querySelector<HTMLElement>(`[data-i="${hi}"]`)?.scrollIntoView({ block: "nearest" });
  }, [hi, open]);

  const openList = () => {
    setHi(Math.max(0, CONTACT_SERVICES.indexOf(value)));
    setOpen(true);
  };
  const choose = (i: number) => {
    setValue(CONTACT_SERVICES[i]);
    setOpen(false);
  };

  function onKey(e: React.KeyboardEvent) {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    if (e.key === "ArrowDown") (e.preventDefault(), setHi((h) => Math.min(h + 1, CONTACT_SERVICES.length - 1)));
    else if (e.key === "ArrowUp") (e.preventDefault(), setHi((h) => Math.max(h - 1, 0)));
    else if (e.key === "Home") (e.preventDefault(), setHi(0));
    else if (e.key === "End") (e.preventDefault(), setHi(CONTACT_SERVICES.length - 1));
    else if (e.key === "Enter" || e.key === " ") (e.preventDefault(), choose(hi));
    else if (e.key === "Escape" || e.key === "Tab") setOpen(false);
  }

  return (
    <div ref={root} className="relative">
      <input type="hidden" name="service" value={value} />
      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="service-list"
        aria-labelledby={labelId}
        aria-activedescendant={open ? `service-opt-${hi}` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKey}
        className={`${field} flex items-center justify-between gap-2 text-left ${open ? "border-white/70 bg-white/20 shadow-[0_0_0_4px_rgba(255,255,255,.15)]" : ""}`}
      >
        <span className={value ? "text-white" : "text-white/60"}>{value || "Select a Service"}</span>
        <ChevronDown size={17} className={`shrink-0 text-white/80 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={list}
            id="service-list"
            role="listbox"
            aria-labelledby={labelId}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="absolute inset-x-0 top-full z-30 mt-2 max-h-[264px] origin-top overflow-y-auto rounded-2xl border border-white/60 bg-white p-1.5 text-[14px] text-[#0a0c10] shadow-[0_24px_60px_rgba(5,7,10,.35)] [scrollbar-width:thin] dark:border-white/10 dark:bg-[#0e1218] dark:text-white"
          >
            {CONTACT_SERVICES.map((s, i) => {
              const sel = s === value;
              return (
                <li
                  key={s}
                  id={`service-opt-${i}`}
                  data-i={i}
                  role="option"
                  aria-selected={sel}
                  onMouseEnter={() => setHi(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => choose(i)}
                  className={`flex cursor-pointer items-center justify-between gap-2 rounded-xl px-3 py-2 font-medium transition-colors ${
                    i === hi ? "bg-brand-100 text-brand-700 dark:bg-brand/20 dark:text-brand-300" : ""
                  } ${sel ? "font-semibold" : ""}`}
                >
                  {s}
                  {sel && <Check size={15} strokeWidth={2.6} className="shrink-0 text-brand-600" />}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: send `new FormData(e.currentTarget)` to your API route / email service here.
    setSent(true);
    e.currentTarget.reset();
  }

  return (
    <section id="contact" className="relative scroll-mt-24 px-4 pb-16 sm:px-6 sm:pb-20">
      <div className="relative mx-auto max-w-[1200px] rounded-[32px] bg-gradient-to-br from-[#5aaee0] via-[#2273a8] to-[#0b2f4a] px-5 py-8 text-white shadow-[0_40px_100px_rgba(29,102,150,.3)] sm:px-10 sm:py-10 dark:from-[#1d6696] dark:via-[#0f3b5a] dark:to-[#05070a] dark:shadow-[0_40px_100px_rgba(0,0,0,.5)]">
        {/* glows are clipped on their own layer so the service dropdown can overflow the panel */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]">
          <div className="absolute -left-32 -top-32 size-[460px] rounded-full bg-white/15 blur-3xl" />
          <div className="absolute -bottom-40 -right-20 size-[460px] rounded-full bg-[#05070a]/40 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-[1120px]">
          <div className="grid items-center gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
            {/* heading, radar + contact chips */}
            <Reveal className="text-center">
              <h2 className="font-display text-[clamp(30px,3.6vw,44px)] font-semibold leading-[1.05] tracking-[-0.04em]">
                Get in <span className="text-[#0a0c10]">touch</span>
              </h2>
              <p className="mx-auto mt-2 max-w-[420px] text-[14.5px] leading-relaxed text-white/85">
                Whether you have a project in mind or just want to explore how we can help — we&apos;d love to hear from you.
              </p>
              <div className="mt-5">
                <Radar />
              </div>
              <ul className="mt-4 flex flex-wrap justify-center gap-2">
                {chips.map(({ icon: Icon, title, text, href }) => {
                  const inner = (
                    <>
                      <Icon size={14} className="shrink-0" />
                      <span className="whitespace-nowrap font-semibold">{title}</span>
                      <span className="text-white/75">· {text}</span>
                    </>
                  );
                  const cls =
                    "inline-flex items-center gap-1.5 rounded-2xl border border-white/25 bg-white/10 px-3 py-1.5 text-[12px] backdrop-blur-sm transition hover:border-white/45 hover:bg-white/20";
                  return (
                    <li key={title}>
                      {href ? (
                        <a href={href} className={cls}>
                          {inner}
                        </a>
                      ) : (
                        <span className={cls}>{inner}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            {/* glass form */}
            <Reveal delay={0.15}>
              <div className="rounded-[28px] border border-white/25 bg-white/10 p-6 shadow-[0_30px_70px_rgba(5,7,10,.25)] backdrop-blur-xl sm:p-6">
                <AnimatePresence mode="wait" initial={false}>
                  {sent ? (
                    <motion.div key="ok" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="px-2 py-10 text-center" role="status">
                      <motion.div
                        initial={{ scale: 0.5, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 16 }}
                        className="mx-auto mb-[18px] flex size-[70px] items-center justify-center rounded-[22px] bg-white text-brand-700 shadow-[0_14px_30px_rgba(5,7,10,.25)]"
                      >
                        <Check size={32} strokeWidth={2.5} />
                      </motion.div>
                      <h3 className="mb-2 font-display text-[26px] font-semibold">Message Sent Successfully!</h3>
                      <p className="mb-6 leading-relaxed text-white/85">Thank you for reaching out. Our team will get back to you within 4–8 business hours.</p>
                      <button type="button" onClick={() => setSent(false)} className="min-h-11 rounded-full bg-white px-5 font-semibold text-[#0a0c10]">
                        Send another
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form key="form" onSubmit={onSubmit} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                      <h3 className="mb-4 font-display text-[21px] font-semibold tracking-[-0.02em]">Send Us a Message</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <label className={label}>
                          First Name
                          <input className={field} name="firstName" type="text" placeholder="John" required autoComplete="given-name" />
                        </label>
                        <label className={label}>
                          Last Name
                          <input className={field} name="lastName" type="text" placeholder="Doe" autoComplete="family-name" />
                        </label>
                        <label className={`${label} col-span-2 sm:col-span-1`}>
                          Email Address
                          <input className={field} name="email" type="email" placeholder="john@company.com" required autoComplete="email" />
                        </label>
                        <label className={`${label} col-span-2 sm:col-span-1`}>
                          Phone Number
                          <input className={field} name="phone" type="tel" placeholder="+91 98765 43210" autoComplete="tel" />
                        </label>
                      </div>
                      <div className={`${label} mt-3`}>
                        <span id="service-label">Service Interested In</span>
                        <ServiceSelect labelId="service-label" />
                      </div>
                      <label className={`${label} mt-3`}>
                        Tell Us About Your Project
                        <textarea className={`${field} resize-y`} name="message" rows={2} placeholder="Brief us about your goals, budget, timeline..." />
                      </label>
                      <button
                        type="submit"
                        className="group mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-white text-[15px] font-semibold text-[#0a0c10] transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(5,7,10,.3)]"
                      >
                        Send Message <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
