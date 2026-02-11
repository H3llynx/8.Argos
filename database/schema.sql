-- Animals table

create table public.animals (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  name text not null,
  type text not null,
  breed text null,
  sex text not null,
  age text not null,
  size text not null,
  photo_url text null,
  adopted_at date null,
  location text not null default 'Barcelona'::text,
  constraint animals_pkey primary key (id)
) TABLESPACE pg_default;



-- Events table

create table public.events (
  id uuid not null default gen_random_uuid (),
  event_type text not null,
  title text not null,
  start timestamp with time zone not null,
  "end" timestamp with time zone not null,
  status text null default 'scheduled'::text,
  animal_id uuid null,
  visitor_name text null,
  visitor_email text null,
  visitor_phone text null,
  location text null,
  organizer text null,
  description text null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint events_pkey primary key (id),
  constraint events_animal_id_fkey foreign KEY (animal_id) references animals (id) on delete set null
) TABLESPACE pg_default;

create index IF not exists idx_events_type on public.events using btree (event_type) TABLESPACE pg_default;
create index IF not exists idx_events_start on public.events using btree (start) TABLESPACE pg_default;
create index IF not exists idx_events_animal on public.events using btree (animal_id) TABLESPACE pg_default;


-- Profiles table (user management)

create table public.profiles (
  id uuid not null,
  email text null,
  role text null default 'user'::text,
  created_at timestamp with time zone null default now(),
  constraint profiles_pkey primary key (id),
  constraint profiles_id_fkey foreign KEY (id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;