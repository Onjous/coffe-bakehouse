/**
 * Photographs: imports, alt text, captions and crops.
 *
 * Source, author and licence for each file live in scripts/photos.manifest.json
 * (the same file the preparation script reads), so credits can't drift.
 */
import type { StaticImageData } from "next/image";
import manifest from "../../scripts/photos.manifest.json";

import hero from "@/assets/photos/hero.jpg";
import story from "@/assets/photos/story.jpg";
import matcha from "@/assets/photos/matcha.jpg";
import bun from "@/assets/photos/bun.jpg";
import croissant from "@/assets/photos/croissant.jpg";
import pastry from "@/assets/photos/pastry.jpg";
import loaf from "@/assets/photos/loaf.jpg";
import room from "@/assets/photos/room.jpg";
import pour from "@/assets/photos/pour.jpg";
import cups from "@/assets/photos/cups.jpg";
import counter from "@/assets/photos/counter.jpg";

export type Photo = {
  src: StaticImageData;
  alt: string;
  caption: string;
  /** CSS object-position for the crop. */
  position?: string;
};

export const photos = {
  hero: {
    src: hero,
    alt: "Two knotted cardamom buns, glossy and scattered with pearl sugar, on a sheet of brown baking paper.",
    caption: "Knotted buns, first tray",
    position: "50% 45%",
  },
  story: {
    src: story,
    alt: "A floury hand squeezing shaggy dough over a glass mixing bowl, against a dark background.",
    caption: "Before five",
    position: "40% 78%",
  },
  matcha: {
    src: matcha,
    alt: "A matcha latte with a leaf poured in the foam, in a pale blue cup and saucer on a wooden table.",
    caption: "Matcha, whisked to order",
    position: "50% 55%",
  },
  room: {
    src: room,
    alt: "People reading and working at wooden tables beside a wall of tall factory-style windows.",
    caption: "Window tables, mid-afternoon",
    position: "50% 60%",
  },
  pour: {
    src: pour,
    alt: "A gooseneck kettle pouring water into a paper filter on a glass coffee brewer, in low light.",
    caption: "Filter, four minutes",
    position: "55% 50%",
  },
  cups: {
    src: cups,
    alt: "Two hand-thrown cups with green and cream glaze on saucers, on a pine table.",
    caption: "No two cups match",
    position: "58% 60%",
  },
  counter: {
    src: counter,
    alt: "Rows of knotted buns cooling on a wire rack.",
    caption: "Cooling, 7.20am",
    position: "40% 50%",
  },
} satisfies Record<string, Photo>;

/** The From the Oven panel swaps between these as you point at menu items. */
export const menuPhotos: Record<string, Photo> = {
  bun: {
    src: bun,
    alt: "A knotted cardamom bun with pearl sugar on a white plate.",
    caption: "Cardamom bun",
    position: "50% 50%",
  },
  croissant: {
    src: croissant,
    alt: "Close-up of butter croissants with dark, flaky, caramelised layers.",
    caption: "Butter croissants",
    position: "40% 50%",
  },
  pastry: {
    src: pastry,
    alt: "Two pains au chocolat on a table, one showing its dark chocolate centre.",
    caption: "Pain au chocolat",
    position: "45% 60%",
  },
  loaf: {
    src: loaf,
    alt: "A crusty country loaf, sliced, on baking paper with a block of butter behind it.",
    caption: "Country loaf",
    position: "50% 55%",
  },
};

type ManifestEntry = (typeof manifest)[number];

/** Plate numbers as they appear in the page captions. */
const plateOrder: Record<string, number> = {
  hero: 1,
  story: 2,
  matcha: 3,
  bun: 4,
  croissant: 4,
  pastry: 4,
  loaf: 4,
  room: 5,
  pour: 6,
  cups: 7,
  counter: 8,
};

export const photoCredits = (manifest as ManifestEntry[]).map((e) => ({
  slug: e.slug,
  plate: plateOrder[e.slug] ?? 0,
  title: e.title,
  author: e.author,
  source: e.source,
  license: e.license,
  licenseUrl: e.licenseUrl,
  changes: "Cropped and colour-graded.",
}));
