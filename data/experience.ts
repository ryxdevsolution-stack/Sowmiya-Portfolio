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
  /** Kept to three lines maximum — a portfolio is not a CV dump. */
  points: string[];
}

export interface Education {
  institution: string;
  qualification: string;
  period: string;
}

export const roles: Role[] = [
  {
    title: 'Digital Embroidery Designer',
    organisation: 'Juleee Embrotech Pvt Ltd (SS Creation)',
    points: [
      'Digitised embroidery artwork in emCAD for machine production runs.',
      'Worked directly with the production floor so designs were feasible before they were signed off.',
      'Held design quality against stitch-level tolerances and delivery deadlines.',
    ],
  },
  {
    title: 'Graphic Designer',
    organisation: 'AV Digital Press',
    points: [
      'Produced press-ready layouts, invitation suites and commercial artwork.',
      'Built artwork in Photoshop and CorelDRAW to print specification, not screen approximation.',
      'Ran several client projects in parallel against fixed press schedules.',
    ],
  },
];

export const education: Education[] = [
  {
    institution: 'Bharathiyar NIFT-TEA College of Knitwear Fashion',
    qualification: 'Fashion Design',
    period: '2020 — 2023',
  },
  {
    institution: 'KGS Matric Higher Secondary School',
    qualification: 'Higher Secondary (XII)',
    period: '2017 — 2018',
  },
];
