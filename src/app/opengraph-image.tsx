import { ImageResponse } from "next/og";
export const alt = "FinAid Hub — Your money. More possibility.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          background: "#f6f5ef",
          width: "100%",
          height: "100%",
          padding: "65px 75px",
          color: "#20221f",
        }}
      >
        <div style={{ display: "flex", fontSize: 36, fontWeight: 700 }}>
          FinAid Hub<span style={{ color: "#fb572b" }}>.</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 70,
            fontSize: 98,
            lineHeight: 1.05,
            letterSpacing: -5,
            fontWeight: 700,
          }}
        >
          Your money.
          <br />
          More possibility.
        </div>
        <div style={{ display: "flex", marginTop: 35, fontSize: 26 }}>
          Make sense of the money stuff. Make room for the life stuff.
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            right: 65,
            top: 60,
            background: "#d5f66b",
            width: 105,
            height: 105,
            borderRadius: 60,
            alignItems: "center",
            justifyContent: "center",
            fontSize: 65,
          }}
        >
          ↗
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 16,
            background: "#fb572b",
          }}
        />
      </div>
    ),
    size,
  );
}
