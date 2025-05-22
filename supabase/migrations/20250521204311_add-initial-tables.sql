create table if not exists public.user (
    id uuid primary key default gen_random_uuid(),
    user_name text not null,
    email text not null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

create table if not exists public.server (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),
    created_by uuid references public.user(id) on delete cascade default auth.uid(),
    updated_by uuid references public.user(id) on delete cascade default auth.uid()
);

create table if not exists public.channel (
    id uuid primary key default gen_random_uuid(),
    server_id uuid references server(id) on delete cascade,
    name text not null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),
    created_by uuid references public.user(id) on delete cascade default auth.uid(),
    updated_by uuid references public.user(id) on delete cascade default auth.uid()
);

create table if not exists public.message (
    id uuid primary key default gen_random_uuid(),
    channel_id uuid references channel(id) on delete cascade,
    content text not null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),
    user_id uuid references public.user(id) on delete cascade default auth.uid()
);

alter publication supabase_realtime add table public.message;

create or replace function "public"."handle_new_user"() returns trigger
    language "plpgsql" security definer
    as $$
begin
  insert into public.user (id, email, user_name)
  values (new.id, new.email, new.raw_user_meta_data->>'userName');
  return new;
end;
$$;

create or replace function "public"."handle_update_user"() returns trigger
    language "plpgsql" security definer
    set "search_path" to 'public'
    as $$
begin
  update public.user
  set (email, user_name) = (new.email, 
    new.raw_user_meta_data->>'userName')
  where id = new.id;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create trigger on_auth_user_updated
  after update on auth.users
  for each row execute procedure public.handle_update_user();

create or replace function on_created()
returns trigger as $$
begin
  new."updated_by" := auth.uid();
  new."created_by" := auth.uid();
  new."created_at" := now();
  new."updated_at" := now();
  return new;
end;
$$ LANGUAGE plpgsql;


create or replace function on_updated()
returns trigger as $$
  begin
    new."updated_by" := auth.uid();
    new."updated_at" := now();
    return new;
  end;
  $$ language plpgsql;

create trigger handle_update_server before update on public.server
  for each row execute procedure on_updated ();

create trigger handle_update_channel before update on public.channel
  for each row execute procedure on_updated ();
