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
    values: ['Adobe Photoshop', 'CorelDRAW', 'Figma', 'emCAD'],
  },
  {
    label: 'Craft',
    values: ['Brand identity', 'Print production', 'Embroidery digitising', 'Layout & typography'],
  },
  {
    label: 'Build',
    values: ['HTML & CSS', 'JavaScript', 'React', 'Tailwind CSS'],
  },
  {
    label: 'Languages',
    values: ['Tamil — native', 'English — fluent'],
  },
];

/** What she is actually hired to do. Mirrors the categories in the work grid. */
export interface Capability {
  title: string;
  note: string;
}

export const capabilities: Capability[] = [
  {
    title: 'Packaging',
    note: 'Labels and cartons for retail, built around mandatory FSSAI marks and nutrition panels.',
  },
  {
    title: 'Print',
    note: 'Flyers, invitations and commercial artwork prepared to press specification.',
  },
  {
    title: 'Identity',
    note: 'Marks, business cards and the collateral a small business actually hands out.',
  },
  {
    title: 'Digital',
    note: 'Social creative and interface layouts, built on a real grid and reusable components.',
  },
];
