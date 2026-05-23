import type { SVGProps } from "react";

type SimpleIcon = {
  title: string;
  slug: string;
  path: string;
  hex: string;
};

type TechIconProps = SVGProps<SVGSVGElement> & {
  icon: SimpleIcon;
};

/**
 * Renders a simple-icons brand mark as a monochrome SVG.
 * Color comes from `currentColor` so the icon inherits the surrounding text color —
 * matches the editorial restraint (no per-brand color, no glow).
 */
export function TechIcon({ icon, className, ...props }: TechIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      <path d={icon.path} />
    </svg>
  );
}
