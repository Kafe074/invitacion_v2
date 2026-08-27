# Invitación Virtual de Boda

Sitio Next.js inspirado en el modelo "Cielo" de Fixdate: hero split-screen, countdown circular, ceremonia/celebración con "Agendar" y "¿Cómo llegar?", galería, sección de fiesta (música/dress code/tips), regalos, Instagram — más **invitados personalizados por link único** y un **wizard de RSVP** que guarda las respuestas en una base de datos real (Supabase).

## 1. Configurar Supabase (una sola vez)

1. Crea un proyecto gratuito en [supabase.com](https://supabase.com).
2. Abre el **SQL Editor** del proyecto, pega el contenido de `supabase/schema.sql` y ejecútalo.
3. Ve a **Project Settings > API** y copia: Project URL, `anon` key y `service_role` key.
4. Copia `.env.local.example` a `.env.local` y completa esos tres valores más una contraseña para `ADMIN_PASSWORD`.

## 2. Desarrollo

```bash
npm install
npm run dev
```

- `http://localhost:3000` — invitación genérica (RSVP con nombre libre).
- `http://localhost:3000/i/<slug>` — invitación personalizada de un invitado (el `slug` se genera al cargarlo en `/admin`).
- `http://localhost:3000/admin` — panel para agregar invitados y ver RSVPs / canciones sugeridas.

Sin `.env.local` configurado, el sitio se ve y navega igual, pero enviar un RSVP o sugerir una canción muestra un error amigable (no rompe la página) — normal hasta que completes el paso 1.

## 3. Personalizar contenido

Toda la información estática (fecha, lugares, vestimenta, regalos, hashtag de Instagram, canción, fotos) vive en `data/weddingData.ts` — un solo archivo, no hace falta tocar componentes. Los invitados (nombres, a qué eventos están invitados) se administran desde `/admin`, no desde ese archivo.

## 4. Reemplazar assets de ejemplo

- Fotos: `public/images/couple-1.jpg` … `couple-5.jpg` (o cambia las rutas en `weddingData.ts`).
- Canción: `public/audio/our-song.mp3`.

## Deploy

Recomendado: [Vercel](https://vercel.com/new), cargando las mismas variables de entorno de `.env.local` en la configuración del proyecto.
