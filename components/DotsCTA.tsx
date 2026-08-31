import Image from "next/image";
import { Camera } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import { AppleIcon, GooglePlayIcon } from "./icons";
import { pillButton } from "@/lib/styles";
import { weddingData } from "@/data/weddingData";

export default function DotsCTA() {
  const { photoShare, photos, couple } = weddingData;

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
        <Camera size={28} className="mx-auto mt-6 text-white lg:size-9" />
        <p className="mx-auto mt-3 max-w-sm text-sm text-white/85 lg:max-w-lg lg:text-lg">
          {photoShare.message}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={photoShare.iosUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 text-sm lg:px-8 lg:py-4 lg:text-base ${pillButton}`}
          >
            <AppleIcon size={18} />
            App Store
          </a>
          <a
            href={photoShare.androidUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 text-sm lg:px-8 lg:py-4 lg:text-base ${pillButton}`}
          >
            <GooglePlayIcon size={18} />
            Google Play
          </a>
        </div>
      </RevealOnScroll>

      <span className="sr-only">
        {couple.brideFirstName} y {couple.groomFirstName}
      </span>
    </section>
  );
}
