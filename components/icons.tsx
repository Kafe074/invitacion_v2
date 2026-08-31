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

export function AppleIcon({ size, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size ?? rest.width ?? 24}
      height={size ?? rest.height ?? 24}
      fill="currentColor"
      stroke="none"
      {...rest}
    >
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zm3.532-3.229c.843-1.012 1.41-2.42 1.254-3.821-1.213.052-2.688.805-3.554 1.818-.78.896-1.462 2.326-1.28 3.703 1.345.104 2.735-.688 3.58-1.7z" />
    </svg>
  );
}

export function GooglePlayIcon({ size, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size ?? rest.width ?? 24}
      height={size ?? rest.height ?? 24}
      fill="currentColor"
      stroke="none"
      {...rest}
    >
      <path d="M3.609 1.814L13.792 12 3.61 22.186a1.5 1.5 0 0 1-.61-1.207V3.021a1.5 1.5 0 0 1 .61-1.207zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1.5 1.5 0 0 1 0 2.53l-2.808 1.626L15.088 12l2.61-2.491zm-3.199-3.198l-8.635-8.635 10.937 6.333-2.302 2.302z" />
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
