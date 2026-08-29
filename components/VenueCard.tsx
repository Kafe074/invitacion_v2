import { MapPin } from "lucide-react";
import type { ElementType } from "react";
import AnimatedIconBadge from "./AnimatedIconBadge";
import RibbonHeading from "./RibbonHeading";
import { googleCalendarUrl } from "@/lib/calendar";
import { pillButton } from "@/lib/styles";

export default function VenueCard({
  icons,
  label,
  day,
  place,
  city,
  reference,
  mapsUrl,
  eventTitle,
  eventStart,
}: {
  icons: ElementType<{ width?: number; height?: number; className?: string }>[];
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
      <div className="flex items-center gap-4">
        {icons.map((Icon, i) => (
          <AnimatedIconBadge
            key={i}
            className="card-shadow flex h-20 w-20 items-center justify-center rounded-full bg-card lg:h-28 lg:w-28"
          >
            <Icon width={30} height={30} className="text-navy lg:size-10" />
          </AnimatedIconBadge>
        ))}
      </div>

      <RibbonHeading className="mt-6 px-6 text-xl lg:mt-8 lg:px-11 lg:py-3 lg:text-3xl">
        {label}
      </RibbonHeading>

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
