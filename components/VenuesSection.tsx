import { PartyPopper } from "lucide-react";
import FloralCorner from "./FloralCorner";
import RevealOnScroll from "./RevealOnScroll";
import VenueCard from "./VenueCard";
import { ChurchIcon } from "./icons";
import { weddingData } from "@/data/weddingData";

export default function VenuesSection() {
  const { venue, couple } = weddingData;

  return (
    <section id="venues" className="relative overflow-hidden px-6 pb-14 pt-2 lg:pb-24">
      <FloralCorner corner="br" size={110} className="opacity-70" />
      <div className="mx-auto max-w-md lg:max-w-lg">
        <RevealOnScroll>
          <VenueCard
            icons={[ChurchIcon, PartyPopper]}
            label="Ceremonia y Celebración"
            day={venue.day}
            place={venue.place}
            city={venue.city}
            reference={venue.reference}
            mapsUrl={venue.mapsUrl}
            eventTitle={`Boda de ${couple.brideFirstName} y ${couple.groomFirstName}`}
            eventStart={new Date(venue.startISO)}
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}
