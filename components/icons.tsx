// Set de iconos de línea fina (stroke = currentColor) que no cubre lucide-react.
// Aceptan `size` igual que los iconos de lucide-react para poder mezclarlos
// sin distinción en el código que los consume.

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function svgProps({ size, width, height, ...rest }: IconProps) {
  return {
    ...base,
    width: size ?? width ?? 24,
    height: size ?? height ?? 24,
    ...rest,
  };
}

export function ChurchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...svgProps(props)}>
      <path d="M12 2v3" />
      <path d="M10.5 3.5h3" />
      <path d="M12 5 4 10v11h16V10z" />
      <path d="M12 10v3" />
      <path d="M10.5 11.5h3" />
      <path d="M9 21v-6a3 3 0 0 1 6 0v6" />
      <path d="M4 14h3" />
      <path d="M17 14h3" />
    </svg>
  );
}

export function VenueIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...svgProps(props)}>
      <path d="M3 21h18" />
      <path d="M5 21V10l7-5 7 5v11" />
      <path d="M9 21v-6h6v6" />
      <path d="M9 10h.01" />
      <path d="M12 10h.01" />
      <path d="M15 10h.01" />
    </svg>
  );
}

export function DinnerIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...svgProps(props)}>
      <path d="M7 3v7a2 2 0 0 0 4 0V3" />
      <path d="M9 10v11" />
      <path d="M17 3c-1.5 0-2.5 1.5-2.5 4s1 4 2.5 4" />
      <path d="M17 3v18" />
    </svg>
  );
}

export function FireworksIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...svgProps(props)}>
      <path d="M12 3v4" />
      <path d="M12 3 10 6" />
      <path d="M12 3l2 3" />
      <path d="M5 9l3 2" />
      <path d="M19 9l-3 2" />
      <circle cx="12" cy="14" r="1" />
      <path d="M12 14 8 18" />
      <path d="M12 14 16 18" />
      <path d="M12 14 12 20" />
      <path d="M12 14 6 14" />
      <path d="M12 14 18 14" />
    </svg>
  );
}

export function DressCodeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...svgProps(props)}>
      <path d="M5 5l2.5-1.5L9 6l1.5-2 1.5 1.5 1.5-1.5L15 6l1.5-2.5L19 5v3l-2 1v11H7V9L5 8z" />
      <path d="M9 6c0 1.7 1.3 3 3 3s3-1.3 3-3" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...svgProps(props)}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function BowTieIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...svgProps(props)}>
      <path d="M2 7l7 3.5v3L2 17V7z" />
      <path d="M22 7l-7 3.5v3l7 3.5V7z" />
      <circle cx="12" cy="12" r="1.6" />
    </svg>
  );
}
