import Image from "next/image";
import { InstagramIcon } from "./icons";
import RevealOnScroll from "./RevealOnScroll";
import { pillButton } from "@/lib/styles";
import { weddingData } from "@/data/weddingData";

export default function InstagramCTA() {
  const { instagram, photos, couple } = weddingData;
  const tagUrl = `https://www.instagram.com/explore/tags/${instagram.hashtag}/`;

  return (
    <section className="relative overflow-hidden px-6 py-16 text-center lg:py-28">
      <Image
        src={photos.instagram}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-navy/55" />

      <RevealOnScroll className="relative z-10">
        <p className="font-script text-4xl text-white lg:text-6xl">
          Compartimos este día junto a ti
        </p>
        <p className="mt-2 text-sm text-white/85 lg:text-lg">
          Comparte tus fotos y videos de este hermoso día
        </p>
        <InstagramIcon width={28} height={28} className="mx-auto mt-6 text-white lg:size-9" />
        <p className="mt-3 text-3xl font-extrabold text-white lg:text-5xl">
          #{instagram.hashtag}
        </p>
        <a
          href={tagUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-6 inline-block px-6 py-2 text-sm lg:px-8 lg:py-3 lg:text-base ${pillButton}`}
        >
          Ver En Instagram
        </a>
      </RevealOnScroll>

      <span className="sr-only">
        {couple.brideFirstName} y {couple.groomFirstName}
      </span>
    </section>
  );
}
