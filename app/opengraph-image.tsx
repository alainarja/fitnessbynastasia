import { ImageResponse } from "next/og";

export const alt = "Fitness by Nastasia. Strength and health coaching for women.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#241813",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              backgroundColor: "#c02d1e",
              color: "#fbf5ea",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            N
          </div>
          <div
            style={{
              color: "#f1e8d9",
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              fontFamily: "Arial, sans-serif",
            }}
          >
            Fitness by Nastasia
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              color: "#f1e8d9",
              fontSize: 76,
              lineHeight: 1.05,
              maxWidth: 980,
            }}
          >
            <span>Stronger, healthier, and finally&nbsp;</span>
            <span style={{ color: "#c02d1e", fontStyle: "italic" }}>fuelled.</span>
          </div>
          <div style={{ marginTop: 28, height: 6, width: 160, backgroundColor: "#c02d1e", borderRadius: 999 }} />
        </div>

        <div style={{ color: "#e7d3c4", fontSize: 28, fontFamily: "Arial, sans-serif" }}>
          Online and in person coaching for women. Health first, never restriction.
        </div>
      </div>
    ),
    { ...size },
  );
}
