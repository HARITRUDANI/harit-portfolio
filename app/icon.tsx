import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 48, height: 48 };
export const contentType = "image/png";

/**
 * Browser tab favicon — 48×48 meets Google's minimum for search result icons.
 * Amber monogram "HR" on near-black. Reads clearly at 16×16 scaled down.
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
          fontSize: 26,
          letterSpacing: "-0.05em",
          fontFamily: "system-ui, sans-serif",
          borderRadius: 8,
          position: "relative",
        }}
      >
        HR
      </div>
    ),
    size,
  );
}
