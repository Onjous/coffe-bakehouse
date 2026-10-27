import { contact, visit, conceptNotice } from "@/content/site";
import { SectionMark } from "./brand";
import { HoursBoard } from "./hours-board";

function PlaceholderTag() {
  return (
    <span className="label ml-2 inline-block border border-dashed border-ink-soft/60 px-1.5 py-px align-middle text-[0.62rem] text-ink-soft">
      Placeholder
    </span>
  );
}

export function Visit() {
  return (
    <section id="visit" aria-labelledby="visit-title" className="mx-auto max-w-[1680px] px-4 pb-20 pt-32 sm:px-6 md:pb-24 md:pt-44 lg:px-10">
      <header>
        <SectionMark numeral="iv">Visit</SectionMark>
        <h2 id="visit-title" className="mt-5 max-w-[14ch] text-[clamp(2.6rem,11vw,3.6rem)] leading-[0.98] tracking-[-0.02em] md:text-[clamp(3.4rem,6vw,6.2rem)]">
          {visit.heading}
        </h2>
      </header>

      <div className="mt-12 grid gap-y-14 md:mt-16 md:grid-cols-12 md:gap-x-6 lg:gap-x-8">
        <div className="md:col-span-6 lg:col-span-5">
          <HoursBoard />
        </div>

        <div className="grid content-start gap-y-12 sm:grid-cols-2 sm:gap-x-8 md:col-span-6 md:grid-cols-1 lg:col-span-6 lg:col-start-7 lg:grid-cols-2">
          {/* Where: deliberately an obvious placeholder. No map, no directions link. */}
          <div>
            <h3 className="text-[1.6rem] leading-tight">Where</h3>
            <div className="mt-4 border border-dashed border-ink-soft/50 p-5">
              <address className="not-italic leading-relaxed text-ink-soft">
                {contact.address.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                Ninepence is a fictional café, so there’s no door to knock on. A real shop would put its address, nearest
                station and a map link here.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-[1.6rem] leading-tight">Get in touch</h3>
            <dl className="mt-4 divide-y divide-rule border-y border-rule">
              <div className="py-3">
                <dt className="label text-copper">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${contact.email.value}`} className="link-draw inline-block py-1">
                    {contact.email.value}
                  </a>
                  <PlaceholderTag />
                </dd>
              </div>
              <div className="py-3">
                <dt className="label text-copper">Phone</dt>
                <dd className="lining mt-1">
                  {contact.phone.value}
                  <PlaceholderTag />
                </dd>
              </div>
              <div className="py-3">
                <dt className="label text-copper">Instagram</dt>
                <dd className="mt-1 text-ink-soft">
                  {contact.instagram.value}
                  <PlaceholderTag />
                </dd>
              </div>
            </dl>
          </div>

          <div className="sm:col-span-2 md:col-span-1 lg:col-span-2">
            <div className="grid gap-4 border-t-2 border-ink pt-5 lg:grid-cols-[12rem_1fr] lg:gap-8">
              <h3 className="text-[1.6rem] leading-tight">{visit.orders.title}</h3>
              <div>
                <p className="max-w-[34rem] leading-[1.7] text-ink-soft">{visit.orders.body}</p>
                <a
                  href={`mailto:${contact.email.value}?subject=${encodeURIComponent("Tray order")}`}
                  className="mt-4 inline-block border-b-2 border-ink pb-1 font-medium transition-colors hover:border-copper hover:text-copper"
                >
                  Email about a tray
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-16 max-w-[52rem] text-sm leading-relaxed text-ink-soft md:mt-20">{conceptNotice}</p>
    </section>
  );
}
