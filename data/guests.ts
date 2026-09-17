// Lista de invitados con link personalizado (/i/<slug>).
// Para agregar un invitado: copia un bloque, cambia el slug (único, sin
// espacios) y los datos. No hace falta nada más — no hay base de datos.

export type Guest = {
  slug: string;
  householdName: string;
  members: string[];
  invitedEvents: string[];
  maxCompanions: number;
};

export const guests: Guest[] = [
  // {
  //   slug: "familia-perez",
  //   householdName: "Familia Pérez",
  //   members: ["Juan Pérez", "María Pérez"],
  //   invitedEvents: ["ceremonia", "celebracion"],
  //   maxCompanions: 0,
  // },
];

export function getGuestBySlug(slug: string): Guest | null {
  return guests.find((g) => g.slug === slug) ?? null;
}
