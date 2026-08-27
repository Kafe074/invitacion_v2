import RevealOnScroll from "./RevealOnScroll";
import { weddingData } from "@/data/weddingData";

export default function PadrinosSection() {
  const { padrinos } = weddingData.family;
  if (padrinos.length === 0) return null;

  return (
    <section className="px-6 py-10 text-center lg:py-14">
      <RevealOnScroll>
        <p className="font-script text-4xl text-navy lg:text-6xl">Padrinos</p>
        <div className="mx-auto mt-4 flex flex-col items-center gap-2">
          {padrinos.map((name) => (
            <span
              key={name}
              className="rounded-full bg-sky-deep/40 px-4 py-1.5 text-sm text-navy lg:px-5 lg:py-2 lg:text-base"
            >
              {name}
            </span>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
