"use client";

import RevealOnScroll from "./RevealOnScroll";
import { useGuest } from "./GuestProvider";
import { weddingData } from "@/data/weddingData";

export default function GuestBlock() {
  const guest = useGuest();
  if (!guest) return null;

  return (
    <section className="px-6 py-10 text-center lg:py-14">
      <RevealOnScroll>
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-navy text-lg font-bold text-white lg:h-14 lg:w-14 lg:text-xl">
          {guest.members.length}
        </span>
        <h3 className="mt-3 font-serif text-2xl uppercase tracking-wide text-navy lg:mt-4 lg:text-3xl">
          Invitados
        </h3>
        <div className="mt-4 flex flex-col items-center gap-2">
          {guest.members.map((name) => (
            <span
              key={name}
              className="rounded-full bg-sky-deep/40 px-4 py-1.5 text-sm text-navy lg:px-5 lg:py-2 lg:text-base"
            >
              {name}
            </span>
          ))}
        </div>
        <p className="mx-auto mt-5 max-w-xs text-sm text-ink-soft lg:max-w-sm lg:text-base">
          Nos encanta compartir este momento con vos. ¡Te esperamos!
        </p>
        <p className="mx-auto mt-3 max-w-xs text-xs italic text-ink-soft/80 lg:max-w-sm lg:text-sm">
          {weddingData.notes.personalInvite}
        </p>
      </RevealOnScroll>
    </section>
  );
}
