create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'user' check (role in ('user', 'admin')),
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.prayers (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  tag text not null,
  title text not null,
  description text not null default '',
  content text not null default '',
  image_url text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.teachings (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  title text not null,
  description text not null default '',
  content text not null default '',
  duration text,
  image_url text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  event_date date not null,
  event_time time,
  location text not null default '',
  image_url text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  price numeric(12, 2) not null check (price >= 0),
  currency text not null default 'FCFA',
  image_url text,
  available boolean not null default true,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  title text not null,
  description text not null default '',
  image_url text not null,
  alt_text text not null default '',
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('Demande de prière', 'Question', 'Témoignage')),
  name text,
  contact_method text not null default 'Je ne souhaite pas être recontacté' check (contact_method in ('Email', 'WhatsApp', 'Je ne souhaite pas être recontacté')),
  email text,
  whatsapp text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'answered', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists prayers_set_updated_at on public.prayers;
create trigger prayers_set_updated_at before update on public.prayers
for each row execute function public.set_updated_at();

drop trigger if exists teachings_set_updated_at on public.teachings;
create trigger teachings_set_updated_at before update on public.teachings
for each row execute function public.set_updated_at();

drop trigger if exists events_set_updated_at on public.events;
create trigger events_set_updated_at before update on public.events
for each row execute function public.set_updated_at();

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at before update on public.products
for each row execute function public.set_updated_at();

drop trigger if exists gallery_items_set_updated_at on public.gallery_items;
create trigger gallery_items_set_updated_at before update on public.gallery_items
for each row execute function public.set_updated_at();

drop trigger if exists contact_messages_set_updated_at on public.contact_messages;
create trigger contact_messages_set_updated_at before update on public.contact_messages
for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.prayers enable row level security;
alter table public.teachings enable row level security;
alter table public.events enable row level security;
alter table public.products enable row level security;
alter table public.gallery_items enable row level security;
alter table public.contact_messages enable row level security;

create policy profiles_select_own on public.profiles for select
using (auth.uid() = id or public.is_admin());

create policy contact_messages_public_insert on public.contact_messages for insert
with check (true);
create policy contact_messages_admin_select on public.contact_messages for select
using (public.is_admin());
create policy contact_messages_admin_update on public.contact_messages for update
using (public.is_admin()) with check (public.is_admin());
create policy contact_messages_admin_delete on public.contact_messages for delete
using (public.is_admin());

create policy prayers_public_read on public.prayers for select
using (published = true or public.is_admin());
create policy prayers_admin_insert on public.prayers for insert
with check (public.is_admin());
create policy prayers_admin_update on public.prayers for update
using (public.is_admin()) with check (public.is_admin());
create policy prayers_admin_delete on public.prayers for delete
using (public.is_admin());

create policy teachings_public_read on public.teachings for select
using (published = true or public.is_admin());
create policy teachings_admin_insert on public.teachings for insert
with check (public.is_admin());
create policy teachings_admin_update on public.teachings for update
using (public.is_admin()) with check (public.is_admin());
create policy teachings_admin_delete on public.teachings for delete
using (public.is_admin());

create policy events_public_read on public.events for select
using (published = true or public.is_admin());
create policy events_admin_insert on public.events for insert
with check (public.is_admin());
create policy events_admin_update on public.events for update
using (public.is_admin()) with check (public.is_admin());
create policy events_admin_delete on public.events for delete
using (public.is_admin());

create policy products_public_read on public.products for select
using (published = true or public.is_admin());
create policy products_admin_insert on public.products for insert
with check (public.is_admin());
create policy products_admin_update on public.products for update
using (public.is_admin()) with check (public.is_admin());
create policy products_admin_delete on public.products for delete
using (public.is_admin());

create policy gallery_public_read on public.gallery_items for select
using (published = true or public.is_admin());
create policy gallery_admin_insert on public.gallery_items for insert
with check (public.is_admin());
create policy gallery_admin_update on public.gallery_items for update
using (public.is_admin()) with check (public.is_admin());
create policy gallery_admin_delete on public.gallery_items for delete
using (public.is_admin());

insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true), ('products', 'products', true)
on conflict (id) do nothing;

create policy storage_public_read on storage.objects for select
using (bucket_id in ('gallery', 'products'));
create policy storage_admin_insert on storage.objects for insert
with check (bucket_id in ('gallery', 'products') and public.is_admin());
create policy storage_admin_update on storage.objects for update
using (bucket_id in ('gallery', 'products') and public.is_admin())
with check (bucket_id in ('gallery', 'products') and public.is_admin());
create policy storage_admin_delete on storage.objects for delete
using (bucket_id in ('gallery', 'products') and public.is_admin());

-- Après création d’un utilisateur dans Supabase Auth, lui attribuer le rôle admin :
-- update public.profiles set role = 'admin' where id = '<AUTH_USER_UUID>';
