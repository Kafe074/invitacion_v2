// Divisor de sección en forma de "ola", como en la referencia de Fixdate.

export default function WaveDivider({
  color = "var(--color-sky-deep)",
  height = 90,
  flip = false,
  className = "",
}: {
  color?: string;
  height?: number;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none w-full overflow-hidden leading-[0] ${
        flip ? "-scale-y-100" : ""
      } ${className}`}
      style={{ height }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        width="100%"
        height={height}
      >
        <path
          d="M0,40 C240,100 480,0 720,40 C960,80 1200,20 1440,60 L1440,120 L0,120 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
