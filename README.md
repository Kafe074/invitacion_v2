# Invitación Virtual de Boda

Sitio Next.js inspirado en el modelo "Cielo" de Fixdate: hero split-screen, countdown circular, ceremonia/celebración con "Agendar" y "¿Cómo llegar?", galería, sección de fiesta (música/dress code/tips), regalos, Instagram — más **invitados personalizados por link único** y un **wizard de RSVP** que arma un mensaje de WhatsApp para que el invitado lo envíe directo al novio. No hay base de datos ni backend: todo vive en archivos del repo.

## 1. Desarrollo

```bash
npm install
npm run dev
```

- `http://localhost:3000` — invitación genérica (RSVP con nombre libre).
- `http://localhost:3000/i/<slug>` — invitación personalizada de un invitado (el `slug` se define en `data/guests.ts`).

Al confirmar asistencia o sugerir una canción, se abre WhatsApp (`wa.me`) en una pestaña nueva con el mensaje ya armado — el invitado solo tiene que enviarlo. El número destino se configura en `data/weddingData.ts` (`rsvp.whatsappTarget`).

## 2. Personalizar contenido

Toda la información estática (fecha, lugares, vestimenta, regalos, hashtag de Instagram, canción, fotos) vive en `data/weddingData.ts` — un solo archivo, no hace falta tocar componentes.

Los invitados con link personalizado (nombres, a qué eventos están invitados, cupo de acompañantes) viven en `data/guests.ts`. Para agregar uno, copiá el bloque de ejemplo del archivo y completá los datos — el `slug` es lo que va después de `/i/` en la URL.

## 3. Reemplazar assets de ejemplo

- Fotos: `public/images/couple-1.jpg` … `couple-5.jpg` (o cambia las rutas en `weddingData.ts`).
- Canción: `public/audio/our-song.mp3`.

## Deploy

Recomendado: [Vercel](https://vercel.com/new). No hace falta configurar ninguna variable de entorno.
