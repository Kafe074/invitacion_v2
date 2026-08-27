"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

// El "toca para empezar" de la invitación: un corazón que late suavemente
// (equivalente a la estrella clickeable del árbol de referencia, pero
// como corazón, acorde a una boda).
export default function HeartStart({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.button
        type="button"
        onClick={onStart}
        aria-label="Tocar para comenzar"
        className="relative flex h-24 w-24 items-center justify-center rounded-full"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.18 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="absolute inset-0 rounded-full bg-white/25 blur-2xl" />
        <Heart
          size={68}
          className="relative fill-white text-white"
          style={{ filter: "drop-shadow(0 0 18px rgba(255,255,255,0.65))" }}
        />
      </motion.button>
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="text-xs tracking-widest-xl text-white/80"
      >
        Toca para comenzar
      </motion.p>
    </div>
  );
}
