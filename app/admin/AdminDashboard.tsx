"use client";

type Guest = {
  id: string;
  slug: string;
  household_name: string;
  members: string[];
  invited_events: string[];
  max_companions: number;
};

type Rsvp = {
  id: string;
  guest_name: string;
  attending_ceremonia: boolean | null;
  attending_celebracion: boolean | null;
  companions: number;
  notes: string | null;
  created_at: string;
};

type SongSuggestion = {
  id: string;
  song: string;
  artist: string | null;
  suggested_by: string | null;
  created_at: string;
};

function yesNo(value: boolean | null) {
  if (value === null) return "—";
  return value ? "Sí" : "No";
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("es-BO", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function AdminDashboard({
  guests,
  rsvps,
  songs,
  addGuestAction,
  deleteGuestAction,
  logoutAction,
}: {
  guests: Guest[];
  rsvps: Rsvp[];
  songs: SongSuggestion[];
  addGuestAction: (formData: FormData) => void | Promise<void>;
  deleteGuestAction: (formData: FormData) => void | Promise<void>;
  logoutAction: () => void | Promise<void>;
}) {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="font-script text-4xl text-navy">Panel Admin</h1>
        <form action={logoutAction}>
          <button
            type="submit"
            className="rounded-full border border-navy/30 px-4 py-1.5 text-sm text-navy"
          >
            Cerrar sesión
          </button>
        </form>
      </div>

      <section className="card-shadow mt-10 rounded-2xl bg-card p-6">
        <h2 className="text-lg font-bold text-navy">Agregar invitado</h2>
        <form action={addGuestAction} className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm text-navy">
            Nombre del grupo/familia
            <input
              type="text"
              name="householdName"
              required
              className="rounded-full border border-navy/20 px-4 py-2 text-sm outline-none focus:border-navy/50"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-navy">
            Acompañantes adicionales permitidos
            <input
              type="number"
              name="maxCompanions"
              defaultValue={0}
              min={0}
              className="rounded-full border border-navy/20 px-4 py-2 text-sm outline-none focus:border-navy/50"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-navy sm:col-span-2">
            Nombres de los invitados (uno por línea)
            <textarea
              name="members"
              required
              rows={3}
              className="rounded-2xl border border-navy/20 px-4 py-2 text-sm outline-none focus:border-navy/50"
            />
          </label>
          <div className="flex gap-4 text-sm text-navy sm:col-span-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="invitedEvents"
                value="ceremonia"
                defaultChecked
              />
              Ceremonia
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="invitedEvents"
                value="celebracion"
                defaultChecked
              />
              Celebración
            </label>
          </div>
          <button
            type="submit"
            className="rounded-full bg-pill px-6 py-2 text-sm font-semibold text-pill-dark sm:col-span-2 sm:w-fit"
          >
            Agregar
          </button>
        </form>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-navy">
          Invitados ({guests.length})
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="text-navy-soft">
                <th className="pb-2">Grupo</th>
                <th className="pb-2">Nombres</th>
                <th className="pb-2">Link</th>
                <th className="pb-2">Eventos</th>
                <th className="pb-2" />
              </tr>
            </thead>
            <tbody>
              {guests.map((guest) => (
                <tr key={guest.id} className="border-t border-navy/10">
                  <td className="py-2 pr-4">{guest.household_name}</td>
                  <td className="py-2 pr-4">{guest.members.join(", ")}</td>
                  <td className="py-2 pr-4 font-mono text-xs">
                    /i/{guest.slug}
                  </td>
                  <td className="py-2 pr-4">{guest.invited_events.join(", ")}</td>
                  <td className="py-2">
                    <form action={deleteGuestAction}>
                      <input type="hidden" name="id" value={guest.id} />
                      <button type="submit" className="text-red-500">
                        Eliminar
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-navy">RSVPs ({rsvps.length})</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="text-navy-soft">
                <th className="pb-2">Nombre</th>
                <th className="pb-2">Ceremonia</th>
                <th className="pb-2">Celebración</th>
                <th className="pb-2">Acomp.</th>
                <th className="pb-2">Notas</th>
                <th className="pb-2">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {rsvps.map((r) => (
                <tr key={r.id} className="border-t border-navy/10">
                  <td className="py-2 pr-4">{r.guest_name}</td>
                  <td className="py-2 pr-4">{yesNo(r.attending_ceremonia)}</td>
                  <td className="py-2 pr-4">{yesNo(r.attending_celebracion)}</td>
                  <td className="py-2 pr-4">{r.companions}</td>
                  <td className="py-2 pr-4">{r.notes ?? "—"}</td>
                  <td className="py-2">{formatDate(r.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-16 mt-10">
        <h2 className="text-lg font-bold text-navy">
          Canciones sugeridas ({songs.length})
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="text-navy-soft">
                <th className="pb-2">Canción</th>
                <th className="pb-2">Artista</th>
                <th className="pb-2">Sugerida por</th>
                <th className="pb-2">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {songs.map((s) => (
                <tr key={s.id} className="border-t border-navy/10">
                  <td className="py-2 pr-4">{s.song}</td>
                  <td className="py-2 pr-4">{s.artist ?? "—"}</td>
                  <td className="py-2 pr-4">{s.suggested_by ?? "—"}</td>
                  <td className="py-2">{formatDate(s.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
