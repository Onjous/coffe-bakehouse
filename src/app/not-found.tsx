import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { Roundel, Wordmark } from "@/components/brand";
import { nav } from "@/content/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <header className="mx-auto flex h-16 max-w-[1680px] items-center justify-between px-4 sm:px-6 md:h-[4.5rem] lg:px-10">
        <Link href="/" className="text-[1.7rem] md:text-[1.9rem]">
          <Wordmark />
        </Link>
        <Link href="/" className="label link-draw py-2">
          Back to the café
        </Link>
      </header>

      <main id="main" className="mx-auto max-w-[1680px] px-4 pb-28 pt-12 sm:px-6 md:pt-20 lg:px-10">
        <div className="grid items-start gap-y-14 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-7">
            <p className="label lining text-copper">Error 404</p>
            <h1 className="mt-4 text-[clamp(2.8rem,10vw,6.4rem)] leading-[0.96] tracking-[-0.025em]">
              That one’s sold out.
            </h1>
            <p className="mt-6 max-w-[32rem] leading-[1.7] text-ink-soft">
              There’s no page at this address. It may have moved, or the link may have a typo in it. Everything else is
              still on the counter.
            </p>
          </div>

          <nav aria-label="Sections" className="md:col-span-4 md:col-start-9 md:pt-10">
            <p className="label mb-4 text-ink-soft">Try instead</p>
            <ol className="border-t border-rule">
              {nav.map((item) => (
                <li key={item.id} className="border-b border-rule">
                  <Link
                    href={`/#${item.id}`}
                    className="group flex items-baseline justify-between py-3.5 font-display text-[1.6rem] leading-none"
                  >
                    <span className="link-draw">{item.label}</span>
                    <span className="text-base text-copper">{item.numeral}.</span>
                  </Link>
                </li>
              ))}
            </ol>
            <Roundel className="mt-12 hidden w-28 md:block" />
          </nav>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
