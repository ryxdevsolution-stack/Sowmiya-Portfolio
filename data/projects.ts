/**
 * The work. Every image here is Sowmiya's own — no stock.
 *
 * ─── ADDING A NEW PIECE ────────────────────────────────────────────────────
 *   1. Drop the artwork (JPG, PNG or press-ready PDF) into  app/images/
 *   2. Run  `npm run images`  — it rasterises PDFs, caps the longest edge and
 *      writes an optimised .webp into  public/work/
 *   3. Add an entry below pointing at that file.
 *
 * `width` and `height` are the REAL pixel dimensions of the output file. They
 * are not decorative: they let the browser reserve the exact box before the
 * image loads (so nothing shifts — Core Web Vitals CLS) and they let the grid
 * present each piece at its true proportions. Artwork is never cropped.
 * Run `npm run images` and read the printed dimensions to fill these in.
 * ───────────────────────────────────────────────────────────────────────────
 */

export type ProjectCategory = 'Packaging' | 'Campaign' | 'Print' | 'Identity' | 'Digital';

export interface Artwork {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * The tile each piece claims in the bento grid.
 *
 * Crucially, the size sets BOTH the column span and the image's aspect ratio —
 * and the ratio is chosen to match the artwork's own proportions, so cropping
 * stays minimal.
 *
 * The obvious alternative (fixed row heights plus `row-span-2`) is what breaks
 * bento grids that carry real content: a 2-row tile becomes roughly 340×725px,
 * an 0.47 aspect, and a 0.9-ratio carton dropped into it loses half its width to
 * the crop. The tile shape ends up chosen by the grid rather than by the work.
 * Letting each piece declare its own ratio inverts that.
 *
 *   hero   — 2 cols, 16:10. The lead piece, inverted to dark.
 *   wide   — 2 cols, 16:9.  For landscape artwork (business cards ≈ 1.73:1).
 *   tall   — 1 col,  3:4.   For portrait artwork (flyers, cartons, social posts).
 *   square — 1 col,  1:1.
 *   normal — 1 col,  4:3.
 */
export type BentoSize = 'hero' | 'wide' | 'tall' | 'square' | 'normal';

/**
 * A colour per discipline: a rule across the card's top edge, and the category pill.
 *
 * ─── WHY THE PILL IS OPAQUE ────────────────────────────────────────────────
 * The pill was originally a 10%-alpha tint (`bg-amber-500/10`) with a
 * theme-dependent foreground (`text-amber-700 dark:text-amber-400`). That is
 * broken by construction, and an audit confirmed it: the pill floats ON TOP OF
 * THE ARTWORK, so it composites against whatever pixels happen to be behind it —
 * and the artwork does not change with the theme. Measured against the real
 * backdrops, 7 of 8 pills failed 4.5:1 in light and 8 of 8 failed in dark
 * (amber-400 on the SRR carton's white product shot came out at 1.21:1 —
 * effectively invisible). `backdrop-blur` blurs; it does not create contrast.
 *
 * An opaque chip stops depending on the artwork entirely, so the ratio is fixed
 * and knowable. The `dark:` variants are gone for the same reason — there is no
 * theme-coloured surface underneath to compensate for.
 *
 * Verified: amber-700 5.02:1 · emerald-700 5.48:1 · rose-700 6.29:1 ·
 *           violet-700 7.10:1 · sky-700 5.93:1 — all against white text.
 * ───────────────────────────────────────────────────────────────────────────
 */
export const categoryTint: Record<ProjectCategory, { bar: string; pill: string }> = {
  Packaging: { bar: 'bg-amber-600', pill: 'bg-amber-700 text-white' },
  Campaign: { bar: 'bg-emerald-600', pill: 'bg-emerald-700 text-white' },
  Print: { bar: 'bg-rose-600', pill: 'bg-rose-700 text-white' },
  Identity: { bar: 'bg-violet-600', pill: 'bg-violet-700 text-white' },
  Digital: { bar: 'bg-sky-600', pill: 'bg-sky-700 text-white' },
};

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  client: string;
  year: string;
  /** One line, shown beneath the title. */
  summary: string;
  /** Two or three sentences, shown in the lightbox. */
  description: string;
  role: string;
  tools: string[];
  size: BentoSize;
  cover: Artwork;
  /** Further frames shown in the lightbox. The cover is always frame one. */
  gallery: Artwork[];
}

