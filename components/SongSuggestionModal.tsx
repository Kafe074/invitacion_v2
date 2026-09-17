"use client";

import { Music } from "lucide-react";
import { useState } from "react";
import Modal from "./Modal";
import { weddingData } from "@/data/weddingData";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { pillButton } from "@/lib/styles";

export default function SongSuggestionModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");
  const [suggestedBy, setSuggestedBy] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const close = () => {
    onClose();
    if (submitted) {
      setSong("");
      setArtist("");
      setSuggestedBy("");
      setSubmitted(false);
    }
  };

  const submit = () => {
    if (!song.trim()) return;

    const lines = [`¡Hola! Quiero sugerir una canción para la playlist de la fiesta:`, song.trim()];
    if (artist.trim()) lines.push(`Artista: ${artist.trim()}`);
    if (suggestedBy.trim()) lines.push(`Sugerida por: ${suggestedBy.trim()}`);

    const link = buildWhatsAppLink(weddingData.rsvp.whatsappTarget, lines.join("\n"));
    window.open(link, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <Modal open={open} onClose={close} icon={Music} title="Sugerir Canción">
      {submitted ? (
        <div>
          <p>¡Gracias! Te abrimos WhatsApp con tu sugerencia lista — solo envíala.</p>
          <button
            type="button"
            onClick={close}
            className={`mt-6 px-6 py-2 text-sm ${pillButton}`}
          >
            Cerrar
          </button>
        </div>
      ) : (
        <div>
          <p>{weddingData.party.music.prompt}</p>
          <div className="mt-4 flex flex-col gap-3 text-left">
            <input
              type="text"
              value={song}
              onChange={(e) => setSong(e.target.value)}
              placeholder="Nombre de la canción *"
              className="rounded-full border border-navy/20 bg-sky/40 px-4 py-2 text-sm text-navy outline-none transition-colors focus:border-navy/50"
            />
            <input
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              placeholder="Artista (opcional)"
              className="rounded-full border border-navy/20 bg-sky/40 px-4 py-2 text-sm text-navy outline-none transition-colors focus:border-navy/50"
            />
            <input
              type="text"
              value={suggestedBy}
              onChange={(e) => setSuggestedBy(e.target.value)}
              placeholder="Tu nombre (opcional)"
              className="rounded-full border border-navy/20 bg-sky/40 px-4 py-2 text-sm text-navy outline-none transition-colors focus:border-navy/50"
            />
          </div>
          <button
            type="button"
            onClick={submit}
            disabled={!song.trim()}
            className={`mt-6 px-6 py-2 text-sm ${pillButton} disabled:pointer-events-none disabled:opacity-50`}
          >
            Sugerir Canción
          </button>
        </div>
      )}
    </Modal>
  );
}
