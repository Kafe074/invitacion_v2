"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function Gallery({ photos }: { photos: string[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const itemWidth = track.scrollWidth / photos.length;
    setActive(Math.round(track.scrollLeft / itemWidth));
  };

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const itemWidth = track.scrollWidth / photos.length;
    track.scrollTo({ left: itemWidth * index, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 lg:justify-center lg:gap-8 lg:px-10"
      >
        {photos.map((src, i) => (
          <div
            key={src + i}
            className={`relative aspect-[4/5] w-56 shrink-0 snap-center overflow-hidden rounded-2xl transition-all sm:w-64 lg:w-80 ${
              i === active ? "card-shadow ring-4 ring-sky-deep" : "opacity-80"
            }`}
          >
            <Image
              src={src}
              alt="Recuerdo de la pareja"
              fill
              sizes="(min-width: 1024px) 320px, 256px"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="mt-2 flex justify-center gap-2">
        {photos.map((src, i) => (
          <button
            key={src + i}
            type="button"
            aria-label={`Ver foto ${i + 1}`}
            onClick={() => scrollToIndex(i)}
            className={`h-2 w-2 rounded-full ${
              i === active ? "bg-sky-deeper" : "bg-sky-deep/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
