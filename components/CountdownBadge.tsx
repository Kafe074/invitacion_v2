"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import FloralCorner from "./FloralCorner";
import RevealOnScroll from "./RevealOnScroll";
import { useCountdown } from "@/lib/useCountdown";

export default function CountdownBadge({ targetISO }: { targetISO: string }) {
  const time = useCountdown(targetISO);

  const units = [
    { label: "DÍAS", value: time?.days },
    { label: "HS", value: time?.hours },
    { label: "MIN", value: time?.minutes },
    { label: "SEG", value: time?.seconds },
  ];

  return (
    <RevealOnScroll className="relative mx-auto flex h-64 w-64 items-center justify-center lg:h-80 lg:w-80">
      <FloralCorner
        corner="tl"
        size={110}
        className="-translate-x-2 -translate-y-6 opacity-95"
      />
      <FloralCorner
        corner="tr"
        size={110}
        className="translate-x-2 -translate-y-6 opacity-95"
      />

      <div className="card-shadow flex h-56 w-56 flex-col items-center justify-center rounded-full border-2 border-navy bg-card p-2 lg:h-72 lg:w-72">
        <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-navy/40 px-4">
          <p className="font-script text-3xl text-navy lg:text-4xl">Falta</p>
          <div className="mt-1 flex items-center justify-center gap-2 lg:mt-2 lg:gap-3">
            {units.map((u, i) => (
              <span key={u.label} className="flex items-center gap-2 lg:gap-3">
                {i > 0 && <span className="h-6 w-px bg-navy/20 lg:h-8" />}
                <span className="flex flex-col items-center">
                  <span className="h-6 overflow-hidden lg:h-9">
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={u.value}
                        initial={{ y: -14, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 14, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="block font-serif text-xl text-navy tabular-nums lg:text-3xl"
                      >
                        {u.value === undefined ? "--" : u.value}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <span className="text-[9px] text-ink-soft lg:text-xs">{u.label}</span>
                </span>
              </span>
            ))}
          </div>
          <motion.div
            animate={{ scale: [1, 1.18, 1] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart size={16} className="mt-3 fill-sky-deeper text-sky-deeper lg:mt-4 lg:size-6" />
          </motion.div>
        </div>
      </div>
    </RevealOnScroll>
  );
}
