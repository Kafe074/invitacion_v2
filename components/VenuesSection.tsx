import { PartyPopper } from "lucide-react";
import FloralCorner from "./FloralCorner";
import RevealOnScroll from "./RevealOnScroll";
import VenueCard from "./VenueCard";
import { ChurchIcon } from "./icons";
import { weddingData } from "@/data/weddingData";

export default function VenuesSection() {
  const { ceremony, reception, couple } = weddingData;

  return (
    <section id="venues" className="relative overflow-hidden px-6 pb-14 pt-2 lg:pb-24">
      <FloralCorner corner="br" size={110} className="opacity-70" />
      <div className="mx-auto grid max-w-3xl gap-16 sm:grid-cols-2 lg:max-w-5xl lg:gap-24">
        <RevealOnScroll>
          <VenueCard
            icon={ChurchIcon}
            label="Ceremonia"
            day={ceremony.day}
            place={ceremony.place}
            city={ceremony.city}
            reference={ceremony.reference}
            mapsUrl={ceremony.mapsUrl}
            eventTitle={`Ceremonia de ${couple.brideFirstName} y ${couple.groomFirstName}`}
            eventStart={new Date(ceremony.startISO)}
          />
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <VenueCard
            icon={PartyPopper}
            label="Celebración"
            day={reception.day}
            place={reception.place}
            city={reception.city}
            reference={reception.reference}
            mapsUrl={reception.mapsUrl}
            eventTitle={`Celebración de ${couple.brideFirstName} y ${couple.groomFirstName}`}
            eventStart={new Date(reception.startISO)}
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}
