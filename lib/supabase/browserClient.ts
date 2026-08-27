"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Cliente con la anon key: solo puede hacer INSERT en rsvps y song_suggestions
// (ver supabase/schema.sql). No tiene permiso de lectura sobre esas tablas ni
// sobre guests.
//
// Se crea perezosamente (recién cuando alguien envía un formulario) para que
// el resto del sitio siga funcionando aunque todavía no se hayan configurado
// las variables de entorno de Supabase.
let client: SupabaseClient | null = null;

export function getSupabaseBrowser() {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Supabase no está configurado todavía (faltan NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY).",
    );
  }

  client = createClient(url, anonKey, { auth: { persistSession: false } });
  return client;
}
