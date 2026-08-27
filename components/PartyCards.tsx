"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardCheck, Music } from "lucide-react";
import FloralCorner from "./FloralCorner";
import Modal from "./Modal";
import RevealOnScroll from "./RevealOnScroll";
import SongSuggestionModal from "./SongSuggestionModal";
import { BowTieIcon } from "./icons";
import { pillButton } from "@/lib/styles";
import { weddingData } from "@/data/weddingData";

type OpenModal = "music" | "dressCode" | "tips" | null;

export default function PartyCards() {
  const [openModal, setOpenModal] = useState<OpenModal>(null);
  const { party, dressCode } = weddingData;

  const cards = [
    {
      key: "music" as const,
      icon: Music,
      title: "MÚSICA",
      description: party.music.prompt,
      cta: "Sugerir Canción",
    },
    {
      key: "dressCode" as const,
      icon: BowTieIcon,
      title: "DRESS CODE",
      description: dressCode.subtitle,
      cta: "Ver Más",
    },
    {
      key: "tips" as const,
      icon: ClipboardCheck,
      title: "TIPS Y NOTAS",
      description: party.tips.prompt,
      cta: "+ Info",
    },
  ];

  return (
    <section className="relative overflow-hidden px-6 py-12 text-center lg:py-20">
      <RevealOnScroll>
        <p className="font-script text-4xl text-navy lg:text-6xl">Fiesta</p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-ink-soft lg:max-w-lg lg:text-lg">
          {party.subtitle}
        </p>
      </RevealOnScroll>

      <div className="relative mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-3 lg:mt-16 lg:gap-10">
        <FloralCorner
          corner="tl"
          size={130}
          className="hidden -translate-x-6 -translate-y-6 sm:block"
        />
        <FloralCorner
          corner="br"
          size={130}
          className="hidden translate-x-6 translate-y-6 sm:block"
        />
        {cards.map((card, i) => (
          <RevealOnScroll key={card.key} delay={i * 0.1}>
            <div className="card-shadow relative z-10 flex h-full flex-col items-center rounded-2xl bg-card px-6 py-8 lg:px-8 lg:py-10">
              <h4 className="text-sm font-bold tracking-wide text-navy lg:text-base">
                {card.title}
              </h4>
              <motion.div
                whileHover={{ scale: 1.15, rotate: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="mt-4"
              >
                <card.icon size={36} className="text-navy lg:size-11" />
              </motion.div>
              <p className="mt-4 text-sm text-ink-soft lg:text-base">{card.description}</p>
              <button
                type="button"
                onClick={() => setOpenModal(card.key)}
                className={`mt-6 px-6 py-2 text-sm lg:px-7 lg:py-2.5 lg:text-base ${pillButton}`}
              >
                {card.cta}
              </button>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      <SongSuggestionModal
        open={openModal === "music"}
        onClose={() => setOpenModal(null)}
      />

      <Modal
        open={openModal === "dressCode"}
        onClose={() => setOpenModal(null)}
        icon={BowTieIcon}
        title="Dress Code"
      >
        <p>{dressCode.ladies}</p>
        <p>{dressCode.gentlemen}</p>
      </Modal>

      <Modal
        open={openModal === "tips"}
        onClose={() => setOpenModal(null)}
        icon={ClipboardCheck}
        title="Tips y Notas"
      >
        <p>{party.tips.detail}</p>
      </Modal>
    </section>
  );
}
