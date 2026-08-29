// Toda la información editable de la invitación vive aquí.
// Para personalizar la invitación con los datos reales de la boda,
// edita únicamente este archivo — no hace falta tocar los componentes.
// Los datos específicos de cada invitado (nombres, eventos a los que está
// invitado) NO viven acá: se administran en /admin y se guardan en Supabase.

export const weddingData = {
  couple: {
    brideFirstName: "Nairoby",
    groomFirstName: "Abraham",
  },

  quote: {
    text: "Mejor son dos que uno.",
    reference: "Eclesiastés 4:9",
  },

  // Versículo de cierre, mostrado al final de la página debajo del nombre de la pareja.
  closingVerse: {
    text: "A dondequiera que tú fueres, iré yo, y dondequiera que vivieres, viviré. Tu pueblo será mi pueblo, y tu Dios mi Dios. Sólo la muerte hará separación entre nosotros dos.",
    reference: "Rut 1:16-17",
  },

  // Fecha y hora de la ceremonia en formato ISO — usada por el countdown y
  // por el badge de fecha del hero.
  weddingDateISO: "2026-11-28T16:00:00",

  song: {
    src: "/audio/our-song.mp3",
  },

  photos: {
    hero: "/images/couple-1.jpg",
    instagram: "/images/couple-2.jpg",
  },

  gallery: [
    "/images/couple-2.jpg",
    "/images/couple-3.jpg",
    "/images/couple-4.jpg",
    "/images/couple-5.jpg",
  ],

  family: {
    // Padrinos de la boda.
    padrinos: ["Esaú Trocones", "Salomé Enriquez"],
  },

  // Ceremonia y celebración ocurren juntas, en el mismo lugar y a continuación.
  venue: {
    day: "Domingo 28 de Noviembre - Ingreso 2:30pm",
    startISO: "2026-11-28T16:00:00",
    place: "Local Huerta - Casa ex Caballeriza",
    city: "",
    reference:
      "Entrada por el coliseo de gallos Fernando Graña, a espaldas de la casa Hacienda Huando",
    mapsUrl: "https://maps.app.goo.gl/6wRDxWva6wdmouyt8",
  },

  dressCode: {
    title: "Código de vestimenta",
    subtitle: "Elegante",
    ladies: {
      label: "Mujeres",
      avoid: [
        { name: "Rojo", hex: "#DC2626" },
        { name: "Blancos", hex: "#FFFFFF" },
        { name: "Celeste", hex: "#7DD3FC" },
      ],
    },
    gentlemen: {
      label: "Varones",
      avoid: [
        { name: "Beige", hex: "#D8C3A5" },
        { name: "Blanco", hex: "#FFFFFF" },
        { name: "Celeste", hex: "#7DD3FC" },
      ],
    },
  },

  pool: {
    title: "¡Un detalle para disfrutar!",
    message:
      "Nuestro local cuenta con piscina, así que quienes deseen disfrutar de ella pueden traer ropa de baño y un cambio de ropa para continuar celebrando cómodamente. 🩱👙✨",
    closing: "¡Que la diversión también sea parte de este día tan especial! 💍🤍",
  },

  gifts: {
    message: "Si deseas regalarnos algo más que tu hermosa presencia...",
    envelopeShower: "Lluvia de sobres",
    transfer: {
      label: "Transferencia",
      account: "Cuenta Simple Soles: 898 p3388572231",
      routing: "CCI: 00389801338857223143",
    },
  },

  rsvp: {
    title: "Confirmar Asistencia",
    message: "Es importante que confirmes tu asistencia.",
    deadline: "Fecha límite para responder: 7 de Noviembre",
    contacts: ["983 943 012", "927 538 935"],
  },

  party: {
    subtitle: "Hagamos juntos una fiesta épica. Aquí algunos detalles a tener en cuenta.",
    music: {
      prompt: "¿Cuál es la canción que no debe faltar en la playlist de la fiesta?",
    },
    tips: {
      prompt: "Información adicional para tener en cuenta",
      detail:
        "Para disfrutar plenamente de esta celebración, hemos reservado este día para nuestros invitados mayores de 10 años. Gracias por comprender y acompañarnos en este momento tan especial.",
    },
  },

  notes: {
    personalInvite:
      "Tu presencia ha sido considerada de manera especial. Esta invitación es personal.",
  },

  instagram: {
    hashtag: "nairobyyabraham",
  },
};

export type WeddingData = typeof weddingData;
