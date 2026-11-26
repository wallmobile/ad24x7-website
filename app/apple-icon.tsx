import { ImageResponse } from "next/og";

// Home-screen icon for iOS (PNG). The browser-tab favicon is app/icon.svg.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #8fd0f5 0%, #297fb1 50%, #134a6e 100%)",
          color: "#fff",
          fontSize: 92,
          letterSpacing: -2,
          // the built-in font only ships one weight, so a white stroke makes it read as bold
          WebkitTextStroke: "7px #fff",
        }}
      >
        24
      </div>
    ),
    size,
  );
}
