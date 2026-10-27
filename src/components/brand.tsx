import { brand } from "@/content/site";

/**
 * The Ninepence wordmark. The tittle of the "i" is a small copper coin.
 * The visible letters are hidden from assistive tech and replaced by a plain label.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-block font-display leading-none tracking-[-0.015em] ${className}`}>
      <span className="sr-only">{brand.name}</span>
      <span aria-hidden="true" className="whitespace-nowrap">
        N
        <span className="relative inline-block">
          {"ı"}
          <span className="absolute left-1/2 top-[0.035em] size-[0.215em] -translate-x-1/2 rounded-full bg-copper shadow-[inset_0_0_0_0.03em_rgba(255,255,255,0.18)]" />
        </span>
        nepence
      </span>
    </span>
  );
}

/**
 * The coin roundel: a milled edge, "9d" (pre-decimal shorthand for ninepence)
 * and the saying set around the rim.
 */
export function Roundel({
  className = "",
  text = `${brand.saying} · ${brand.descriptor} · `,
  tone = "copper",
}: {
  className?: string;
  text?: string;
  tone?: "copper" | "paper" | "ink";
}) {
  // Each tone appears at most once per page, so it doubles as a unique id for the text path.
  const rimId = `roundel-rim-${tone}`;
  const colours = {
    copper: { fg: "var(--color-copper)", face: "var(--color-paper)" },
    paper: { fg: "var(--color-paper)", face: "transparent" },
    ink: { fg: "var(--color-ink)", face: "var(--color-paper)" },
  }[tone];

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      <defs>
        <path id={rimId} d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
      </defs>
      <circle cx="100" cy="100" r="97" fill={colours.face} />
      {/* Milled edge: 120 ticks drawn as one dashed ring (circumference 2π × 93.5 ≈ 587.5). */}
      <circle cx="100" cy="100" r="93.5" fill="none" stroke={colours.fg} strokeWidth="7" strokeDasharray="1.2 3.6957" />
      <circle cx="100" cy="100" r="88" fill="none" stroke={colours.fg} strokeWidth="1.2" />
      <circle cx="100" cy="100" r="56" fill="none" stroke={colours.fg} strokeWidth="0.8" />
      <text
        fill={colours.fg}
        style={{ fontFamily: "var(--font-sans)", fontSize: 13.2, fontWeight: 600, letterSpacing: "0.21em" }}
      >
        {/* Circumference of the rim path is ~452; textLength makes any phrase wrap exactly once. */}
        <textPath href={`#${rimId}`} startOffset="0" textLength="449" lengthAdjust="spacing">
          {text.toUpperCase()}
        </textPath>
      </text>
      <text
        x="100"
        y="118"
        textAnchor="middle"
        fill={colours.fg}
        style={{ fontFamily: "var(--font-display)", fontSize: 54 }}
      >
        9d
      </text>
    </svg>
  );
}

/** Roman numeral + label, used to open each section like a page in a menu card. */
export function SectionMark({
  numeral,
  children,
  className = "",
  as: Tag = "p",
  id,
  tone = "default",
}: {
  numeral: string;
  children: React.ReactNode;
  className?: string;
  as?: "p" | "h2";
  id?: string;
  tone?: "default" | "inverse";
}) {
  return (
    <Tag
      id={id}
      className={`label flex items-baseline gap-3 font-sans ${tone === "inverse" ? "text-paper/75" : "text-ink-soft"} ${className}`}
    >
      <span className={`font-display text-base normal-case tracking-normal ${tone === "inverse" ? "text-butter" : "text-copper"}`}>
        {numeral}.
      </span>
      <span>{children}</span>
    </Tag>
  );
}
