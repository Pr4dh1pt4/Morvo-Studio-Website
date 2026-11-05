import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getSite } from "@/content";

import { OG_IMAGE } from "@/lib/seo";

// Gambar Open Graph (/og.png) dibuat sekali saat build. Sengaja memakai route
// handler, bukan file opengraph-image.tsx, supaya hasil export berekstensi .png
// dan bisa dirujuk eksplisit oleh metadata setiap halaman.
export const dynamic = "force-static";

const size = { width: OG_IMAGE.width, height: OG_IMAGE.height };

export async function GET() {
  const site = getSite();
  const fontsDir = join(process.cwd(), "src/assets/fonts");
  const [fraunces, jakarta, logo] = await Promise.all([
    readFile(join(fontsDir, "fraunces-600.ttf")),
    readFile(join(fontsDir, "jakarta-600.ttf")),
    // Logo yang sama dengan navbar (534 × 160 px).
    readFile(join(process.cwd(), "public/images/brand/morvo-logo.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          // Hijau sangat gelap (sama dengan footer) supaya logo berwarna terbaca.
          background: "#14241C",
          color: "#F6F1E7",
          fontFamily: "Jakarta",
          padding: "72px 80px",
        }}
      >
        {/* Garis layer cetak 3D */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
          {Array.from({ length: 126 }, (_, i) => (
            <div
              key={i}
              style={{ height: 5, borderTop: "1px solid rgba(246,241,231,0.05)" }}
            />
          ))}
        </div>

        {/* Benang filamen */}
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <path
            d="M 820 640 C 840 520 1000 520 1010 400 C 1020 280 880 260 900 150 C 915 70 1010 40 1210 60"
            fill="none"
            stroke="#A8D1DF"
            strokeOpacity="0.85"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <circle cx="1010" cy="400" r="22" fill="#A8D1DF" fillOpacity="0.3" />
          <circle cx="1010" cy="400" r="10" fill="#A8D1DF" />
        </svg>

        <div style={{ display: "flex", flexDirection: "column", width: 760, position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse butuh <img> biasa */}
          <img src={logoSrc} width={267} height={80} alt="" />

          <div
            style={{
              marginTop: 56,
              fontFamily: "Fraunces",
              fontSize: 68,
              lineHeight: 1.08,
              letterSpacing: -1,
            }}
          >
            {site.tagline}
          </div>

          <div
            style={{
              marginTop: "auto",
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 26,
              color: "#C9DCCB",
            }}
          >
            Plakat · Gantungan Kunci · Merch · QR Letter
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, style: "normal", weight: 600 },
        { name: "Jakarta", data: jakarta, style: "normal", weight: 600 },
      ],
    },
  );
}
