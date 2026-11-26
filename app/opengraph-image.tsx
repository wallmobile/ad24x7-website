import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

// Preview card shown when the site is shared on WhatsApp, LinkedIn, X, Facebook, Slack…
export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
        {/* brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,.16)",
              border: "2px solid rgba(255,255,255,.35)",
              fontSize: 38,
              WebkitTextStroke: "2px #fff",
            }}
          >
            24
          </div>
          <div style={{ fontSize: 40, WebkitTextStroke: "1.5px #fff", letterSpacing: -1 }}>ad24x7</div>
          <div
            style={{
              marginLeft: "auto",
              padding: "10px 22px",
              borderRadius: 999,
              border: "2px solid rgba(255,255,255,.35)",
              background: "rgba(255,255,255,.12)",
              fontSize: 24,
            }}
          >
            {`Since ${SITE.foundingYear}`}
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 80, lineHeight: 1.05, letterSpacing: -2, WebkitTextStroke: "2.5px #fff", maxWidth: 960 }}>
            We Grow Brands in the Digital Universe
          </div>
          <div style={{ marginTop: 26, fontSize: 30, color: "rgba(255,255,255,.85)", maxWidth: 900 }}>
            Performance · SEO · Social · Websites · Content
          </div>
        </div>
      </div>
    ),
    size,
  );
}
