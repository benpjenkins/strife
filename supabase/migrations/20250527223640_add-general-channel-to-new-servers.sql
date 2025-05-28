create or replace function "public"."handle_new_server"() returns trigger
    language "plpgsql" security definer
    as $$
begin
  insert into public.channel (server_id, name, created_by, updated_by, description)
  values (new.id, 'General', new.created_by, new.created_by, 'Your first chat channel');
  return new;
end;
$$;

create trigger on_server_created
  after insert on public.server
  for each row execute procedure public.handle_new_server();