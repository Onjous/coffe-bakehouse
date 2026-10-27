import Image from "next/image";
import { hero } from "@/content/site";
import { findMenuItem, formatPrice } from "@/content/menu";
import { photos } from "@/content/images";
import { Roundel } from "./brand";

export function Hero() {
  const usual = hero.usual.map(findMenuItem).filter((i) => i !== undefined);
  const words = hero.headline.split(" ");

  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="mx-auto grid max-w-[1680px] grid-cols-1 md:grid-cols-12 md:gap-x-6 lg:gap-x-8">
        {/* Words */}
        <div className="relative z-10 px-4 pt-6 sm:px-6 md:col-span-6 md:flex md:flex-col md:pb-12 md:pt-14 lg:col-span-6 lg:pl-10 lg:pt-20 xl:pt-24">
          <p className="label hero-line flex items-center gap-3 text-ink-soft">
            <span aria-hidden="true" className="h-px w-8 bg-copper" />
            {hero.kicker}
          </p>

          <h1
            id="hero-title"
            className="mt-5 text-[clamp(3.1rem,12.6vw,4.6rem)] leading-[0.94] tracking-[-0.025em] md:mt-8 md:text-[clamp(3.6rem,8vw,4.6rem)] lg:text-[clamp(4.6rem,7.3vw,8.8rem)]"
          >
            {words.map((w, i) => (
              <span key={i}>
                <span className="hero-line inline-block" style={{ "--i": i } as React.CSSProperties}>
                  {w}
                </span>{" "}
              </span>
            ))}
          </h1>

          <div className="hidden pt-12 md:block lg:mt-auto">
            <HeroIntro />
          </div>
        </div>

        {/* Photograph: bleeds to the right edge, cropped tall like a shop poster */}
        <div className="relative mt-8 md:col-span-6 md:mt-0 lg:col-span-6">
          <figure className="relative">
            <div className="hero-photo relative aspect-[4/5] overflow-hidden bg-paper-deep md:aspect-[4/5] lg:aspect-auto lg:h-[calc(100svh-4.5rem)] lg:max-h-[980px] lg:min-h-[560px]">
              <Image
                src={photos.hero.src}
                alt={photos.hero.alt}
                placeholder="blur"
                preload
                fetchPriority="high"
                sizes="(min-width: 1680px) 840px, (min-width: 768px) 50vw, 100vw"
                className="h-full w-full object-cover"
                style={{ objectPosition: photos.hero.position }}
              />
            </div>
            <figcaption className="label mt-3 flex justify-between gap-4 px-4 text-ink-soft sm:px-6 md:px-0 md:pr-10">
              <span>{photos.hero.caption}</span>
              <span className="font-display normal-case tracking-normal">Pl. 1</span>
            </figcaption>
          </figure>

          <Roundel className="coin-spin absolute -top-10 right-5 w-24 drop-shadow-[0_6px_14px_rgba(32,26,22,0.12)] sm:w-28 md:-left-14 md:right-auto md:top-[14%] md:w-32 lg:-left-16 lg:w-36" />
        </div>

        <div className="px-4 pb-4 pt-10 sm:px-6 md:hidden">
          <HeroIntro />
        </div>
      </div>

      {/* The usual: a little price card, as you'd find propped in a shop window */}
      <div className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-10">
        <div className="milled-rule mt-10 text-ink md:mt-0" />
        <div className="lining flex flex-wrap items-baseline gap-x-8 gap-y-2 py-4 text-[0.95rem] md:gap-x-12">
          <p className="label w-full text-copper sm:w-auto">Most mornings</p>
          <dl className="flex flex-wrap items-baseline gap-x-8 gap-y-2 md:gap-x-12">
            {usual.map((item) => (
              <div key={item.id} className="flex items-baseline gap-3">
                <dt>{item.name}</dt>
                <dd className="text-ink-soft">{formatPrice(item.price)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function HeroIntro() {
  return (
    <div className="max-w-[30rem]">
      <p className="text-[1.08rem] leading-relaxed text-ink-soft md:text-[1.15rem]">{hero.intro}</p>
      <ul className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
        <li>
          <a
            href="#menu"
            className="group inline-flex items-center gap-3 border-b-2 border-ink pb-1 text-[1.05rem] font-medium transition-colors hover:border-copper hover:text-copper"
          >
            See what’s on the counter
            <Arrow />
          </a>
        </li>
        <li>
          <a href="#visit" className="link-draw inline-flex items-center pb-1.5 pt-0.5 text-[1.05rem] text-ink-soft hover:text-ink">
            Hours &amp; finding us
          </a>
        </li>
      </ul>
    </div>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 28 12"
      className={`h-3 w-7 transition-transform duration-300 ease-out group-hover:translate-x-1 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M0 6h26M21 1l5 5-5 5" />
    </svg>
  );
}
