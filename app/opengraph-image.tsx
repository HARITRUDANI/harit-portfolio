import { ImageResponse } from "next/og";
import { PERSON } from "@/lib/seo";

export const runtime = "edge";
export const alt = `${PERSON.name} — ${PERSON.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#080808",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          fontFamily: "system-ui, sans-serif",
          color: "#f0ece4",
          position: "relative",
        }}
      >
        {/* warm radial glow top left */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -150,
            width: 700,
            height: 700,
            background:
              "radial-gradient(circle, rgba(200,169,110,0.18), rgba(200,169,110,0) 70%)",
            display: "flex",
          }}
        />
        {/* faint grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            display: "flex",
          }}
        />

        {/* Top — monogram + status */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.3em",
              color: "#c8a96e",
              fontWeight: 500,
              display: "flex",
            }}
          >
            HR
          </div>
          <div
            style={{
              fontSize: 18,
              letterSpacing: "0.25em",
              color: "#a3a098",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#c8a96e",
                display: "flex",
              }}
            />
            AVAILABLE
          </div>
        </div>

        {/* Middle — name + statement */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 28,
              fontSize: 18,
              letterSpacing: "0.2em",
              color: "#a3a098",
            }}
          >
            <span style={{ color: "#c8a96e", display: "flex" }}>
              3.5 YEARS
            </span>
            <span style={{ color: "#3a3a3a", display: "flex" }}>·</span>
            <span style={{ color: "#c8a96e", display: "flex" }}>
              9 SYSTEMS
            </span>
            <span style={{ color: "#3a3a3a", display: "flex" }}>·</span>
            <span style={{ color: "#c8a96e", display: "flex" }}>
              600K+ SKUS
            </span>
            <span style={{ color: "#3a3a3a", display: "flex" }}>·</span>
            <span style={{ color: "#c8a96e", display: "flex" }}>
              3 COUNTRIES
            </span>
          </div>

          <div
            style={{
              fontSize: 96,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              display: "flex",
            }}
          >
            {PERSON.name}
          </div>

          <div
            style={{
              width: 120,
              height: 2,
              background: "#c8a96e",
              opacity: 0.8,
              display: "flex",
            }}
          />

          <div
            style={{
              fontSize: 36,
              fontWeight: 300,
              lineHeight: 1.3,
              maxWidth: 900,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ display: "flex" }}>
              I build systems that scale.
            </span>
            <span style={{ color: "#a3a098", display: "flex" }}>
              Not just frontend. Full stack. End to end.
            </span>
          </div>
        </div>

        {/* Bottom — role + locations */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 18,
            letterSpacing: "0.2em",
            color: "#8a8780",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex" }}>SENIOR SOFTWARE ENGINEER</div>
          <div style={{ display: "flex" }}>ISRAEL · CALIFORNIA · INDIA</div>
        </div>
      </div>
    ),
    size,
  );
}
