# Ninepence — Coffee & Bakehouse

A one-page website for **Ninepence**, a fictional neighbourhood coffee shop and bakehouse in London.
It's portfolio project 04: a deliberately small, affordable small-business site, built so that the craft
shows in the branding, typography, photography and copy rather than in technical spectacle.

> **This is a fictional business.** The address, phone number, email and social handle are placeholders,
> the opening hours are examples, and the photographs are licensed images used for illustration.
> The site says so in the Visit section, the footer, the mobile menu and on `/notes`.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

| Command             | What it does                                    |
| ------------------- | ----------------------------------------------- |
| `npm run dev`       | Development server                              |
| `npm run build`     | Production build                                |
| `npm start`         | Serve the production build                      |
| `npm run lint`      | ESLint (Next.js core-web-vitals + TypeScript)   |
| `npm run typecheck` | `tsc --noEmit`                                  |

Requires Node 20.9 or newer (built and tested on Node 24).

## Stack

- **Next.js 16** (App Router, Cache Components, Turbopack), **React 19**, **TypeScript**
- **Tailwind CSS 4**, with design tokens defined in `src/app/globals.css` (`@theme`)
- `next/font` for self-hosted Google Fonts, `next/image` for responsive AVIF/WebP
- No database, CMS, cookies, analytics or third-party scripts. The page prerenders to static HTML.

## Editing the content

Everything a client would change is in two typed files:

| File                   | Contains                                                                 |
| ---------------------- | ------------------------------------------------------------------------ |
| `src/content/site.ts`  | Name, URL, nav, hours, contact placeholders, and all copy for each section |
| `src/content/menu.ts`  | Menu sections, items, prices (in pence), dietary marks, seasonal label   |
| `src/content/images.ts`| Photo imports, alt text, captions, crops and credits                     |

- **Prices** are stored in pence (`390` → `£3.90`) to avoid rounding errors.
- **Opening hours** use 24-hour strings and are formatted British style (`7.30am–5pm`). The header and
  the hours board work out "today" in `Europe/London` on the client.
- **Renaming the brand:** change `brand.name` in `site.ts`. The wordmark in `src/components/brand.tsx`
  is hand-set (its dotless "ı" carries the copper coin), so update its letters too, along with the
  `9d` in the roundel and the generated icons in `src/lib/coin-icon.tsx`.
- **Search indexing:** `brand.indexable` controls both the robots meta tag and `robots.txt`.
- **Before launching for a real business:** replace every `placeholder: true` value in `site.ts`,
  set `NEXT_PUBLIC_SITE_URL` (see below), add a real address and map link to the Visit section, and update `/notes`
  (privacy wording should name the business and its host).

## Photographs

Source images, licences and crops are listed in `scripts/photos.manifest.json`. To swap or re-grade a photo:

```bash
node scripts/prepare-photos.mjs          # all photos
node scripts/prepare-photos.mjs hero     # one slug
```

The script downloads the original (cached in `.photo-cache/`, which is git-ignored), crops it, applies the
shared grade (slightly warm, softer blacks, less saturation, fine grain) and writes
`src/assets/photos/<slug>.jpg`. `next/image` takes care of sizes and formats at runtime.

