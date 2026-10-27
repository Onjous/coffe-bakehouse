import Link from "next/link";
import { brand, nav, hours, contact } from "@/content/site";
import { formatRange } from "@/lib/hours";
import { Roundel, Wordmark } from "./brand";

/** Group consecutive days with the same hours: "Mon–Fri 7.30am–5pm". */
function compactHours() {
  const groups: { from: string; to: string; range: string }[] = [];
  for (const d of hours) {
    const range = formatRange(d);
    const last = groups[groups.length - 1];
    if (last && last.range === range) last.to = d.short;
    else groups.push({ from: d.short, to: d.short, range });
  }
  return groups.map((g) => ({ days: g.from === g.to ? g.from : `${g.from}–${g.to}`, range: g.range }));
}

export function SiteFooter() {
  return (
    <footer className="pinked-top bg-paper-deep">
      <div className="mx-auto max-w-[1680px] px-4 pb-8 pt-16 sm:px-6 md:pt-20 lg:px-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-12 lg:gap-x-8">
          <div className="col-span-2 flex items-start gap-5 md:col-span-5 lg:col-span-4">
            <Roundel tone="ink" className="w-20 shrink-0 sm:w-24" />
            <div>
              <Link href="/" className="text-[2.2rem] sm:text-[2.5rem]">
                <Wordmark />
              </Link>
              <p className="mt-3 max-w-[18rem] leading-relaxed text-ink-soft">
                {brand.descriptor}. As neat as we can manage.
              </p>
            </div>
          </div>

          <nav aria-label="Footer" className="md:col-span-2 lg:col-start-6">
            <h2 className="label text-ink-soft">Index</h2>
            <ul className="mt-4 space-y-1">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`/#${n.id}`} className="group inline-flex items-baseline gap-2 py-1">
                    <span className="font-display text-sm text-copper">{n.numeral}.</span>
                    <span className="link-draw">{n.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <h2 className="label text-ink-soft">Hours</h2>
            <dl className="lining mt-4 space-y-2 text-[0.95rem]">
              {compactHours().map((g) => (
                <div key={g.days}>
                  <dt className="text-ink">{g.days}</dt>
                  <dd className="text-ink-soft">{g.range}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="col-span-2 md:col-span-3">
            <h2 className="label text-ink-soft">Contact</h2>
            <ul className="mt-4 space-y-2 text-[0.95rem]">
              <li>
                <a href={`mailto:${contact.email.value}`} className="link-draw inline-block py-1">
                  {contact.email.value}
                </a>
              </li>
              <li className="lining text-ink-soft">{contact.phone.value}</li>
              <li className="text-ink-soft">Address to be confirmed</li>
            </ul>
            <p className="mt-3 text-xs text-ink-soft">All contact details are placeholders.</p>
          </div>
        </div>

        <div className="milled-rule mt-16 text-ink" />
        <div className="flex flex-col gap-4 pt-5 text-xs leading-relaxed text-ink-soft md:flex-row md:items-baseline md:justify-between">
          <p className="max-w-[46rem]">
            A fictional café: an independent portfolio concept, not a real business. Photographs are licensed images used
            for illustration.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/notes" className="link-draw inline-block py-1.5">
                Privacy &amp; credits
              </Link>
            </li>
            <li>
              <a href="#top" className="link-draw inline-block py-1.5">
                Back to the top ↑
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
