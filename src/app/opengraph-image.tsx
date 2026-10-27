import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { brand, hero } from "@/content/site";

export const alt = `${brand.name}, ${brand.descriptor.toLowerCase()}: “${hero.headline}”`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Read once at module scope so the image is generated at build time.
const [serif, sans, photo] = await Promise.all([
  readFile(join(process.cwd(), "src/assets/fonts/YoungSerif-Regular.ttf")),
  readFile(join(process.cwd(), "src/assets/fonts/SchibstedGrotesk-Medium.ttf")),
  readFile(join(process.cwd(), "src/assets/photos/hero.jpg")),
]);

export default async function OpengraphImage() {
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f4eee3", color: "#201a16" }}>
        <div style={{ width: 640, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 56px 48px" }}>
          {/* Same lockup as the site: a dotless ı carrying a copper coin */}
          <div style={{ display: "flex", fontFamily: "Young Serif", fontSize: 44, lineHeight: 1 }}>
            N
            <div style={{ display: "flex", position: "relative" }}>
              {"ı"}
              <div
                style={{ position: "absolute", top: 0, left: "50%", width: 10, height: 10, marginLeft: -5, borderRadius: 10, background: "#a6461b" }}
              />
            </div>
            nepence
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Young Serif", fontSize: 86, lineHeight: 0.98, letterSpacing: "-0.025em" }}>
              {hero.headline}
            </div>
            <div style={{ display: "flex", marginTop: 34, fontFamily: "Schibsted", fontSize: 22, color: "#5b4f46", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              {brand.descriptor}
            </div>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", position: "relative" }}>
          <img src={photoSrc} alt="" width={560} height={630} style={{ width: 560, height: 630, objectFit: "cover" }} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Young Serif", data: serif, style: "normal", weight: 400 },
        { name: "Schibsted", data: sans, style: "normal", weight: 500 },
      ],
    },
  );
}
