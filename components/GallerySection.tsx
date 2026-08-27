import { Camera } from "lucide-react";
import FloralCorner from "./FloralCorner";
import Gallery from "./Gallery";
import RevealOnScroll from "./RevealOnScroll";
import { weddingData } from "@/data/weddingData";

export default function GallerySection() {
  const { gallery } = weddingData;

  return (
    <section className="relative overflow-hidden pb-10 pt-6 text-center lg:pb-16 lg:pt-10">
      <FloralCorner corner="tl" size={110} className="opacity-70" />
      <RevealOnScroll className="text-center">
        <p className="font-script text-4xl text-navy lg:text-6xl">
          Retratos de Nuestro Amor
        </p>
        <p className="mt-2 text-sm text-ink-soft lg:text-lg">
          Un minuto, un segundo, un instante que queda en la eternidad
        </p>
        <Camera size={26} className="mx-auto mb-6 mt-4 text-navy lg:size-8" />
      </RevealOnScroll>
      <Gallery photos={gallery} />
    </section>
  );
}
