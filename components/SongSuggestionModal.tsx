"use client";

import { Music } from "lucide-react";
import { useState } from "react";
import Modal from "./Modal";
import { weddingData } from "@/data/weddingData";
import { getSupabaseBrowser } from "@/lib/supabase/browserClient";
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
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const close = () => {
    onClose();
    if (submitted) {
      setSong("");
      setArtist("");
      setSuggestedBy("");
      setSubmitted(false);
    }
  };

  const submit = async () => {
    if (!song.trim()) return;
    setSubmitting(true);
    setError(null);

    try {
      const { error: insertError } = await getSupabaseBrowser()
        .from("song_suggestions")
        .insert({
          song: song.trim(),
          artist: artist.trim() || null,
          suggested_by: suggestedBy.trim() || null,
        });
      if (insertError) throw insertError;
      setSubmitted(true);
    } catch {
      setError("No pudimos guardar la canción. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={close} icon={Music} title="Sugerir Canción">
      {submitted ? (
        <div>
          <p>¡Gracias! La agregamos a la playlist de la fiesta.</p>
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
          {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
          <button
            type="button"
            onClick={submit}
            disabled={submitting || !song.trim()}
            className={`mt-6 px-6 py-2 text-sm ${pillButton} disabled:pointer-events-none disabled:opacity-50`}
          >
            {submitting ? "Enviando..." : "Sugerir Canción"}
          </button>
        </div>
      )}
    </Modal>
  );
}