See [Asset licensing](#asset-licensing) below.

## Deploying to Vercel

1. Push the repository to GitHub, GitLab or Bitbucket.
2. In Vercel, choose **Add New → Project** and import the repository. The Next.js preset needs no changes:
   build command `next build`, output handled automatically.
3. Deploy. No environment variables are required: canonical URLs, the sitemap, `robots.txt` and the
   Open Graph image use the project's production domain, which Vercel provides to every build
   (`VERCEL_PROJECT_PRODUCTION_URL`).
4. Optional: to force a specific domain, add `NEXT_PUBLIC_SITE_URL` (for example `https://ninepence.cafe`)
   under **Settings → Environment Variables** and redeploy. Local builds fall back to `http://localhost:3000`
   (see `src/lib/site-url.ts`).

Any Node host works too: `npm run build && npm start`.

## Brand and naming

The working name **Farrow & Finch** was dropped. A preliminary web search (26 October 2026) found no café using
it, but the "Farrow & ___" pattern sits very close to **Farrow & Ball**, a major UK paint and wallpaper brand.
That's a real confusion risk for an interiors-led café, and "Finch" is already common in café names
(Olive & Finch, Little Finch, Finch House and others).

Alternatives considered: Ninepence, Second Rise, Odd Hours, Hob & Peel, Quire, Small Hours, Kiln & Crumb,
Tuppence, Ottoline and Morrow. Several (Second Rise, Odd Hours, Hob & Peel, Quire, Small Hours) returned no exact
café match, but each was either near a crowded word ("Rise" bakeries) or weaker on personality.

**Ninepence** was chosen because:

- it rests on a real British saying, *"as neat as ninepence"* (neat, tidy, done properly), first recorded in
  James Howell's *English Proverbs* (1659) as "As fine as fippence, as neat as nine pence";
- it's warm, slightly old-fashioned and a little witty, without being twee;
- it gives the identity its motifs: the pre-decimal shorthand **9d**, a coin with a milled edge, and the
  "neat" voice of the copy;
- searches for "Ninepence" with café, coffee and bakery found no matching business.

**Limitations:** this was a preliminary web search only. It is **not** a trademark search
(UK IPO, EUIPO or USPTO), a Companies House check or a domain check, and it says nothing about legal
availability. Treat the name as an unverified working name for a fictional concept.

## Design decisions that make it distinctive

- **One idea, carried through.** Everything comes from "neat as ninepence": the copper coin that dots the "i"
  in the wordmark, the 9d roundel with the saying set round its rim, and a *milled rule* (a hairline with coin-edge
  ticks) used as the menu and section divider.
- **A bakery-paper transition.** Sections meet with a *pinked* (zig-zag) edge, like the cut of a paper bag.
  It's used only twice, around the copper interlude and above the footer, so it stays special.
- **Type with a point of view.** Young Serif (warm, old-style, slightly quirky) for display; Schibsted Grotesk,
  drawn for a newspaper group, for text and prices. Section marks use roman numerals (i.–iv.), like a printed
  menu card, and photographs carry *plate* numbers (Pl. 1–8), like a small publication.
- **A palette that isn't beige minimalism.** Paper and espresso ink, with penny copper and a deep glaze green.
  The copper interlude and the green "enamel sign" of the opening hours are the two bold moments.
- **Editorial composition, not components.** An off-centre hero with a poster-crop photo; a story spread with a
  tall rail image and an hour-by-hour timetable instead of feature cards; a real menu with leaders, dietary marks and
  a photo that changes as you point at items; a staggered plate spread for the space; a hard-working Visit section.
- **Copy that sounds like the shop.** Short, specific, British, mildly funny ("we've stopped apologising for it"),
  and useful (laptops, dogs, prams, trays to order, allergens).
- **Restrained motion.** Words settle in once, the hero photo eases into place, photos in the Space section are
  revealed like prints being pulled, and the coin turns as it scrolls past. Nothing else moves, and with
  `prefers-reduced-motion` none of it does.

## Asset licensing

Photographs come from Wikimedia Commons and Flickr under licences that permit commercial use and modification.
Licence status was read from each file's source page on 26 October 2026. All were cropped and colour-graded
(see `scripts/prepare-photos.mjs`). The images illustrate the concept; **none show a real Ninepence**, and the
site says so. Images of identifiable venues with visible branding were rejected.

| Slug | Source | Author | Licence |
| ---- | ------ | ------ | ------- |
| hero | [Ciastka cynamonowe Sztokholm](https://commons.wikimedia.org/wiki/File:Ciastka_cynamonowe_Sztokholm.jpg) | MOs810 | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| story | [Making Bread (Unsplash)](https://commons.wikimedia.org/wiki/File:Making_Bread_(Unsplash).jpg) | Gaëlle Marcel | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| matcha | [Matcha - Chasing Rabbits Coffee House](https://commons.wikimedia.org/wiki/File:Matcha_-_Chasing_Rabbits_Coffee_House_2025-10-11.jpg) | Andy Li | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| bun | [Cinnamon roll in Stockholm](https://commons.wikimedia.org/wiki/File:Cinnamon_roll_in_Stockholm.jpg) | Kritzolina | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| croissant | [Croissant](https://www.flickr.com/photos/46583370@N04/4599562280) | Blarvar | [Public Domain Mark 1.0](https://creativecommons.org/publicdomain/mark/1.0/) |
| pastry | [Macaroon Boutique chocolate croissants 1](https://www.flickr.com/photos/49978063@N00/5290030329) | khawkins04 | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) |
| loaf | [rustic homemade sourdough bread and butter](https://www.flickr.com/photos/58367355@N00/5070438950) | jules:stonesoup | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) |
| room | [Seattle Bauhaus 10A](https://commons.wikimedia.org/wiki/File:Seattle_Bauhaus_10A.jpg) | Joe Mabel | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) |
| pour | [Brewing coffee in a jug (Unsplash)](https://commons.wikimedia.org/wiki/File:Brewing_coffee_in_a_jug_(Unsplash).jpg) | Karl Fredrickson | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| cups | [Beetroot Latte and Matcha Latte, Purezza, Brighton](https://commons.wikimedia.org/wiki/File:Beetroot_Latte_and_Matcha_Latte,_Purezza,_Brighton.jpg) | Andy Li | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| counter | [Kanelbullar homemade](https://commons.wikimedia.org/wiki/File:Kanelbullar_homemade.jpg) | Andreas Ivarsson | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) |

- **Attribution** for every CC BY / BY-SA image is on the live `/notes` page (generated from the manifest).
- **ShareAlike** (`bun`, `room`): the edited versions are shared under the same licence, as stated on `/notes`.
- **Fonts:** Young Serif (Bastien Sozeau) and Schibsted Grotesk (Bakken & Bæck, Henrik Kongsvoll), both SIL Open
  Font Licence. The TTFs in `src/assets/fonts` are used only to render the OG image and favicons; the site's fonts
  are self-hosted by `next/font`. The Schibsted file is a static 500-weight instance cut from the variable font.
- **Sourcing limitation:** Unsplash, Pexels and StockSnap block automated access (bot challenges and 403s), and
  those protections weren't bypassed. Photos therefore came from Commons and Flickr; a few are older phone or
  compact-camera shots, made consistent by the shared grade. A real client would ideally commission a half-day
  shoot of their own shop, which would lift the site more than anything else.

## QA report

Measured on 26 October 2026 against the production build (`next build && next start`), with Playwright
(Chromium 1248), axe-core and Lighthouse 12.

**Checks**

| Check | Result |
| ----- | ------ |
| `npm install`, `tsc --noEmit`, `eslint`, `next build` | Pass. No type errors, no lint warnings; all 8 routes prerender as static |
| Responsive screenshots at 360, 390, 430, 768, 1024, 1440, 1920 | Reviewed by eye; no horizontal overflow at any width (`scrollWidth === clientWidth`) |
| Images | 12/12 load at every width; no console errors |
| Keyboard | Skip link is first; it moves focus to `<main>`; visible focus ring on every focusable element |
| Anchors and CTAs | All in-page anchors resolve; nav links and the hero CTA land each section just below the sticky header |
| Mobile navigation | 44px button; `aria-expanded` updates; focus moves in and is trapped; Esc closes and returns focus; scroll locks; links close the panel and scroll to the section |
| Target size | No interactive targets under 24px (WCAG 2.2 AA minimum) |
| Reduced motion | Hero, coin and reveal animations and smooth scrolling are all disabled |
| axe-core (WCAG 2.2 AA + best practice) | 0 violations on `/` at 1440 and 390, and on `/notes` |
| Metadata | Title, description, OG/Twitter tags, generated 1200×630 OG image, icons, `robots.txt`, `sitemap.xml` |

**Lighthouse** (simulated throttling; mobile is Lighthouse's default Moto G profile)

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS |
| ---- | ----------- | ------------- | -------------- | --- | --- | --- |
| `/` mobile | 94 | 100 | 100 | 100 | 3.1 s | 0 |
| `/` desktop | 100 | 100 | 100 | 100 | 0.7 s | 0.002 |
| `/notes` mobile | 98 | 100 | 100 | 100 | — | — |

Mobile LCP is the hero photograph (a 39 KB AVIF at the size served). Scores were measured on localhost and will vary
on a real host.

**Issues found in review and fixed:** the mobile menu panel was trapped inside the header (its `backdrop-filter`
created a containing block); a negative margin made a Space plate overlap a caption, and a column collision dropped
it into its own row; tabular figures spaced out punctuation in prices and times; the coin read upside down ("p6")
on load; the menu columns were unbalanced; tablet hero spacing; the mobile interlude and footer layouts; small link
targets; OG wordmark lockup; duplicate SVG ids; AVIF delivery and lighter grain (mobile performance 91 → 94).

**Not tested:** real iOS Safari or Android devices, Firefox (scroll-driven reveals fall back to static images
there by design), screen readers (VoiceOver/NVDA) beyond the automated checks, and a deployed Vercel build.

## Project structure

```
src/
  app/
    layout.tsx            fonts, metadata
    page.tsx              the landing page
    notes/page.tsx        privacy & photo credits
    opengraph-image.tsx   generated 1200×630 share image
    icon.tsx, apple-icon.tsx   generated coin favicons
    sitemap.ts, robots.ts
    globals.css           tokens, motion, the milled rule and pinked edge
  components/             one file per section, plus brand.tsx (wordmark, roundel)
  content/                site.ts, menu.ts, images.ts — the editable bits
  lib/                    hours formatting, the London "today" hook, icon renderer
  assets/                 processed photos and font files used for image generation
scripts/                  photo preparation
```
