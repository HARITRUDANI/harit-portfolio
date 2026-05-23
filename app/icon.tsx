import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Browser tab favicon.
 * Amber monogram "HR" on near-black, with a faint amber node glow.
 * Designed to read at 16×16, looks crisp at 32×32 and 64×64.
 */
export default function Icon() {
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
          color: "#c8a96e",
          fontWeight: 700,
          fontSize: 18,
          letterSpacing: "-0.05em",
          fontFamily: "system-ui, sans-serif",
          borderRadius: 6,
          position: "relative",
        }}
      >
        HR
      </div>
    ),
    size,
  );
}
