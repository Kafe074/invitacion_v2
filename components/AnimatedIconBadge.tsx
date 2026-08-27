"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Envuelve un ícono ya renderizado (JSX, no el componente en sí) para poder
// animarlo al hacer hover sin forzar a los componentes padres a ser
// Client Components solo por pasar un tipo de componente como prop.
export default function AnimatedIconBadge({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.12, rotate: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
