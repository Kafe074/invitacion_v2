import RevealOnScroll from "./RevealOnScroll";
import { weddingData } from "@/data/weddingData";

export default function SiteFooter() {
  const { couple, closingVerse } = weddingData;

  return (
    <footer className="flex flex-col items-center gap-6 px-8 py-16 text-center lg:py-20">
      <RevealOnScroll className="flex flex-col items-center gap-6">
        <p className="font-script text-4xl text-navy lg:text-5xl">
          {couple.groomFirstName}{" "}
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-deep align-middle text-lg lg:h-10 lg:w-10 lg:text-xl">
            &amp;
          </span>{" "}
          {couple.brideFirstName}
        </p>

        <div className="max-w-xs text-navy-soft lg:max-w-sm">
          <p className="text-sm italic leading-relaxed lg:text-base">{closingVerse.text}</p>
          {closingVerse.reference && (
            <p className="mt-2 text-xs tracking-widest-xl text-navy-soft/80 lg:text-sm">
              {closingVerse.reference}
            </p>
          )}
        </div>
      </RevealOnScroll>
    </footer>
  );
}
