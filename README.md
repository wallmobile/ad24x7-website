# Ad24x7 Technologies — Website (Homepage)

Premium SaaS-style homepage for Ad24x7 Technologies, built from the "Full Homepage — Hero H1" design.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide Icons
**Responsive:** Mobile (≥360px) · Tablet (`sm`/`md`) · Laptop (`lg`) · Desktop (`xl`)

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

Requires Node.js 18.18+ (Node 20 LTS recommended). Fonts (Inter + Inter Tight) are loaded through `next/font/google`, so the first build needs internet access.

## Project structure

```
app/
  layout.tsx          fonts, metadata, global MotionConfig (respects "reduce motion")
  page.tsx            assembles all sections
  globals.css         Tailwind v4 + brand tokens (@theme), grid floor, glossy icon styles
components/
  sections/           Navbar, Hero, WhyUs, Services, StatsCta, Blog, About, Contact, Footer
  objects/Objects3D   code-drawn glossy 3D SVGs: Megaphone, LikeBubble, PieChart, Target,
                      Rocket, Play, Envelope, Bell (each animates on its own)
  ui/                 Reveal (scroll fade-up), Float (fly-in + bob), GridFloor,
                      GlossyIcon, SectionLabel/SectionTitle, MotionConfig
lib/data.ts           ALL website text (services, blog posts, team, values, contact…)
public/               logo-light.png (light backgrounds), logo-dark.png (dark backgrounds)
```

**To change any text, edit `lib/data.ts` only.** Components read from it.

## Brand colours (in `app/globals.css` → `@theme`)

| Token | Hex | Use |
|---|---|---|
| `brand` | `#297FB1` | logo blue — headings accents, large text |
| `brand-600` | `#2273A8` | buttons with white text (passes WCAG AA) |
| `brand-700` | `#1D6696` | small blue text on white (AA) |
| `brand-300` | `#7FC0EA` | blue text on dark backgrounds |
| `ink` | `#0A0C10` | primary text, black buttons |
| `muted` | `#4D5866` | body text |

Use them as normal Tailwind classes: `text-brand`, `bg-brand-600`, `text-ink`, `border-line`…

## Animations (Framer Motion)

- Hero: copy fades up in sequence, eyebrow lines draw in, 3D objects fly in from the sides then float; grid floor scrolls; navbar glow pulses; platform marquee loops.
- Every section: content fades up when scrolled into view (`<Reveal>`), grids stagger in.
- Stats: numbers count up when visible.
- Blog: filter pill slides between options (`layoutId`), cards re-flow with `AnimatePresence`.
- Contact: form ↔ success state animated swap; bell rings; success tick springs in.
- Cards lift on hover, glossy icons tilt.
- All motion is reduced automatically when the visitor's OS has "Reduce motion" on.

## Contact form

`components/sections/Contact.tsx` → `onSubmit` currently just shows the success state. Hook it to your backend there (e.g. a Next.js Route Handler at `app/api/contact/route.ts`, Resend, Formspree, or your CRM):

```ts
await fetch("/api/contact", { method: "POST", body: new FormData(e.currentTarget) });
```

## Notes

- Platform names in the hero strip are text + generic Lucide icons (not official logos). Replace with real client logos in `components/sections/Hero.tsx` when available.
- Team members, blog posts and stats come from the provided content file — update `lib/data.ts` with real data before launch.
- Blog "Read Article" and some footer links (`Careers`, `Case Studies`, `Privacy Policy`, `Terms`) point to `#` — add pages/routes when ready.
