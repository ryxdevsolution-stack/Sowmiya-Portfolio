/**
 * Replaces the old "JavaScript — 75%" skill bars.
 *
 * Percentage bars are unverifiable and read as naive to anyone hiring designers.
 * A spec sheet says the same thing without inviting the question "75% of what?" —
 * and the work in the grid is the actual evidence.
 */

/** Rendered as an editorial spec sheet: label on the left, values on the right. */
export interface SpecRow {
  label: string;
  values: string[];
}

export const specSheet: SpecRow[] = [
  {
    label: 'Design',
    values: ['Adobe Photoshop', 'CorelDRAW', 'emCAD', 'Figma'],
  },
  {
    label: 'Business',
    values: ['Client handling & briefs', 'Lead generation', 'Order & delivery', 'Quoting & negotiation'],
  },
  {
    label: 'Craft',
    values: ['Brand identity', 'Print production', 'Embroidery digitising', 'Layout & typography'],
  },
  {
    label: 'Expanding',
    values: ['Video editing', 'Motion graphics', 'UI/UX design'],
  },
  {
    label: 'Languages',
    values: ['Tamil — native', 'English — professional'],
  },
];

/** What she is actually hired to do. Mirrors the categories in the work grid. */
export interface Capability {
  title: string;
  note: string;
}

export const capabilities: Capability[] = [
  {
    title: 'Retail Branding',
    note: 'Retail labels and cartons — regulatory marks and nutrition panels resolved into shelf-ready design.',
  },
  {
    title: 'Corporate Communications',
    note: 'Flyers, invitation suites and commercial artwork, prepared to full press and production specification.',
  },
  {
    title: 'Corporate Identity',
    note: 'Logos, business cards and brand collateral, built as a consistent and reusable visual system.',
  },
  {
    title: 'Digital Design',
    note: 'Social campaigns and interface layouts, built on a disciplined grid and reusable components.',
  },
  {
    title: 'Business Development',
    note: 'Scoping briefs, quoting projects and managing delivery — converting enquiries into long-term clients.',
  },
];
