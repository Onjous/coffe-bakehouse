import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { Wordmark } from "@/components/brand";
import { photoCredits } from "@/content/images";
import { conceptNotice } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy & credits",
  description: "How this site handles your data (it barely does), and who took the photographs.",
  alternates: { canonical: "/notes" },
};

export default function Notes() {
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
        <div className="grid gap-y-16 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-4">
            <p className="label text-copper">The small print</p>
            <h1 className="mt-4 text-[clamp(2.6rem,9vw,4.8rem)] leading-[0.98] tracking-[-0.02em]">Privacy &amp; credits</h1>
            <p className="mt-6 max-w-[26rem] leading-[1.7] text-ink-soft">{conceptNotice}</p>
          </div>

          <div className="space-y-16 md:col-span-7 md:col-start-6">
            <section aria-labelledby="privacy">
              <h2 id="privacy" className="text-[2rem] leading-tight">
                Privacy
              </h2>
              <div className="milled-rule mt-4 text-ink" />
              <div className="mt-6 max-w-[40rem] space-y-4 leading-[1.75] text-ink-soft">
                <p>
                  This site doesn’t use cookies, analytics, advertising trackers or embedded social media. There are no
                  forms, so it doesn’t collect anything you type.
                </p>
                <p>
                  Fonts and images are served from the same place as the site itself, so loading a page doesn’t send your
                  details to Google or anyone else. The hosting provider may keep standard server logs (such as IP
                  addresses and the pages requested) for security and to keep the site running.
                </p>
                <p>
                  If you click an email link, your own email app opens; nothing is sent until you send it. The addresses
                  shown are placeholders and don’t reach a real inbox.
                </p>
                <p>
                  A real business using this site would add its name, contact details and the name of its hosting
                  provider here, in line with UK GDPR.
                </p>
              </div>
            </section>

            <section aria-labelledby="credits">
              <h2 id="credits" className="text-[2rem] leading-tight">
                Photographs
              </h2>
              <div className="milled-rule mt-4 text-ink" />
              <p className="mt-6 max-w-[40rem] leading-[1.75] text-ink-soft">
                The photographs are by independent photographers, used under the licences listed. They illustrate the
                concept and don’t show a real Ninepence. Each was cropped and colour-graded to sit together; any original
                credited under a ShareAlike licence is shared under the same licence in its edited form.
              </p>
              <ol className="mt-8 divide-y divide-rule border-y border-rule">
                {photoCredits.map((c) => (
                  <li key={c.slug} className="grid gap-1 py-4 sm:grid-cols-[4.5rem_1fr] sm:gap-4">
                    <span className="font-display text-copper">Pl. {c.plate}</span>
                    <p className="leading-relaxed">
                      <a href={c.source} className="link-draw" rel="noopener">
                        {c.title}
                      </a>{" "}
                      <span className="text-ink-soft">
                        by {c.author}.{" "}
                        <a href={c.licenseUrl} className="underline decoration-rule underline-offset-4 hover:decoration-copper" rel="license noopener">
                          {c.license}
                        </a>
                        . {c.changes}
                      </span>
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="type">
              <h2 id="type" className="text-[2rem] leading-tight">
                Type
              </h2>
              <div className="milled-rule mt-4 text-ink" />
              <p className="mt-6 max-w-[40rem] leading-[1.75] text-ink-soft">
                Young Serif by Bastien Sozeau and Schibsted Grotesk by Bakken &amp; Bæck and Henrik Kongsvoll, both under the SIL Open Font
                Licence.
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
