create table if not exists guest_photos (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null default '',
  caption text not null default '',
  mime_type text not null,
  bytes bytea not null,
  created_at timestamptz not null default now()
);

create index if not exists guest_photos_created_at_idx
  on guest_photos (created_at desc);
