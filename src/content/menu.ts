/**
 * The menu. Prices are in pence to avoid floating-point surprises;
 * `formatPrice` turns them into "£3.90".
 */

export type Dietary = "v" | "vg";

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  note?: string;
  dietary?: Dietary[];
  /** Marks a seasonal special. */
  seasonal?: boolean;
  /** Key into `menuPhotos` (see images.ts) for the From the Oven photo panel. */
  photo?: string;
};

export type MenuSection = {
  id: string;
  title: string;
  /** One-line intro under the section title. */
  intro: string;
  items: MenuItem[];
};

export const menuSections: MenuSection[] = [
  {
    id: "coffee",
    title: "Coffee",
    intro: "House espresso, roasted across town. Whole or oat milk at no extra charge.",
    items: [
      { id: "espresso", name: "Espresso", price: 280 },
      { id: "macchiato", name: "Macchiato", price: 310 },
      { id: "cortado", name: "Cortado", price: 350 },
      { id: "flat-white", name: "Flat white", price: 390, note: "The one most people have" },
      { id: "cappuccino", name: "Cappuccino", price: 390 },
      { id: "latte", name: "Latte", price: 400 },
      { id: "long-black", name: "Long black", price: 340 },
      { id: "batch-filter", name: "Batch filter", price: 340, note: "This week’s single origin, refills £1" },
      { id: "pour-over", name: "Pour-over", price: 480, note: "Brewed to order. Four minutes, worth it" },
      { id: "iced-latte", name: "Iced latte", price: 430 },
      {
        id: "maple-latte",
        name: "Brown butter & maple latte",
        price: 450,
        seasonal: true,
        note: "Until the maple runs out",
      },
    ],
  },
  {
    id: "not-coffee",
    title: "Not coffee",
    intro: "For the other half of the queue.",
    items: [
      { id: "matcha", name: "Matcha latte", price: 460, note: "Whisked to order, hot or iced" },
      { id: "chai", name: "Chai", price: 400, note: "Our own spice mix, simmered on the stove" },
      { id: "hot-chocolate", name: "Hot chocolate", price: 400, note: "70% dark, not too sweet" },
      { id: "tea", name: "Pot of tea", price: 320, note: "Breakfast, Earl Grey or fresh mint" },
      { id: "juice", name: "Pressed apple juice", price: 350, note: "From a farm in Kent" },
      {
        id: "pear-soda",
        name: "Spiced pear soda",
        price: 380,
        seasonal: true,
        note: "Pear, ginger, a bit of clove",
        dietary: ["vg"],
      },
    ],
  },
  {
    id: "oven",
    title: "From the oven",
    intro: "Baked here from five each morning. When it’s gone, it’s gone.",
    items: [
      {
        id: "cardamom-bun",
        name: "Cardamom bun",
        price: 380,
        note: "The knotted one people ask about",
        dietary: ["v"],
        photo: "bun",
      },
      { id: "croissant", name: "Butter croissant", price: 340, dietary: ["v"], photo: "croissant" },
      { id: "pain-au-chocolat", name: "Pain au chocolat", price: 370, dietary: ["v"], photo: "croissant" },
      {
        id: "almond-croissant",
        name: "Almond croissant",
        price: 420,
        note: "Twice-baked, generous with the frangipane",
        dietary: ["v"],
        photo: "croissant",
      },
      {
        id: "danish",
        name: "Plum & frangipane Danish",
        price: 440,
        seasonal: true,
        dietary: ["v"],
        photo: "pastry",
      },
      {
        id: "scone",
        name: "Cheddar, leek & mustard scone",
        price: 390,
        note: "Warmed, with salted butter",
        dietary: ["v"],
        photo: "pastry",
      },
      { id: "cookie", name: "Dark chocolate & rye cookie", price: 290, dietary: ["v"], photo: "pastry" },
      {
        id: "toast",
        name: "Sourdough toast",
        price: 450,
        note: "Two thick slices, butter and this week’s jam",
        dietary: ["v"],
        photo: "loaf",
      },
      { id: "loaf", name: "Country loaf to take home", price: 650, dietary: ["vg"], photo: "loaf" },
    ],
  },
];

/** Shown beside items marked `seasonal`. Change with the seasons. */
export const seasonLabel = "Autumn";

export const menuNotes = [
  "Prices include VAT.",
  "V vegetarian · VG vegan",
  "Allergens: ask at the counter and we’ll show you the recipe book.",
];

export function formatPrice(pence: number) {
  return `£${(pence / 100).toFixed(2)}`;
}

export function findMenuItem(id: string) {
  for (const section of menuSections) {
    const item = section.items.find((i) => i.id === id);
    if (item) return item;
  }
  return undefined;
}
