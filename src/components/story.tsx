import Image from "next/image";
import { story } from "@/content/site";
import { photos } from "@/content/images";
import { SectionMark } from "./brand";

export function Story() {
  return (
    <section id="story" aria-labelledby="story-title" className="mx-auto max-w-[1680px] px-4 pt-24 sm:px-6 md:pt-36 lg:px-10">
      <div className="grid grid-cols-1 gap-y-10 md:grid-cols-12 md:gap-x-6 lg:gap-x-8">
        {/* Left rail: section mark and a narrow, tall crop */}
        <div className="md:col-span-4 lg:col-span-3">
          <SectionMark numeral="i" as="h2" id="story-title">
            The story
          </SectionMark>
          <figure className="mt-8 hidden md:block">
            <div className="relative aspect-[3/5] overflow-hidden bg-paper-deep">
              <Image
                src={photos.story.src}
                alt={photos.story.alt}
                placeholder="blur"
                sizes="(min-width: 1024px) 22vw, 30vw"
                className="print-reveal h-full w-full object-cover"
                style={{ objectPosition: photos.story.position }}
              />
            </div>
            <figcaption className="label mt-3 flex justify-between text-ink-soft">
              <span>{photos.story.caption}</span>
              <span className="font-display normal-case tracking-normal">Pl. 2</span>
            </figcaption>
          </figure>
        </div>

        <div className="md:col-span-8 lg:col-span-8 lg:col-start-5">
          <p className="font-display text-[clamp(1.85rem,6.4vw,2.5rem)] leading-[1.12] tracking-[-0.012em] md:text-[clamp(2.2rem,3.6vw,3.6rem)]">
            <span aria-hidden="true" className="mr-1 text-copper">
              “
            </span>
            {story.lede}
          </p>

          {/* Mobile gets a wide crop instead of the tall rail image */}
          <figure className="-mx-4 mt-10 sm:-mx-6 md:hidden">
            <div className="relative aspect-[5/4] overflow-hidden bg-paper-deep">
              <Image
                src={photos.story.src}
                alt={photos.story.alt}
                placeholder="blur"
                sizes="100vw"
                className="h-full w-full object-cover"
                style={{ objectPosition: photos.story.position }}
              />
            </div>
            <figcaption className="label mt-3 px-4 text-ink-soft sm:px-6">{photos.story.caption}</figcaption>
          </figure>

          <div className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
            {story.paragraphs.map((p, i) => (
              <div key={p.title} className={i === 2 ? "sm:col-span-2 lg:col-span-1" : ""}>
                <h3 className="flex items-baseline gap-2 text-[1.35rem] leading-tight">
                  <span className="oldstyle font-display text-base text-copper">{String(i + 1).padStart(2, "0")}</span>
                  {p.title}
                </h3>
                <p className="mt-3 max-w-[34rem] text-[1.02rem] leading-[1.7] text-ink-soft">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The day, roughly — a timetable rather than a set of feature cards */}
      <div className="mt-20 md:mt-28">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-[1.6rem] md:text-[2rem]">The day, roughly</h3>
          <p className="label hidden text-ink-soft sm:block">Monday to Friday</p>
        </div>
        <div className="milled-rule mt-4 text-ink" />
        <ol className="lining grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6">
          {story.day.map((slot, i) => (
            <li
              key={slot.time}
              className={`grid grid-cols-[5.5rem_1fr] items-baseline gap-4 border-b border-rule py-4 sm:block sm:py-6 sm:pr-6 lg:border-b-0 ${
                i > 0 ? "lg:border-l lg:pl-5" : ""
              }`}
            >
              <span className="font-display text-[1.6rem] leading-none text-copper sm:text-[2rem]">{slot.time}</span>
              <p className="text-[0.97rem] leading-snug text-ink-soft sm:mt-3">{slot.note}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
