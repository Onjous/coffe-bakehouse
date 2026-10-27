/**
 * Central, editable business information.
 *
 * Everything a client would change lives here (and in `menu.ts`).
 * Ninepence is a fictional café: values marked `placeholder: true`
 * must be replaced with real details before any launch.
 */

export type NavItem = { id: string; label: string; numeral: string };

export type DayHours = {
  /** 0 = Sunday … 6 = Saturday, matching `Date.prototype.getDay()` */
  day: number;
  label: string;
  short: string;
  /** 24h "HH:MM" strings, or null when closed */
  open: string | null;
  close: string | null;
};

export type Placeholder = { value: string; placeholder: true };

export const brand = {
  name: "Ninepence",
  descriptor: "Coffee & Bakehouse",
  saying: "As neat as ninepence",
  /** Used for metadata. Keep it plain and specific. */
  summary:
    "Ninepence is a small neighbourhood coffee shop and bakehouse: espresso, filter and matcha at the counter, buns, croissants and loaves from the oven out back.",
  locale: "en_GB",
  /** Set to false to keep the site out of search engines (also updates robots.txt). */
  indexable: true,
} as const;

export const nav: NavItem[] = [
  { id: "story", label: "Story", numeral: "i" },
  { id: "menu", label: "Menu", numeral: "ii" },
  { id: "space", label: "Space", numeral: "iii" },
  { id: "visit", label: "Visit", numeral: "iv" },
];

/** Example opening hours for the concept. */
export const hours: DayHours[] = [
  { day: 1, label: "Monday", short: "Mon", open: "07:30", close: "17:00" },
  { day: 2, label: "Tuesday", short: "Tue", open: "07:30", close: "17:00" },
  { day: 3, label: "Wednesday", short: "Wed", open: "07:30", close: "17:00" },
  { day: 4, label: "Thursday", short: "Thu", open: "07:30", close: "17:00" },
  { day: 5, label: "Friday", short: "Fri", open: "07:30", close: "17:00" },
  { day: 6, label: "Saturday", short: "Sat", open: "08:00", close: "17:00" },
  { day: 0, label: "Sunday", short: "Sun", open: "09:00", close: "15:00" },
];

export const hoursNote = "Bank holidays 9am–3pm. Closed Christmas Day and Boxing Day.";

/** IANA zone used to work out "today" on the client. */
export const timeZone = "Europe/London";

export const contact = {
  /** example.com is reserved for documentation, so it can never reach a real inbox. */
  email: { value: "hello@example.com", placeholder: true } as Placeholder,
  /** 020 7946 0xxx is Ofcom's range reserved for drama and fiction. */
  phone: { value: "020 7946 0391", placeholder: true } as Placeholder,
  instagram: { value: "@handle to be confirmed", placeholder: true } as Placeholder,
  address: {
    lines: ["[Street address]", "[Neighbourhood], London", "[Postcode]"],
    placeholder: true,
  },
};

export const hero = {
  kicker: "Coffee & bakehouse",
  headline: "The buns are out at half seven.",
  intro:
    "Ninepence is a small coffee shop with a bakery in the back. Espresso, filter and matcha at the counter; croissants, cardamom buns and sourdough from the oven, baked here every morning.",
  /** Menu item ids (see menu.ts) shown as a little price strip, like a shop-window card. */
  usual: ["flat-white", "cardamom-bun", "batch-filter"],
};

export const story = {
  lede: "We open at half seven because that’s when the first tray comes out, and it seemed rude to keep anyone waiting.",
  paragraphs: [
    {
      title: "The coffee",
      body: "The espresso is a house blend, roasted for us across town and changed twice a year. The filter changes every week: usually something bright and fruity, now and then something odd we couldn’t resist. Every shot is weighed. That isn’t fussiness. It’s how a Tuesday cup tastes like a Saturday one.",
    },
    {
      title: "The baking",
      body: "The bakers start at five. Croissant dough is laminated the day before and rests overnight. The cardamom buns are rolled and knotted by hand, which is slower than it needs to be, and we’ve stopped apologising for it. The Danish follows the seasons: rhubarb in spring, apricots in summer, plums and quince once the weather turns.",
    },
    {
      title: "The room",
      body: "There’s one long oak table, a stone counter and a window ledge that’s always taken. The cups come from a potter down the road, so none of them match. Stay an hour with a laptop or ten minutes with the paper. Either is fine by us.",
    },
  ],
  day: [
    { time: "05.00", note: "Ovens on. Radio on, quietly." },
    { time: "07.30", note: "Doors open. First tray of buns." },
    { time: "10.00", note: "Second bake: croissants and the Danish." },
    { time: "12.30", note: "Sourdough out. Loaves to take home." },
    { time: "14.00", note: "The quiet hour. Best time for the long table." },
    { time: "16.30", note: "Last orders. Leftovers go to a local food bank." },
  ],
};

export const interlude = {
  quote: ["As fine as fippence,", "as neat as ninepence."],
  source: "James Howell, English Proverbs, 1659",
  body: "That’s where the name comes from: a very old English saying for something tidy, well made and done properly. We liked it, and we try to live up to it, mostly by wiping the tables a lot.",
};

export const space = {
  heading: "A room you can stay in",
  intro:
    "Timber, stone and warm lamps; mismatched cups and a radiator under the window that everyone fights over in January. It’s a café, not a lounge, but nobody will hurry you out.",
  practicals: [
    { label: "Seats", value: "26 inside, a bench out front" },
    { label: "Laptops", value: "Welcome, except the long table at weekends" },
    { label: "Wi‑Fi", value: "Yes. Password’s on the till" },
    { label: "Dogs", value: "Very welcome. Water bowl by the door" },
    { label: "Prams", value: "There’s room. We’ll move a chair" },
  ],
};

export const visit = {
  heading: "When to come, and where",
  orders: {
    title: "Trays to order",
    body: "Office mornings, birthdays, leaving dos, emergencies: we’ll bake a tray of twelve buns or pastries with 48 hours’ notice. Send us an email.",
  },
};

export const conceptNotice =
  "Ninepence is a fictional café, designed as an independent portfolio concept. The address, phone number, email and social handle are placeholders, and the photographs are licensed images used for illustration.";
