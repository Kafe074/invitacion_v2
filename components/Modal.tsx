"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { ElementType, ReactNode } from "react";
import FloralCorner from "./FloralCorner";
import { iconButton } from "@/lib/styles";

export default function Modal({
  open,
  onClose,
  icon: Icon,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  icon?: ElementType<{ width?: number; height?: number; className?: string }>;
  title: string;
  children: ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/50 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="card-shadow relative w-full max-w-md rounded-3xl bg-card pb-8 pt-14 text-center lg:max-w-lg lg:pb-10 lg:pt-16"
            onClick={(e) => e.stopPropagation()}
          >
            <FloralCorner corner="tl" size={110} scaleOnDesktop={false} className="-translate-x-3 -translate-y-10" />
            <FloralCorner corner="tr" size={110} scaleOnDesktop={false} className="translate-x-3 -translate-y-10" />

            {Icon && (
              <div className="card-shadow relative z-10 mx-auto -mt-2 flex h-20 w-20 items-center justify-center rounded-full bg-card lg:h-24 lg:w-24">
                <Icon width={30} height={30} className="text-navy lg:size-9" />
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className={`absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-pill text-pill-dark ${iconButton}`}
            >
              <X size={16} />
            </button>

            <h3 className="relative z-10 mt-4 font-script text-3xl text-navy lg:text-4xl">
              {title}
            </h3>
            <div className="relative z-10 mt-4 px-6 text-sm text-ink-soft lg:px-8 lg:text-base">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
