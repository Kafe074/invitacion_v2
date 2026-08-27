import Image from "next/image";
import FloralCorner from "./FloralCorner";
import RevealOnScroll from "./RevealOnScroll";
import { weddingData } from "@/data/weddingData";

function formatDateBadge(iso: string) {
  const [datePart] = iso.split("T");
  const [year, month, day] = datePart.split("-");
  return `${day}.${month}.${year}`;
}

export default function HeroSplit() {
  const { couple, quote, weddingDateISO, photos } = weddingData;

  return (
    <section className="relative flex flex-col lg:min-h-screen lg:flex-row">
      <div className="relative aspect-[4/5] w-full overflow-hidden lg:aspect-auto lg:w-1/2 lg:rounded-tr-[45%] lg:rounded-br-[45%]">
        <Image
          src={photos.hero}
          alt={`${couple.brideFirstName} y ${couple.groomFirstName}`}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="relative flex w-full flex-col items-center justify-center gap-4 overflow-hidden bg-sky px-8 py-16 text-center lg:w-1/2 lg:py-24">
        <FloralCorner corner="tl" size={140} className="opacity-90" />
        <FloralCorner corner="tr" size={140} className="opacity-90" />
        <FloralCorner corner="bl" size={120} className="opacity-80" />

        <RevealOnScroll className="flex flex-col items-center gap-4 lg:gap-6">
          <span className="mt-12 rounded-full border border-navy/25 px-4 py-1 text-sm tracking-wide text-navy lg:mt-4 lg:px-5 lg:py-1.5 lg:text-base">
            {formatDateBadge(weddingDateISO)}
          </span>

          <p className="font-script text-6xl leading-tight text-navy lg:text-8xl">
            {couple.groomFirstName}
          </p>
          <div className="relative flex w-40 items-center justify-center lg:w-52">
            <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-navy/20" />
            <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-sky-deep font-script text-xl text-navy lg:h-14 lg:w-14 lg:text-2xl">
              &amp;
            </span>
          </div>
          <p className="font-script text-6xl leading-tight text-navy lg:text-8xl">
            {couple.brideFirstName}
          </p>

          <div className="mt-6 max-w-xs text-navy-soft lg:max-w-sm">
            <p className="font-serif text-3xl leading-none text-sky-deeper lg:text-4xl">&ldquo;</p>
            <p className="text-sm italic leading-relaxed lg:text-lg">{quote.text}</p>
            {quote.reference && (
              <p className="mt-2 text-xs tracking-widest-xl text-navy-soft/80 lg:text-sm">
                {quote.reference}
              </p>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
