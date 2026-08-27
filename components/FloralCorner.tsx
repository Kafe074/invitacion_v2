"use client";

// Decoración floral SVG (acuarela azul estilizada, dibujada a mano) para las
// esquinas de cada sección. Pétalos con forma orgánica (no elipses simples),
// gradientes radiales para el efecto de acuarela, hojas con vena central y
// salpicado de textura.

import { useId } from "react";
import { motion } from "framer-motion";

type Corner = "tl" | "tr" | "bl" | "br";

const CORNER_TRANSFORM: Record<Corner, string> = {
  tl: "",
  tr: "scale(-1,1)",
  bl: "scale(1,-1)",
  br: "scale(-1,-1)",
};

const CORNER_POSITION: Record<Corner, string> = {
  tl: "top-0 left-0",
  tr: "top-0 right-0",
  bl: "bottom-0 left-0",
  br: "bottom-0 right-0",
};

const CORNER_ORIGIN: Record<Corner, string> = {
  tl: "top left",
  tr: "top right",
  bl: "bottom left",
  br: "bottom right",
};

function Petal({
  length,
  width,
  fill,
  rotate,
  opacity = 0.92,
}: {
  length: number;
  width: number;
  fill: string;
  rotate: number;
  opacity?: number;
}) {
  const w = width / 2;
  const d = `M0,0 C ${-w},${-length * 0.34} ${-w * 0.72},${-length * 0.86} 0,${-length} C ${w * 0.72},${-length * 0.86} ${w},${-length * 0.34} 0,0 Z`;
  return (
    <path d={d} fill={fill} opacity={opacity} transform={`rotate(${rotate})`} />
  );
}

function Flower({
  cx,
  cy,
  r,
  rotate = 0,
  petals = 6,
  gradientId,
  centerColor,
  highlightColor,
}: {
  cx: number;
  cy: number;
  r: number;
  rotate?: number;
  petals?: number;
  gradientId: string;
  centerColor: string;
  highlightColor: string;
}) {
  const step = 360 / petals;
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rotate})`}>
      {/* capa trasera: pétalos completos, tono lavado */}
      {Array.from({ length: petals }).map((_, i) => (
        <Petal
          key={`back-${i}`}
          length={r}
          width={r * 0.62}
          fill={`url(#${gradientId})`}
          rotate={i * step}
          opacity={0.85}
        />
      ))}
      {/* capa delantera: pétalos algo más chicos, dan profundidad */}
      {Array.from({ length: petals }).map((_, i) => (
        <Petal
          key={`front-${i}`}
          length={r * 0.72}
          width={r * 0.4}
          fill={centerColor}
          rotate={i * step + step / 2}
          opacity={0.35}
        />
      ))}
      {/* centro: racimo de estambres */}
      {Array.from({ length: 7 }).map((_, i) => {
        const a = (i / 7) * Math.PI * 2;
        const rr = r * 0.1;
        return (
          <circle
            key={`stamen-${i}`}
            cx={Math.cos(a) * rr}
            cy={Math.sin(a) * rr}
            r={r * 0.045}
            fill={centerColor}
          />
        );
      })}
      <circle cx={0} cy={0} r={r * 0.05} fill={highlightColor} />
    </g>
  );
}

function Leaf({
  x,
  y,
  length,
  width,
  rotate,
  fill,
  opacity = 0.75,
}: {
  x: number;
  y: number;
  length: number;
  width: number;
  rotate: number;
  fill: string;
  opacity?: number;
}) {
  const w = width / 2;
  const d = `M0,0 C ${w},${-length * 0.25} ${w * 0.85},${-length * 0.75} 0,${-length} C ${-w * 0.85},${-length * 0.75} ${-w},${-length * 0.25} 0,0 Z`;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <path d={d} fill={fill} opacity={opacity} />
      <path
        d={`M0,-2 L0,${-length + 4}`}
        stroke="#4c6b49"
        strokeWidth={0.6}
        opacity={0.35}
        fill="none"
      />
    </g>
  );
}

