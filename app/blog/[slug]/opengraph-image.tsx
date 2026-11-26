import { ImageResponse } from "next/og";
import { getAllPosts, getPost } from "@/lib/posts";
import { SITE } from "@/lib/site";

// Per-article sharing preview: category, title and brand.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = SITE.title;

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

export default async function PostOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPost((await params).slug);
  const title = post?.title ?? SITE.title;
  const meta = post ? `${post.tag} · ${post.readTime}` : "Blog";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          background: "linear-gradient(135deg, #5aaee0 0%, #2273a8 45%, #0b2f4a 100%)",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              padding: "10px 22px",
              borderRadius: 999,
              background: "#fff",
              color: "#0a0c10",
              fontSize: 26,
            }}
          >
            {meta}
          </div>
          <div style={{ marginLeft: "auto", fontSize: 34, WebkitTextStroke: "1.5px #fff" }}>ad24x7 · Blog</div>
        </div>
        <div style={{ fontSize: title.length > 70 ? 60 : 70, lineHeight: 1.1, letterSpacing: -1.5, WebkitTextStroke: "2px #fff", maxWidth: 1040 }}>
          {title}
        </div>
      </div>
    ),
    size,
  );
}
