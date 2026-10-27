"use client";

import { useState } from "react";
import Image from "next/image";
import type { Photo } from "@/content/images";

/**
 * Wraps the From the Oven list. Pointing at an item with a `data-photo` key
 * swaps the photograph beside it. Purely an enhancement: every item is
 * readable without it, and the default photo is always shown first.
 */
export function OvenSpread({
  photos,
  initial,
  children,
  className = "",
}: {
  photos: Record<string, Photo>;
  initial: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [active, setActive] = useState(initial);
  const keys = Object.keys(photos);
  const current = photos[active] ?? photos[initial];

  return (
    <div
      className={className}
      onPointerOver={(e) => {
        const row = (e.target as HTMLElement).closest<HTMLElement>("[data-photo]");
        const key = row?.dataset.photo;
        if (key && key !== active && photos[key]) setActive(key);
      }}
    >
      <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-6 lg:gap-x-8">
        <figure className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <div className="relative aspect-[4/5] overflow-hidden bg-paper-deep">
              {keys.map((key) => (
                <Image
                  key={key}
                  src={photos[key].src}
                  alt={key === active ? photos[key].alt : ""}
                  aria-hidden={key !== active}
                  placeholder="blur"
                  sizes="(min-width: 1680px) 640px, (min-width: 768px) 40vw, 100vw"
                  className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out ${
                    key === active ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
                  }`}
                  style={{ objectPosition: photos[key].position }}
                />
              ))}
            </div>
            <figcaption className="label mt-3 flex justify-between gap-4 text-ink-soft">
              <span>{current.caption}</span>
              <span className="font-display normal-case tracking-normal">Pl. 4</span>
            </figcaption>
          </div>
        </figure>
        {children}
      </div>
    </div>
  );
}
