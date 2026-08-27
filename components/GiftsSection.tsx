"use client";

import { Gift } from "lucide-react";
import { useState } from "react";
import FloralCorner from "./FloralCorner";
import Modal from "./Modal";
import RevealOnScroll from "./RevealOnScroll";
import { pillButton } from "@/lib/styles";
import { weddingData } from "@/data/weddingData";

export default function GiftsSection() {
  const [open, setOpen] = useState(false);
  const { gifts } = weddingData;

  return (
    <section className="relative overflow-hidden px-6 py-12 text-center lg:py-20">
      <FloralCorner corner="tl" size={110} className="opacity-70" />
      <RevealOnScroll>
        <p className="font-script text-4xl text-navy lg:text-6xl">Regalos</p>
        <p className="mt-2 text-sm text-ink-soft lg:text-lg">{gifts.message}</p>
        <Gift size={30} className="mx-auto mt-4 text-navy lg:size-10" />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`mt-6 px-8 py-3 text-sm lg:px-10 lg:py-4 lg:text-base ${pillButton}`}
        >
          Ver Más
        </button>
      </RevealOnScroll>

      <Modal open={open} onClose={() => setOpen(false)} icon={Gift} title="Regalos">
        <p>{gifts.envelopeShower}</p>
        <div className="mt-4 rounded-2xl border border-navy/15 px-4 py-3 text-left">
          <p className="text-xs tracking-widest-xl text-navy-soft">
            {gifts.transfer.label}
          </p>
          <p className="mt-2">{gifts.transfer.account}</p>
          <p>{gifts.transfer.routing}</p>
        </div>
      </Modal>
    </section>
  );
}
