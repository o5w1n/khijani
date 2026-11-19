import { ImageResponse } from "next/og";
import { SITE_TITLE } from "@/lib/site";

export const alt = SITE_TITLE;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "edge";

// Link-preview card (WhatsApp, LinkedIn, X). Brand colours from tailwind.config.ts.
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
          background: "#f7f3ea",
          padding: "72px 80px",
          borderTop: "16px solid #1a6b3c",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 6, color: "#c0623a", textTransform: "uppercase" }}>
          Khijani Africa
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, lineHeight: 1.05, color: "#181c18", fontWeight: 700 }}>
            Critical thinking for African youth.
          </div>
          <div style={{ marginTop: 28, fontSize: 34, color: "#43493f" }}>
            Real African dilemmas, argued in class and scored by the Khijani Index.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#1a6b3c" }}>khijani.africa</div>
      </div>
    ),
    size
  );
}
