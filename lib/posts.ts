import { POSTS, type BlogTag } from "@/lib/data";
import { fetchWordPressPosts, wpEnabled } from "@/lib/wordpress";

/**
 * Blog data layer.
 * - If WORDPRESS_URL is set → posts come from WordPress (headless, REST API).
 * - Otherwise (or if WordPress is unreachable) → the static starter posts below are used.
 */

export type Block = { type: "h2"; text: string } | { type: "p"; text: string } | { type: "ul"; items: string[] } | { type: "quote"; text: string };

export type Post = {
  slug: string;
  tag: BlogTag;
  tone: "blue" | "dark" | "sky";
  title: string;
  excerpt: string;
  date: string;
  dateISO: string;
  readTime: string;
  /** article body as HTML */
  html: string;
  /** h2 headings in the article — used for the "On this page" list */
  headings: { id: string; text: string }[];
};

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");

const BODIES: Record<string, Block[]> = {
  "how-to-slash-your-cost-per-lead-by-40-with-smart-google-ads-restructuring": [
    { type: "p", text: "When cost-per-lead creeps up, the instinct is to raise budgets or rewrite ads. In most accounts we audit, the real problem sits one level higher: campaign structure. A messy structure hides what is working, spreads budget thin and feeds Google's bidding algorithms poor signals." },
    { type: "h2", text: "1. Group by intent, not by product list" },
    { type: "p", text: "Separate campaigns for high-intent searches (\"buy\", \"price\", \"near me\"), research searches and brand terms. Each intent converts differently, so each deserves its own budget and target." },
    { type: "h2", text: "2. Consolidate where data is thin" },
    { type: "p", text: "Dozens of tiny ad groups with a handful of clicks each starve Smart Bidding of data. Merge closely related ad groups so every campaign collects enough conversions to optimise." },
    { type: "h2", text: "3. Clean up your search terms every week" },
    { type: "ul", items: ["Add irrelevant queries as negative keywords.", "Move strong queries into their own exact-match keywords.", "Use shared negative lists so the same waste doesn't reappear in new campaigns."] },
    { type: "h2", text: "4. Track the right conversion" },
    { type: "p", text: "If page views or button clicks are counted as conversions, the algorithm optimises for the wrong thing. Track qualified leads — form submissions, calls over a set duration, or CRM-confirmed leads — and import offline conversions where you can." },
    { type: "h2", text: "5. Match the landing page to the ad group" },
    { type: "p", text: "A tightly themed ad group should land on a page that repeats the same promise, with one clear form above the fold. Message match lifts conversion rate, which directly lowers cost-per-lead." },
    { type: "quote", text: "Restructuring isn't a one-time cleanup — set a monthly review so the account stays lean as you add products and markets." },
  ],
  "the-2026-seo-playbook-what-s-changed-and-what-actually-works-now": [
    { type: "p", text: "Search keeps changing — AI-generated answers, richer result pages and a stronger focus on helpful, first-hand content. The fundamentals still win, but the bar for each of them is higher." },
    { type: "h2", text: "Write from real experience" },
    { type: "p", text: "Pages that show first-hand knowledge — original examples, screenshots, data you collected, clear authorship — stand out from generic content that anyone could produce." },
    { type: "h2", text: "Answer the question fast, then go deep" },
    { type: "p", text: "Lead with a clear, direct answer in the first lines, then expand with detail, steps and examples. This serves both skimmers and AI-generated summaries that quote concise answers." },
    { type: "h2", text: "Keep the technical basics spotless" },
    { type: "ul", items: ["Fast loading and stable layouts on mobile (Core Web Vitals).", "Clean internal linking so important pages are a few clicks from home.", "Structured data for your organisation, articles, FAQs and products.", "One canonical URL per page and an up-to-date XML sitemap."] },
    { type: "h2", text: "Build topical authority" },
    { type: "p", text: "Instead of isolated posts, build clusters: one pillar page on a core topic, supported by detailed articles that link back to it. This signals depth and helps every page in the cluster rank." },
    { type: "h2", text: "Earn mentions, not just links" },
    { type: "p", text: "Digital PR, partnerships and genuinely useful resources earn links and brand mentions that reinforce your authority far more than bulk link building." },
  ],
  "instagram-reels-vs-youtube-shorts-where-should-your-brand-invest-in-2026": [
    { type: "p", text: "Short-form video is now a core channel, but Reels and Shorts reward different things. The right choice depends on your audience, your goal and the kind of content you can produce consistently." },
    { type: "h2", text: "Instagram Reels: community and discovery" },
    { type: "ul", items: ["Strong for lifestyle, fashion, food, beauty and local businesses.", "Reels sit next to your feed, Stories and DMs — great for turning viewers into followers and conversations.", "Trending audio and collaborations help reach new audiences quickly."] },
    { type: "h2", text: "YouTube Shorts: search and long-term reach" },
    { type: "ul", items: ["Shorts connect to YouTube search and to your long-form videos.", "Useful for education, reviews, how-tos and B2B explainers.", "Videos can keep getting views long after they're posted."] },
    { type: "h2", text: "How to decide" },
    { type: "p", text: "If your goal is community, DMs and quick conversions, start with Reels. If your goal is search visibility and building a library of evergreen content, start with Shorts. Many brands film once and adapt for both — changing hooks, captions and calls to action for each platform." },
    { type: "h2", text: "What works on both" },
    { type: "ul", items: ["Hook in the first 1–2 seconds.", "Captions on every video — many people watch muted.", "One idea per video, with a clear next step.", "Post consistently and review retention graphs, not just views."] },
  ],
  "micro-vs-mega-influencers-which-drives-better-roi-for-your-brand": [
    { type: "p", text: "Follower count is the easiest number to see and the least useful one on its own. The better question is: whose audience matches your customer, and how will you measure what the partnership delivers?" },
    { type: "h2", text: "When micro-influencers make sense" },
    { type: "ul", items: ["Niche or regional audiences that closely match your buyer.", "Higher trust and conversation in the comments.", "Lower cost per creator, so you can test many voices and keep the winners."] },
    { type: "h2", text: "When mega-influencers make sense" },
    { type: "ul", items: ["Launches and awareness pushes that need reach fast.", "Broad consumer products with a wide target audience.", "Brand positioning — being associated with a well-known face."] },
    { type: "h2", text: "Measure ROI properly" },
    { type: "p", text: "Give every creator unique links and discount codes, agree on deliverables and usage rights up front, and track sales or leads — not just likes. Ask for audience demographics and story insights before you sign." },
    { type: "h2", text: "A balanced approach" },
    { type: "p", text: "Many brands combine both: a few large creators for reach, and a wider group of micro-creators for trust, content volume and conversions. Reuse the best creator content in your ads to extend its value." },
  ],
  "whatsapp-marketing-in-2026-strategies-that-actually-convert": [
    { type: "p", text: "WhatsApp is where many customers already talk to friends and family, which makes it a powerful — and personal — channel for brands. Used carelessly, it feels like spam. Used well, it feels like great service." },
    { type: "h2", text: "Start with consent" },
    { type: "p", text: "Collect opt-ins clearly on your website, checkout and forms, and say what people will receive. Make it easy to opt out. Respecting consent protects your number's quality rating and your brand." },
    { type: "h2", text: "Messages that convert" },
    { type: "ul", items: ["Order, shipping and appointment updates customers actually want.", "Abandoned-cart reminders with a direct link back to checkout.", "Back-in-stock and price-drop alerts for items people showed interest in.", "Personal offers based on past purchases, sent sparingly."] },
    { type: "h2", text: "Make it a conversation" },
    { type: "p", text: "Use quick-reply buttons, catalogues and simple chat flows so customers can ask questions and buy without leaving WhatsApp. Hand off to a human quickly when a question needs it." },
    { type: "h2", text: "Track what matters" },
    { type: "p", text: "Measure replies, click-throughs, conversions and opt-outs per campaign. If opt-outs rise, you're sending too often or the content isn't relevant enough." },
  ],
  "content-that-converts-the-ultimate-framework-for-b2c-brands-in-india": [
    { type: "p", text: "Indian audiences are diverse in language, region and price sensitivity. Content that converts respects that diversity and connects every piece to a clear next step." },
    { type: "h2", text: "1. Know who you're speaking to" },
    { type: "p", text: "Define two or three core customer types: where they live, which language they prefer, what they worry about before buying and where they spend time online." },
    { type: "h2", text: "2. Speak their language — literally" },
    { type: "p", text: "Hindi, Hinglish and regional-language content often feels more natural and trustworthy than English-only content. Test vernacular versions of your best-performing posts and ads." },
    { type: "h2", text: "3. Map content to the funnel" },
    { type: "ul", items: ["Awareness: short videos, memes, relatable stories.", "Consideration: comparisons, reviews, demos, FAQs.", "Conversion: offers, testimonials, clear CTAs and easy checkout.", "Retention: how-to content, community and loyalty perks."] },
    { type: "h2", text: "4. Tell stories, not feature lists" },
    { type: "p", text: "Show real customers, real use cases and the moment your product made a difference. Stories are remembered and shared far more than specifications." },
    { type: "h2", text: "5. Measure and repeat" },
    { type: "p", text: "Track which formats, topics and languages lead to leads and sales — not just views — and do more of what works." },
  ],
};

