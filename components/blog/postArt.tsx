// Not a client module on purpose: server pages read `toneBg` as plain data; the 3D objects themselves are client components.
import type { BlogTag } from "@/lib/data";
import { Envelope3D, LikeBubble3D, Magnifier3D, Megaphone3D, PieChart3D, Play3D } from "@/components/objects/Objects3D";

/** thumbnail backgrounds, shared by the home Blog section and the /blog pages */
export const toneBg = {
  blue: "linear-gradient(150deg,#5AAEE0 0%,#1D6696 100%)",
  dark: "linear-gradient(150deg,#3A4048 0%,#0A0C10 100%)",
  sky: "linear-gradient(150deg,#8FD0F5 0%,#297FB1 100%)",
};

/** one 3D object per blog category */
export const art: Record<BlogTag, React.ComponentType<{ className?: string }>> = {
  Performance: PieChart3D,
  SEO: Magnifier3D,
  "Social Media": LikeBubble3D,
  Influencer: Megaphone3D,
  Retention: Envelope3D,
  Content: Play3D,
};

/** 3D object for a tag — usable from server components */
export function PostArt({ tag, className = "" }: { tag: BlogTag; className?: string }) {
  const Art = art[tag];
  return <Art className={className} />;
}
