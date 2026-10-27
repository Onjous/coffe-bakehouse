import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Module scope, so icons are generated at build time rather than per request.
const youngSerif = await readFile(join(process.cwd(), "src/assets/fonts/YoungSerif-Regular.ttf"));

/** Renders the copper "9d" coin as a square PNG for favicons. */
export function coinIcon(px: number, { inset = 0 }: { inset?: number } = {}) {
  const d = px - inset * 2;
  const ticks = Array.from({ length: 60 }, (_, i) => i * 6);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: inset ? "#f4eee3" : "transparent",
        }}
      >
        <div
          style={{
            width: d,
            height: d,
            borderRadius: "50%",
            background: "#a6461b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {px >= 64 && (
            <svg width={d} height={d} viewBox="0 0 100 100" style={{ position: "absolute", top: 0, left: 0 }}>
              {ticks.map((deg) => (
                <line key={deg} x1="50" y1="2.5" x2="50" y2="7" stroke="#f4eee3" strokeWidth="0.9" transform={`rotate(${deg} 50 50)`} />
              ))}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f4eee3" strokeWidth="0.9" />
            </svg>
          )}
          <span
            style={{
              fontFamily: "Young Serif",
              color: "#f4eee3",
              fontSize: d * (px >= 64 ? 0.42 : 0.56),
              lineHeight: 1,
              marginTop: -d * 0.04,
              letterSpacing: "-0.02em",
            }}
          >
            9d
          </span>
        </div>
      </div>
    ),
    { width: px, height: px, fonts: [{ name: "Young Serif", data: youngSerif, style: "normal", weight: 400 }] },
  );
}
