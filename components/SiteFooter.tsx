import { weddingData } from "@/data/weddingData";

const LINKS = [
  { href: "#rsvp", label: "Confirmar asistencia" },
  { href: "#fiesta", label: "Sugerir canción" },
  { href: "#venues", label: "Agendar Celebración" },
  { href: "#venues", label: "Agendar Ceremonia" },
];

export default function SiteFooter() {
  const { couple } = weddingData;

  return (
    <footer className="flex flex-col items-center justify-between gap-6 px-8 py-16 text-center sm:flex-row sm:text-left lg:px-16 lg:py-20">
      <p className="font-script text-4xl text-navy lg:text-5xl">
        {couple.groomFirstName}{" "}
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-deep align-middle text-lg lg:h-10 lg:w-10 lg:text-xl">
          &amp;
        </span>{" "}
        {couple.brideFirstName}
      </p>
      <nav className="flex flex-col gap-2 lg:gap-3">
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm text-navy-soft transition-colors duration-150 hover:text-navy lg:text-base"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
