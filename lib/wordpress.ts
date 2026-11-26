import { BLOG_FILTERS, type BlogTag } from "@/lib/data";
import { slugify, type Post } from "@/lib/posts";

/**
 * Headless WordPress client — reads posts from the WP REST API (`/wp-json/wp/v2/posts`).
 * Set WORDPRESS_URL in .env.local (e.g. https://blog.ad24x7.com) to turn it on.
 */

const WP_URL = (process.env.WORDPRESS_URL || "").replace(/\/$/, "");
/** seconds — how often Next.js re-fetches from WordPress (new posts show up within this time) */
export const WP_REVALIDATE = 60;

export const wpEnabled = () => WP_URL !== "";

type WPTerm = { id: number; name: string; taxonomy: string };
type WPPost = {
  slug: string;
  date: string; // site-local time, no timezone (e.g. 2026-03-01T10:00:00)
  date_gmt: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: { "wp:term"?: WPTerm[][] };
};

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", hellip: "…", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", ndash: "–", mdash: "—" };

export function decodeEntities(s: string) {
  return s.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === "#") {
      const code = e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : m;
    }
    return ENTITIES[e.toLowerCase()] ?? m;
  });
}

const stripTags = (html: string) => decodeEntities(html.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();

const TONE: Record<BlogTag, Post["tone"]> = { Performance: "blue", SEO: "dark", "Social Media": "sky", Influencer: "dark", Retention: "blue", Content: "sky" };
const TOPICS = BLOG_FILTERS.filter((t): t is BlogTag => t !== "All");

/** WordPress category → one of the site's 6 topics (falls back to "Content") */
function pickTag(terms: WPTerm[]): BlogTag {
  const names = terms.filter((t) => t.taxonomy === "category").map((t) => t.name.toLowerCase());
  for (const topic of TOPICS) if (names.includes(topic.toLowerCase())) return topic;
  const joined = names.join(" ");
  if (/seo|search/.test(joined)) return "SEO";
  if (/ads|ppc|performance|paid/.test(joined)) return "Performance";
  if (/social|instagram|facebook|youtube/.test(joined)) return "Social Media";
  if (/influencer/.test(joined)) return "Influencer";
  if (/retention|email|whatsapp|crm/.test(joined)) return "Retention";
  return "Content";
}

function fmtDate(d: Date) {
  const month = d.toLocaleString("en-US", { month: "long", timeZone: "Asia/Kolkata" });
  const day = d.toLocaleString("en-US", { day: "2-digit", timeZone: "Asia/Kolkata" });
  const year = d.toLocaleString("en-US", { year: "numeric", timeZone: "Asia/Kolkata" });
  return `${month} ${day}, ${year}`;
}

/** adds id="…" to every <h2> (for the "On this page" links) and returns the headings */
function withHeadingIds(html: string) {
  const headings: { id: string; text: string }[] = [];
  const out = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (_m, attrs: string, inner: string) => {
    const text = stripTags(inner);
    const id = slugify(text) || `section-${headings.length + 1}`;
    headings.push({ id, text });
    return `<h2${attrs.replace(/\sid=("[^"]*"|'[^']*')/i, "")} id="${id}">${inner}</h2>`;
  });
  return { html: out, headings };
}

function toPost(p: WPPost): Post {
  const text = stripTags(p.content.rendered);
  const words = text ? text.split(" ").length : 0;
  const date = new Date(p.date_gmt ? `${p.date_gmt}Z` : p.date);
  const { html, headings } = withHeadingIds(p.content.rendered);
  const excerpt = stripTags(p.excerpt.rendered) || text.slice(0, 160);
  const tag = pickTag(p._embedded?.["wp:term"]?.flat() ?? []);

  return {
    slug: p.slug,
    tag,
    tone: TONE[tag],
    title: stripTags(p.title.rendered),
    excerpt,
    date: fmtDate(date),
    dateISO: date.toISOString(),
    readTime: `${Math.max(1, Math.round(words / 200))} min read`,
    html,
    headings,
  };
}

/** all published posts, newest first */
export async function fetchWordPressPosts(): Promise<Post[]> {
  const url = `${WP_URL}/wp-json/wp/v2/posts?_embed=wp:term&per_page=100&orderby=date&order=desc`;
  const res = await fetch(url, { next: { revalidate: WP_REVALIDATE } });
  if (!res.ok) throw new Error(`WordPress responded ${res.status}`);
  const data = (await res.json()) as WPPost[];
  return data.map(toPost);
}
