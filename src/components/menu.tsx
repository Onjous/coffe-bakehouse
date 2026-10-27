import Image from "next/image";
import { menuSections, menuNotes, seasonLabel, formatPrice, type MenuItem, type MenuSection } from "@/content/menu";
import { photos, menuPhotos } from "@/content/images";
import { SectionMark } from "./brand";
import { OvenSpread } from "./oven-photos";

export function Menu() {
  const [coffee, notCoffee, oven] = menuSections;

  return (
    <section id="menu" aria-labelledby="menu-title" className="mx-auto max-w-[1680px] px-4 pt-28 sm:px-6 md:pt-40 lg:px-10">
      <header className="grid gap-y-6 md:grid-cols-12 md:gap-x-6 lg:gap-x-8">
        <div className="md:col-span-7">
          <SectionMark numeral="ii">Menu</SectionMark>
          <h2 id="menu-title" className="mt-5 text-[clamp(2.6rem,11vw,3.6rem)] leading-[0.98] tracking-[-0.02em] md:text-[clamp(3.4rem,6vw,6.2rem)]">
            On the counter
          </h2>
        </div>
        <ul className="self-end text-sm leading-relaxed text-ink-soft md:col-span-5 md:justify-self-end md:text-right lg:col-span-4">
          {menuNotes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </header>

      <div className="milled-rule mt-8 text-ink md:mt-12" />

      <div className="grid gap-y-16 pt-10 md:grid-cols-12 md:gap-x-6 md:pt-14 lg:gap-x-8">
        <div className="md:col-span-7 lg:col-span-6">
          <MenuBlock section={coffee} columns />
          {/* Fills the space under the shorter coffee list; sits beside its caption like a menu-card illustration */}
          <figure className="mt-12 grid grid-cols-[1.5fr_1fr] items-end gap-4 sm:gap-6">
            <div className="relative aspect-[4/3] overflow-hidden bg-paper-deep">
              <Image
                src={photos.matcha.src}
                alt={photos.matcha.alt}
                placeholder="blur"
                sizes="(min-width: 768px) 28vw, 60vw"
                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out hover:scale-[1.04]"
                style={{ objectPosition: photos.matcha.position }}
              />
            </div>
            <figcaption className="label pb-1 text-ink-soft">
              {photos.matcha.caption}
              <span className="mt-1 block font-display normal-case tracking-normal">Pl. 3</span>
            </figcaption>
          </figure>
        </div>
        <MenuBlock section={notCoffee} className="md:col-span-5 lg:col-span-5 lg:col-start-8" />
      </div>

      {/* From the oven: the bakery's half of the menu gets the space and the pictures */}
      <OvenSpread photos={menuPhotos} initial="bun" className="mt-20 border-t border-rule pt-12 md:mt-28 md:pt-16">
        <MenuBlock section={oven} className="md:col-span-7 lg:col-span-6 lg:col-start-7" large />
      </OvenSpread>
    </section>
  );
}

function MenuBlock({
  section,
  className = "",
  columns = false,
  large = false,
}: {
  section: MenuSection;
  className?: string;
  columns?: boolean;
  large?: boolean;
}) {
  return (
    <div className={className}>
      <div className="sticky top-16 z-10 -mx-4 bg-paper/95 px-4 py-2 backdrop-blur-[2px] sm:-mx-6 sm:px-6 md:static md:mx-0 md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-none">
        <h3 className={`${large ? "text-[2.2rem] md:text-[2.8rem]" : "text-[1.9rem] md:text-[2.2rem]"} leading-none`}>{section.title}</h3>
      </div>
      <p className="mt-2 max-w-[32rem] text-[0.95rem] leading-relaxed text-ink-soft md:mt-3">{section.intro}</p>
      <ul className={`mt-6 ${columns ? "sm:columns-2 sm:gap-x-10" : ""}`}>
        {section.items.map((item) => (
          <MenuRow key={item.id} item={item} large={large} />
        ))}
      </ul>
    </div>
  );
}

function MenuRow({ item, large }: { item: MenuItem; large?: boolean }) {
  return (
    <li data-photo={item.photo} className="group break-inside-avoid border-b border-rule/70 py-3 last:border-b-0 sm:last:border-b">
      <div className="flex items-baseline gap-2">
        <span className={`${large ? "text-[1.12rem] md:text-[1.2rem]" : "text-[1.04rem]"} font-medium transition-colors group-hover:text-copper`}>
          {item.name}
          {item.dietary?.map((d) => (
            <abbr
              key={d}
              title={d === "v" ? "Vegetarian" : "Vegan"}
              className="ml-1.5 align-[0.12em] text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-ink-soft no-underline"
            >
              {d}
            </abbr>
          ))}
        </span>
        <span aria-hidden="true" className="min-w-4 flex-1 translate-y-[-0.28em] border-b border-dotted border-ink/35" />
        <span className="lining shrink-0 text-[1.04rem]">{formatPrice(item.price)}</span>
      </div>
      {(item.note || item.seasonal) && (
        <p className="mt-1 pr-14 text-[0.9rem] leading-snug text-ink-soft">
          {item.seasonal && <span className="label mr-2 text-[0.66rem] text-copper">{seasonLabel}</span>}
          {item.note}
        </p>
      )}
    </li>
  );
}
