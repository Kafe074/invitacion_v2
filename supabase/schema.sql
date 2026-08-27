-- Pega y ejecuta este archivo completo en el SQL Editor de tu proyecto de Supabase.

create extension if not exists pgcrypto;

create table if not exists guests (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  household_name text not null,
  members text[] not null,
  invited_events text[] not null default '{ceremonia,celebracion}',
  max_companions int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists rsvps (
  id uuid primary key default gen_random_uuid(),
  guest_id uuid references guests(id) on delete set null,
  guest_name text not null,
  attending_ceremonia boolean,
  attending_celebracion boolean,
  companions int not null default 0,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists song_suggestions (
  id uuid primary key default gen_random_uuid(),
  suggested_by text,
  song text not null,
  artist text,
  created_at timestamptz not null default now()
);

alter table guests enable row level security;
alter table rsvps enable row level security;
alter table song_suggestions enable row level security;

-- Cualquiera puede enviar una confirmación o sugerir una canción...
create policy "public can submit rsvp" on rsvps for insert with check (true);
create policy "public can suggest song" on song_suggestions for insert with check (true);

-- ...pero nadie puede leer/editar/borrar rsvps, canciones o invitados desde el
-- navegador: esas tablas solo se acceden desde el servidor con la service role key
-- (panel /admin y la carga de /i/[slug]). Por eso no hay policies de select aquí.
