/**
 * Stroke-consistent SVG icon set. Replaces the emoji (🎵 ✈️ 🎬 🎨 👋) the old
 * build used as structural icons — emoji render differently per platform and
 * cannot be themed or aligned reliably.
 *
 * All paths are drawn on a 24px grid at 1.5 stroke width.
 */

export type IconName =
  | 'mail'
  | 'phone'
  | 'pin'
  | 'arrow-up-right'
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-right'
  | 'close'
  | 'menu'
  | 'sun'
  | 'moon';

const paths: Record<IconName, React.ReactNode> = {
  mail: (
    <>
      <path d="M3 7.5A1.5 1.5 0 0 1 4.5 6h15A1.5 1.5 0 0 1 21 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 16.5v-9Z" />
      <path d="m3.5 7.5 8.5 6 8.5-6" />
    </>
  ),
  phone: (
    <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h2.2a1 1 0 0 1 .96.72l1 3.2a1 1 0 0 1-.45 1.14l-1.5.9a11.5 11.5 0 0 0 5.33 5.33l.9-1.5a1 1 0 0 1 1.14-.45l3.2 1a1 1 0 0 1 .72.96v2.2A1.5 1.5 0 0 1 18.5 19h-.5C10.82 19 5 13.18 5 6v-.5Z" />
  ),
  pin: (
    <>
      <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  'arrow-up-right': (
    <>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </>
  ),
  'arrow-down': (
    <>
      <path d="M12 5v14" />
      <path d="m5.5 13 6.5 6.5 6.5-6.5" />
    </>
  ),
  'arrow-left': (
    <>
      <path d="M19 12H5" />
      <path d="m11 6-6 6 6 6" />
    </>
  ),
  'arrow-right': (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  close: (
    <>
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </>
  ),
  menu: (
    <>
      <path d="M4 8h16" />
      <path d="M4 16h16" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  moon: <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />,
};

interface IconProps {
  name: IconName;
  className?: string;
}

/**
 * Decorative by default (aria-hidden). When an icon is the *only* content of a
 * control, label the control itself — never the icon.
 */
export function Icon({ name, className = 'h-5 w-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
