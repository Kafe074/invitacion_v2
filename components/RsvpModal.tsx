"use client";

import { Heart } from "lucide-react";
import { useMemo, useState } from "react";
import Modal from "./Modal";
import { useGuest } from "./GuestProvider";
import { getSupabaseBrowser } from "@/lib/supabase/browserClient";
import { pillButton, pillButtonOutline } from "@/lib/styles";

const EVENT_LABELS: Record<string, string> = {
  ceremonia: "¿Asistes a la Ceremonia?",
  celebracion: "¿Asistes a la Celebración?",
};

type Step = "names" | `attend-${string}` | "details";

export default function RsvpModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const guest = useGuest();
  const events = useMemo(
    () => guest?.invitedEvents ?? ["ceremonia", "celebracion"],
    [guest],
  );
  const steps = useMemo<Step[]>(
    () => ["names", ...events.map((e) => `attend-${e}` as Step), "details"],
    [events],
  );

  const [stepIndex, setStepIndex] = useState(0);
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [freeTextName, setFreeTextName] = useState("");
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [companions, setCompanions] = useState(0);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const step = steps[stepIndex];

  const reset = () => {
    setStepIndex(0);
    setSelectedNames([]);
    setFreeTextName("");
    setAttendance({});
    setCompanions(0);
    setNotes("");
    setSubmitted(false);
    setError(null);
  };

  const close = () => {
    onClose();
    if (submitted) reset();
  };

  const toggleName = (name: string) => {
    setSelectedNames((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    );
  };

  const canGoNext = () => {
    if (step === "names") {
      return guest ? selectedNames.length > 0 : freeTextName.trim().length > 0;
    }
    if (step.startsWith("attend-")) {
      const eventKey = step.replace("attend-", "");
      return attendance[eventKey] !== undefined;
    }
    return true;
  };

  const goNext = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  const goPrev = () => setStepIndex((i) => Math.max(i - 1, 0));

  const submit = async () => {
    setSubmitting(true);
    setError(null);
    const guestName = guest ? selectedNames.join(", ") : freeTextName.trim();

    try {
      const { error: insertError } = await getSupabaseBrowser()
        .from("rsvps")
        .insert({
          guest_id: guest?.id ?? null,
          guest_name: guestName,
          attending_ceremonia: attendance.ceremonia ?? null,
          attending_celebracion: attendance.celebracion ?? null,
          companions,
          notes: notes.trim() || null,
        });
      if (insertError) throw insertError;
      setSubmitted(true);
    } catch {
      setError("No pudimos guardar tu confirmación. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={close} icon={Heart} title="Confirmar Asistencia">
      {submitted ? (
        <div>
          <p>¡Gracias por confirmar! Te esperamos.</p>
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
          <div className="mb-5 flex items-center justify-center gap-1.5">
            {steps.map((s, i) => (
              <span
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === stepIndex
                    ? "w-6 bg-navy"
                    : i < stepIndex
                      ? "w-1.5 bg-navy/50"
                      : "w-1.5 bg-navy/20"
                }`}
              />
            ))}
          </div>

          {step === "names" && (
            <div>
              <p className="font-semibold text-navy">
                ¿Quién está confirmando? <span className="text-red-500">*</span>
              </p>
              <div className="mt-4 flex flex-col gap-2">
                {guest
                  ? guest.members.map((name) => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => toggleName(name)}
                        className={`rounded-full px-4 py-2 text-sm transition-all duration-150 hover:scale-105 active:scale-95 ${
                          selectedNames.includes(name)
                            ? "bg-navy text-white"
                            : "bg-sky-deep/40 text-navy hover:bg-sky-deep"
                        }`}
                      >
                        {name}
                      </button>
                    ))
                  : (
                      <input
                        type="text"
                        value={freeTextName}
                        onChange={(e) => setFreeTextName(e.target.value)}
                        placeholder="Tu nombre completo"
                        className="rounded-full border border-navy/20 bg-sky/40 px-4 py-2 text-sm text-navy outline-none transition-colors focus:border-navy/50"
                      />
                    )}
              </div>
            </div>
          )}

          {step.startsWith("attend-") && (
            <div>
              <p className="font-semibold text-navy">
                {EVENT_LABELS[step.replace("attend-", "")]}{" "}
                <span className="text-red-500">*</span>
              </p>
              <div className="mt-4 flex justify-center gap-3">
                {[
                  { label: "Sí, asistiré", value: true },
                  { label: "No asistiré", value: false },
                ].map((opt) => {
                  const eventKey = step.replace("attend-", "");
                  const selected = attendance[eventKey] === opt.value;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() =>
                        setAttendance((prev) => ({
                          ...prev,
                          [eventKey]: opt.value,
                        }))
                      }
                      className={`rounded-full px-5 py-2.5 text-sm transition-all duration-150 hover:scale-105 active:scale-95 ${
                        selected
                          ? "bg-navy text-white"
                          : "bg-sky-deep/40 text-navy hover:bg-sky-deep"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === "details" && (
            <div className="flex flex-col gap-4 text-left">
              {guest && guest.maxCompanions > 0 && (
                <label className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-navy">
                    Acompañantes adicionales
                  </span>
                  <input
                    type="number"
                    min={0}
                    max={guest.maxCompanions}
                    value={companions}
                    onChange={(e) => setCompanions(Number(e.target.value))}
                    className="rounded-full border border-navy/20 bg-sky/40 px-4 py-2 text-sm text-navy outline-none transition-colors focus:border-navy/50"
                  />
                </label>
              )}
              <label className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-navy">
                  Notas (alergias, alguna aclaración, etc.)
                </span>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="rounded-2xl border border-navy/20 bg-sky/40 px-4 py-2 text-sm text-navy outline-none transition-colors focus:border-navy/50"
                />
              </label>
            </div>
          )}

          {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={goPrev}
              disabled={stepIndex === 0}
              className={`px-5 py-2 text-sm ${pillButtonOutline} disabled:pointer-events-none disabled:opacity-0`}
            >
              ← Anterior
            </button>

            {step === "details" ? (
              <button
                type="button"
                onClick={submit}
                disabled={submitting}
                className={`px-6 py-2 text-sm ${pillButton} disabled:pointer-events-none disabled:opacity-60`}
              >
                {submitting ? "Enviando..." : "Confirmar"}
              </button>
            ) : (
              <button
                type="button"
                onClick={goNext}
                disabled={!canGoNext()}
                className={`px-6 py-2 text-sm ${pillButton} disabled:pointer-events-none disabled:opacity-50`}
              >
                Siguiente →
              </button>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