function toISO(date: string) {
  const d = new Date(`${date} 10:00:00 GMT+0530`);
  return Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function blocksToHtml(blocks: Block[]) {
  const headings: Post["headings"] = [];
  const html = blocks
    .map((b) => {
      if (b.type === "h2") {
        const id = slugify(b.text);
        headings.push({ id, text: b.text });
        return `<h2 id="${id}">${esc(b.text)}</h2>`;
      }
      if (b.type === "ul") return `<ul>${b.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
      if (b.type === "quote") return `<blockquote><p>${esc(b.text)}</p></blockquote>`;
      return `<p>${esc(b.text)}</p>`;
    })
    .join("\n");
  return { html, headings };
}

const STATIC_POSTS: Post[] = POSTS.map((p) => {
  const slug = slugify(p.title);
  const [date, readTime = ""] = p.meta.split(" · ");
  const { html, headings } = blocksToHtml(BODIES[slug] ?? [{ type: "p", text: p.excerpt }]);
  return { slug, tag: p.tag, tone: p.tone, title: p.title, excerpt: p.excerpt, date, dateISO: toISO(date), readTime, html, headings };
});

/** all posts, newest first (WordPress when configured, else the static starter posts) */
export async function getAllPosts(): Promise<Post[]> {
  if (!wpEnabled()) return STATIC_POSTS;
  try {
    return await fetchWordPressPosts();
  } catch (err) {
    console.error("[blog] WordPress fetch failed, using static posts:", err);
    return STATIC_POSTS;
  }
}

export async function getPost(slug: string) {
  return (await getAllPosts()).find((p) => p.slug === slug);
}
