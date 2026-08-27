"use client";

import { useState } from "react";
import FloralCorner from "./FloralCorner";
import RevealOnScroll from "./RevealOnScroll";
import RsvpModal from "./RsvpModal";
import { pillButton } from "@/lib/styles";
import { weddingData } from "@/data/weddingData";

export default function RsvpSection() {
  const [open, setOpen] = useState(false);
  const { rsvp } = weddingData;

  return (
    <section id="rsvp" className="relative overflow-hidden px-6 py-10 text-center lg:py-16">
      <FloralCorner corner="tr" size={110} className="opacity-70" />
      <RevealOnScroll>
        <p className="font-script text-4xl text-navy lg:text-6xl">{rsvp.title}</p>
        <p className="mt-2 text-sm text-ink-soft lg:text-lg">{rsvp.message}</p>
        <p className="mt-1 text-xs tracking-widest-xl text-navy-soft lg:text-sm">
          {rsvp.deadline}
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`card-shadow mt-6 px-8 py-3 text-sm lg:px-10 lg:py-4 lg:text-base ${pillButton}`}
        >
          Confirmar Asistencia
        </button>
        <div className="mt-5 flex flex-col items-center gap-1">
          {rsvp.contacts.map((phone) => (
            <a
              key={phone}
              href={`https://wa.me/51${phone.replace(/\s+/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-navy-soft transition-colors duration-150 hover:text-navy lg:text-base"
            >
              WhatsApp: {phone}
            </a>
          ))}
        </div>
      </RevealOnScroll>

      <RsvpModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
