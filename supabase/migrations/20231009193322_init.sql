-- For strong typing and TypeScript generation
CREATE TYPE user_permission AS ENUM('SUBSCRIBER', 'USER', 'ADMIN');

-- Create a table for public users
CREATE TABLE IF NOT EXISTS users (
  id uuid NOT NULL,
  username text UNIQUE,
  permission user_permission NOT NULL,

  CONSTRAINT username_length check (char_length(username) >= 3),
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_id_fkey
    FOREIGN KEY (id)
    REFERENCES auth.users (id)
    MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table users
  enable row level security;

create policy "Public users are viewable by everyone." on users
  for select using (true);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, permission)
  values (new.id, 'SUBSCRIBER');
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();