/**
 * Note the absence of a `period` field.
 *
 * The earlier version led each role with "8 months" / "6 months" in the leftmost
 * column of the grid — which handed the weakest fact the strongest position on
 * the page. Tenure is on the résumé, where an employer can ask about it in
 * context. It has no business being the first thing anyone reads about the work.
 */
export interface Role {
  title: string;
  organisation: string;
  /** Kept to around three or four lines — a portfolio is not a CV dump. */
  points: string[];
}

export interface Education {
  institution: string;
  qualification: string;
  period: string;
}

export const roles: Role[] = [
  {
    title: 'Freelance Designer — UI, Video & Business Development',
    organisation: 'Independent / Freelance',
    points: [
      'Business development: generate and convert my own client leads — first contact, scoping the brief, quoting and negotiating each project end to end.',
      'Own each client relationship through the full cycle: requirements, revisions and on-time delivery across web and mobile.',
      'Design UI layouts in Figma and cut short promotional and social videos, holding one design language across formats.',
    ],
  },
  {
    title: 'Digital Embroidery Designer',
    organisation: 'Juleee Embrotech Pvt Ltd (SS Creation)',
    points: [
      'Managed custom client orders from brief to production-ready output, balancing creative intent against cost and deadline.',
      'Advised clients on what was achievable within embroidery constraints, developing each design to their brief.',
      'Digitised in emCAD and tuned stitch density and direction so artwork translated cleanly to fabric without rework.',
    ],
  },
  {
    title: 'Graphic Designer',
    organisation: 'AV Digital Press',
    points: [
      'Handled client jobs from brief to final artwork, producing to specification and turning revisions around under tight deadlines.',
      'Prepared press-ready files — colour, bleed, margins, alignment — to cut reprints and reduce production cost.',
      'Designed layouts, invitations and print collateral in Photoshop and CorelDRAW, and coordinated concurrent studio projects.',
    ],
  },
];

export const education: Education[] = [
  {
    institution: 'NIFT-TEA College of Knitwear Fashion',
    qualification: 'B.Sc. Apparel & Fashion Design',
    period: '2019 — 2022',
  },
  {
    institution: 'KGS Matric Higher Secondary School',
    qualification: 'Higher Secondary (XII)',
    period: '2017 — 2018',
  },
  {
    institution: 'Jaivabai Municipal Girls Higher Secondary School',
    qualification: 'SSLC (X)',
    period: '2015 — 2016',
  },
];
