import { MapPin } from "lucide-react";
import type { ElementType } from "react";
import AnimatedIconBadge from "./AnimatedIconBadge";
import RibbonHeading from "./RibbonHeading";
import { googleCalendarUrl } from "@/lib/calendar";
import { pillButton } from "@/lib/styles";

export default function VenueCard({
  icon: Icon,
  label,
  day,
  place,
  city,
  reference,
  mapsUrl,
  eventTitle,
  eventStart,
}: {
  icon: ElementType<{ width?: number; height?: number; className?: string }>;
  label: string;
  day: string;
  place: string;
  city?: string;
  reference?: string;
  mapsUrl: string;
  eventTitle: string;
  eventStart: Date;
}) {
  const calendarUrl = googleCalendarUrl({
    title: eventTitle,
    location: city ? `${place}, ${city}` : place,
    start: eventStart,
  });

  return (
    <div className="flex flex-col items-center text-center">
      <AnimatedIconBadge className="card-shadow flex h-24 w-24 items-center justify-center rounded-full bg-card lg:h-32 lg:w-32">
        <Icon width={34} height={34} className="text-navy lg:size-11" />
      </AnimatedIconBadge>

      <RibbonHeading className="mt-6 lg:mt-8 lg:px-11 lg:py-3 lg:text-3xl">{label}</RibbonHeading>

      <p className="mt-6 text-xs tracking-widest-xl text-navy-soft lg:mt-8 lg:text-sm">DÍA</p>
      <p className="mt-1 text-sm text-ink-soft lg:text-base">{day}</p>
      <a
        href={calendarUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-3 px-6 py-2 text-sm lg:px-7 lg:py-2.5 lg:text-base ${pillButton}`}
      >
        Agendar
      </a>

      <p className="mt-6 text-xs tracking-widest-xl text-navy-soft lg:mt-8 lg:text-sm">LUGAR</p>
      <p className="mt-1 text-sm text-ink-soft lg:text-base">
        {place}
        {city && (
          <>
            <br />
            {city}
          </>
        )}
      </p>
      {reference && (
        <p className="mt-1 max-w-[220px] text-xs text-ink-soft/80 lg:max-w-[260px] lg:text-sm">
          Referencia: {reference}
        </p>
      )}
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-3 inline-flex items-center gap-1.5 px-6 py-2 text-sm lg:px-7 lg:py-2.5 lg:text-base ${pillButton}`}
      >
        <MapPin size={14} />
        ¿Cómo Llegar?
      </a>
    </div>
  );
}