export const projects: Project[] = [
  {
    slug: 'leggings-packaging-system',
    title: 'Leggings Packaging System',
    category: 'Packaging',
    client: 'Sri Vengateswara Garments · German Cliff',
    year: '2025',
    summary: 'One die-line, three SKUs, two brands.',
    description:
      'Retail sleeve packaging for churidar and ankle-length leggings, built as a system rather than as three separate jobs. A single die-line carries the front panel, the spine and the spec panel; the brand lockup, the colourway and the product photography are the only variables. That means a new SKU or a new label ships without new tooling — which is the difference between a design and a design system.',
    role: 'Graphic Designer',
    tools: ['CorelDRAW', 'Adobe Photoshop'],
    size: 'hero',
    cover: {
      src: '/work/leggings-hummingbird.webp',
      alt: 'Hummingbird churidar leggings packaging sleeve: a magenta colourway with the gradient hummingbird mark, a model in pink leggings, a vertical CHURIDAR LEGGINGS spine, and a spec panel listing 95% cotton, 5% elastane, four-way stretch and a size grid.',
      width: 2000,
      height: 1714,
    },
    gallery: [
      {
        src: '/work/leggings-german-cliff-churidhar.webp',
        alt: 'German Cliff churidhar leggings sleeve in a mustard and purple colourway, using the same die-line: model photography on the front panel, vertical spine type, and an identical spec and size panel.',
        width: 2000,
        height: 1714,
      },
      {
        src: '/work/leggings-german-cliff-ankle.webp',
        alt: 'German Cliff ankle-length leggings sleeve in a maroon and purple colourway, showing the same template adapted to a different product and colour.',
        width: 2000,
        height: 1714,
      },
    ],
  },
  {
    slug: 'srr-food-packaging',
    title: 'SRR Health Mix & Red Banana',
    category: 'Packaging',
    client: 'SRR — Sree Ram Traders',
    year: '2025',
    summary: 'FSSAI-compliant food packaging for a natural foods range.',
    description:
      'Retail packaging for a natural foods brand, covering the Health Mix carton and the Red Banana Powder label. Food packaging is a constrained brief: the FSSAI mark, the veg symbol, the nutrition panel and the licence number are all mandatory and all fixed in size, so the design has to earn its shelf appeal in the space that is left over.',
    role: 'Graphic Designer',
    tools: ['CorelDRAW', 'Adobe Photoshop'],
    size: 'tall',
    cover: {
      src: '/work/srr-health-mix.webp',
      alt: 'SRR Health Mix carton: a blue pack with a yellow banner, a fan of 36 grains, nuts, cereals and pulses arranged as a flower, and a 100% natural ingredients seal.',
      width: 1797,
      height: 2000,
    },
    gallery: [
      {
        src: '/work/srr-red-banana-powder.webp',
        alt: 'SRR Red Banana Powder label: deep red pack with a milk-pour graphic, product photography of red bananas, and a full nutritional information panel.',
        width: 1020,
        height: 1542,
      },
    ],
  },
  {
    slug: 'sri-vengateswara-identity',
    title: 'Sri Vengateswara Garments',
    category: 'Identity',
    client: 'Sri Vengateswara Garments',
    year: '2025',
    summary: 'A garment-trade identity and card, carrying a scannable location.',
    description:
      'Brand mark and business card for a garment manufacturer in Tiruppur. The card does real work rather than decorative work: a scannable location QR, the GST number and both partners’ direct lines, because in the garment trade the card is often the only contact record a buyer keeps.',
    role: 'Graphic Designer',
    tools: ['CorelDRAW', 'Adobe Photoshop'],
    size: 'wide',
    cover: {
      src: '/work/sri-vengateswara-card.webp',
      alt: 'Sri Vengateswara Garments business card: a green and silver layout with a leaf mark, a location QR code, GST number and contact details.',
      width: 1063,
      height: 615,
    },
    gallery: [],
  },
  {
    slug: 'humming-bird-identity',
    title: 'Humming Bird',
    category: 'Identity',
    client: 'Humming Bird',
    year: '2025',
    summary: 'A gradient bird mark set against its own oversized wordmark.',
    description:
      'Identity and card for Humming Bird. The mark is a single gradient stroke that reads as a bird in flight, and the card sets it against an outlined wordmark blown up to bleed off both edges — so the logo is legible at contact-detail scale while the brand still fills the card.',
    role: 'Graphic Designer',
    tools: ['CorelDRAW', 'Adobe Photoshop'],
    size: 'wide',
    cover: {
      src: '/work/humming-bird-card.webp',
      alt: 'Humming Bird business card: a violet-to-cyan gradient hummingbird mark beside the wordmark, over a large outlined HUMMING BIRD lettering, with a purple contact band.',
      width: 1063,
      height: 615,
    },
    gallery: [],
  },
  {
    slug: 'majestic-admissions',
    title: 'Admissions Open',
    category: 'Print',
    client: 'Majestic Public School, Tirupur',
    year: '2025',
    summary: 'An admissions campaign flyer built to be read across a room.',
    description:
      'A print flyer announcing the 2026–27 admissions intake. The brief carried a lot of mandatory copy — two campus addresses, the full group listing, the feature set — so the layout leads with a single loud message and lets the detail resolve as the reader gets closer.',
    role: 'Graphic Designer',
    tools: ['Adobe Photoshop', 'CorelDRAW'],
    size: 'tall',
    cover: {
      src: '/work/majestic-admissions-flyer.webp',
      alt: 'Majestic Public School admissions flyer: children stretching in a classroom above a maroon and white layout reading Admissions Open 2026–2027, Pre KG to Grade 5.',
      width: 993,
      height: 1403,
    },
    gallery: [],
  },
  {
    slug: 'loan-nanban-campaign',
    title: 'Loan Nanban',
    category: 'Campaign',
    client: 'Loan Nanban, Namakkal',
    year: '2025',
    summary: 'A Tamil-language campaign for a loan brokerage.',
    description:
      'Social creative for a loan consultancy working across Namakkal, Tiruchengode, Salem and Erode. The campaign is written and set entirely in Tamil, which is a typographic problem before it is a design one: Tamil glyphs carry tall ascenders and stacked vowel marks, so the headline leading has to be opened up well beyond what a Latin layout would need before the type stops colliding with itself.',
    role: 'Graphic Designer',
    tools: ['Adobe Photoshop', 'CorelDRAW'],
    size: 'tall',
    cover: {
      src: '/work/loan-nanban-no-to-yes.webp',
      alt: 'Loan Nanban social creative: a woman in a green saree holding banknotes beside large NO and YES lettering in Tamil and English, over a background of falling currency, with a service strip for home loan, plot loan, loan against property and top-up funding.',
      width: 1080,
      height: 1350,
    },
    gallery: [
      {
        src: '/work/loan-nanban-guidance.webp',
        alt: 'Loan Nanban creative on a deep blue field: a man holding a phone showing a savings account balance, with Tamil headline copy about loans being easy when you have the right guidance, and four loan categories listed below.',
        width: 1024,
        height: 1280,
      },
      {
        src: '/work/loan-nanban-housing.webp',
        alt: 'Loan Nanban housing loan creative in green and gold: a woman fanning banknotes beside a list of housing loan products in Tamil, a sanction-letter funding badge, and the logos of RBL, Piramal Finance, HDFC, PNB and SBI.',
        width: 956,
        height: 1280,
      },
    ],
  },
  {
    slug: 'property-nanban-campaign',
    title: 'Property Nanban',
    category: 'Campaign',
    client: 'Property Nanban, Vazhapadi',
    year: '2025',
    summary: 'Plot-sale creative for a DTCP-approved development.',
    description:
      'A run of social creative selling residential plots in a gated development. Each piece has to carry the same compliance furniture — DTCP and RERA approval, road widths, the price per square foot — so the layout treats that block as a fixed element and varies only the headline, the imagery and the location, which keeps a fast-moving campaign consistent.',
    role: 'Graphic Designer',
    tools: ['Adobe Photoshop', 'CorelDRAW'],
    size: 'tall',
    cover: {
      src: '/work/property-nanban-invest.webp',
      alt: 'Property Nanban creative: a family standing under a house-shaped topiary on a slab of turf, with stacks of coins sprouting saplings, a Tamil headline urging investment in land, and a list of DTCP and RERA approvals.',
      width: 1080,
      height: 1350,
    },
    gallery: [
      {
        src: '/work/property-nanban-singipuram.webp',
        alt: 'Property Nanban plot creative for Singipuram: a modern two-storey house and a multigenerational family, a ₹2200 per square foot price badge, and a bullet list of amenities in Tamil and English.',
        width: 1024,
        height: 1280,
      },
      {
        src: '/work/property-nanban-elimedu.webp',
        alt: 'Property Nanban plot creative for Elimedu: a red circular graphic behind a house with a winding road, a family seated on grass, and a ₹1300 per square foot price badge.',
        width: 1024,
        height: 1280,
      },
    ],
  },
  {
    slug: 'sparkwee-social',
    title: 'SparkWee',
    category: 'Digital',
    client: 'SparkWee',
    year: '2025',
    summary: 'Social creative for a digital marketing agency.',
    description:
      'A social post for a digital marketing agency, built on a diagonal split that lets the photography and the message each hold a full half of the frame. The angle is carried through from the logo lockup, so the composition and the mark share one geometry.',
    role: 'Graphic Designer',
    tools: ['Adobe Photoshop'],
    size: 'square',
    cover: {
      src: '/work/sparkwee-social.webp',
      alt: 'SparkWee social media post: a navy and red diagonal layout reading We Are Digital Marketing Agency, with a photograph of a woman reacting to her phone.',
      width: 1272,
      height: 1265,
    },
    gallery: [],
  },
];
