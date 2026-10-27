import Image from "next/image";
import { space } from "@/content/site";
import { photos, type Photo } from "@/content/images";
import { SectionMark } from "./brand";

function Plate({
  photo,
  plate,
  sizes,
  aspect,
  className = "",
  captionClassName = "",
}: {
  photo: Photo;
  plate: number;
  sizes: string;
  aspect: string;
  className?: string;
  captionClassName?: string;
}) {
  return (
    <figure className={`group ${className}`}>
      <div className={`relative overflow-hidden bg-paper-deep ${aspect}`}>
        <Image
          src={photo.src}
          alt={photo.alt}
          placeholder="blur"
          sizes={sizes}
          className="print-reveal h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.035]"
          style={{ objectPosition: photo.position }}
        />
      </div>
      <figcaption className={`label mt-3 flex justify-between gap-4 text-ink-soft ${captionClassName}`}>
        <span>{photo.caption}</span>
        <span className="shrink-0 font-display normal-case tracking-normal">Pl. {plate}</span>
      </figcaption>
    </figure>
  );
}

export function Space() {
  return (
    <section id="space" aria-labelledby="space-title" className="mx-auto max-w-[1680px] px-4 pt-32 sm:px-6 md:pt-44 lg:px-10">
      <header className="grid gap-y-6 md:grid-cols-12 md:gap-x-6 lg:gap-x-8">
        <div className="md:col-span-7 lg:col-span-6">
          <SectionMark numeral="iii">The space</SectionMark>
          <h2 id="space-title" className="mt-5 text-[clamp(2.6rem,11vw,3.6rem)] leading-[0.98] tracking-[-0.02em] md:text-[clamp(3.4rem,6vw,6.2rem)]">
            {space.heading}
          </h2>
        </div>
        <p className="max-w-[30rem] self-end text-[1.05rem] leading-[1.7] text-ink-soft md:col-span-5 lg:col-span-4 lg:col-start-8">
          {space.intro}
        </p>
      </header>

      <div className="mt-12 grid grid-cols-12 gap-x-4 gap-y-12 sm:gap-x-6 md:mt-20 md:gap-y-16 lg:gap-x-8">
        <Plate
          photo={photos.room}
          plate={5}
          aspect="aspect-[4/3] md:aspect-[3/2]"
          sizes="(min-width: 768px) 62vw, 100vw"
          className="col-span-12 -mx-4 sm:-mx-6 md:col-span-8 md:mx-0"
          captionClassName="px-4 sm:px-6 md:px-0"
        />
        <Plate
          photo={photos.pour}
          plate={6}
          aspect="aspect-[3/4]"
          sizes="(min-width: 768px) 30vw, 66vw"
          className="col-span-8 col-start-5 md:col-span-4 md:col-start-9 md:mt-28"
        />
        <Plate
          photo={photos.cups}
          plate={7}
          aspect="aspect-square"
          sizes="(min-width: 768px) 24vw, 55vw"
          className="col-span-7 md:col-span-3 md:col-start-2 md:-mt-8"
        />

        {/* House notes: the practical things people actually want to know */}
        <div className="col-span-12 md:col-span-4 md:col-start-5 md:-mt-8">
          <h3 className="text-[1.6rem] leading-tight">House notes</h3>
          <div className="milled-rule mt-4 text-ink" />
          <dl className="divide-y divide-rule">
            {space.practicals.map((p) => (
              <div key={p.label} className="grid grid-cols-[6.5rem_1fr] gap-4 py-3 text-[0.98rem]">
                <dt className="label pt-[0.2rem] text-copper">{p.label}</dt>
                <dd className="text-ink-soft">{p.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <Plate
          photo={photos.counter}
          plate={8}
          aspect="aspect-[4/5] md:aspect-[4/3]"
          sizes="(min-width: 768px) 32vw, 100vw"
          className="col-span-12 -mx-4 sm:-mx-6 md:col-span-4 md:col-start-9 md:mx-0 md:mt-10"
          captionClassName="px-4 sm:px-6 md:px-0"
        />
      </div>
    </section>
  );
}