export default function FloralCorner({
  corner = "tl",
  size = 120,
  scaleOnDesktop = true,
  className = "",
}: {
  corner?: Corner;
  size?: number;
  /** Si es true (default), se agranda ~1.5x en pantallas grandes (lg+). */
  scaleOnDesktop?: boolean;
  className?: string;
}) {
  const uid = useId();
  const gradA = `${uid}-a`;
  const gradB = `${uid}-b`;
  const gradC = `${uid}-c`;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute z-10 ${scaleOnDesktop ? "lg:scale-150" : ""} ${CORNER_POSITION[corner]} ${className}`}
      style={{ width: size, height: size, transformOrigin: CORNER_ORIGIN[corner] }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="h-full w-full"
      >
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        style={{ transform: CORNER_TRANSFORM[corner] }}
      >
        <defs>
          <radialGradient id={gradA} cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#a9c6e8" />
            <stop offset="60%" stopColor="#7ea0c9" />
            <stop offset="100%" stopColor="#4f6f9c" />
          </radialGradient>
          <radialGradient id={gradB} cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#cfe0f4" />
            <stop offset="60%" stopColor="#a9c6e8" />
            <stop offset="100%" stopColor="#7ea0c9" />
          </radialGradient>
          <radialGradient id={gradC} cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#8fb3dc" />
            <stop offset="60%" stopColor="#5f82ac" />
            <stop offset="100%" stopColor="#33507a" />
          </radialGradient>
        </defs>

        {/* tallos finos que conectan la composición */}
        <path
          d="M14 18 C 40 34, 55 52, 62 78 M 30 24 C 46 40, 60 58, 66 82"
          stroke="#6f8f6a"
          strokeWidth={1.1}
          opacity={0.4}
          fill="none"
          strokeLinecap="round"
        />

        {/* hojas, de atrás hacia adelante */}
        <Leaf x={10} y={10} length={40} width={16} rotate={-15} fill="#6f9169" opacity={0.55} />
        <Leaf x={16} y={26} length={46} width={19} rotate={18} fill="#83a67c" opacity={0.6} />
        <Leaf x={30} y={48} length={38} width={16} rotate={55} fill="#6f9169" opacity={0.55} />
        <Leaf x={12} y={54} length={34} width={14} rotate={-40} fill="#94b48c" opacity={0.6} />
        <Leaf x={44} y={68} length={30} width={13} rotate={80} fill="#83a67c" opacity={0.55} />
        <Leaf x={54} y={30} length={28} width={12} rotate={35} fill="#94b48c" opacity={0.5} />

        {/* flores, la principal más grande y las demás acompañando */}
        <Flower
          cx={34}
          cy={30}
          r={30}
          rotate={-10}
          petals={6}
          gradientId={gradA}
          centerColor="#26405f"
          highlightColor="#fdf7ea"
        />
        <Flower
          cx={64}
          cy={18}
          r={18}
          rotate={20}
          petals={5}
          gradientId={gradB}
          centerColor="#3f5e82"
          highlightColor="#fdf7ea"
        />
        <Flower
          cx={20}
          cy={62}
          r={20}
          rotate={40}
          petals={5}
          gradientId={gradC}
          centerColor="#1f3450"
          highlightColor="#fdf7ea"
        />
        <Flower
          cx={52}
          cy={54}
          r={12}
          rotate={-25}
          petals={5}
          gradientId={gradB}
          centerColor="#3f5e82"
          highlightColor="#fdf7ea"
        />

        {/* capullo pequeño */}
        <g transform="translate(46 78) rotate(20)">
          <ellipse cx={0} cy={0} rx={4} ry={6.5} fill="#5f82ac" opacity={0.8} />
          <path d="M0,-6.5 C -3,-3 -3,3 0,6.5" stroke="#33507a" strokeWidth={0.6} opacity={0.5} fill="none" />
        </g>

        {/* salpicado sutil de acuarela */}
        {[
          [8, 42], [22, 8], [46, 6], [70, 40], [58, 66], [12, 76], [36, 70], [64, 58],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.6 : 1} fill="#5f82ac" opacity={0.3} />
        ))}
      </svg>
      </motion.div>
    </div>
  );
}
