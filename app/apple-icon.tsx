import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * iOS home-screen / pinned-tab icon.
 * Same HR monogram, larger format, with the amber node glow.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#080808",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          borderRadius: 40,
        }}
      >
        {/* warm amber glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 30% 30%, rgba(200,169,110,0.18), transparent 60%)",
            display: "flex",
          }}
        />
        {/* glowing node — top right */}
        <div
          style={{
            position: "absolute",
            top: 28,
            right: 32,
            width: 14,
            height: 14,
            borderRadius: 999,
            background: "#c8a96e",
            boxShadow: "0 0 24px rgba(200,169,110,0.6)",
            display: "flex",
          }}
        />
        {/* monogram */}
        <div
          style={{
            color: "#f0ece4",
            fontSize: 92,
            fontWeight: 700,
            letterSpacing: "-0.05em",
            fontFamily: "system-ui, sans-serif",
            display: "flex",
            position: "relative",
            zIndex: 1,
          }}
        >
          HR
        </div>
      </div>
    ),
    size,
  );
}
