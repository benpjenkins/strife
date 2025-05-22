
-- alter table public.server enable row level security;
-- alter table public.channel enable row level security;
-- alter table public.message enable row level security;
-- alter table public.user enable row level security;


-- -- Server RLS
-- create policy "authenticated users can select servers" on public.server
--   for select using (auth.uid() != null);
-- create policy "authenticated users can insert servers" on public.server
--   for insert with check (auth.role() = 'authenticated');
-- create policy "authenticated users can update servers" on public.server
--   for update with check (auth.role() = 'authenticated');


-- -- Channel RLS
-- create policy "authenticated users can select channels" on public.channel
--   for select using (auth.role() = 'authenticated');

-- create policy "authenticated users can insert channels" on public.channel
--   for insert with check (auth.role() = 'authenticated');

-- create policy "authenticated users can update channels" on public.channel
--   for update with check (auth.role() = 'authenticated');

-- -- Message RLS
-- create policy "authenticated users can select messages for channels they can select" on public.message
--   for select using (exists(select 1 from public.channel where public.channel.id = message.channel_id));

-- create policy "authenticated users can insert messages for channels they can select" on public.message
--   for insert with check (exists(select 1 from public.channel where public.channel.id = message.channel_id));

-- create policy "authenticated users can update messages they can select" on public.message
--   for update with check (auth.uid() = message.user_id);

-- -- User RLS
-- -- TODO: this is too permissive, come fix it after there is a user-server table to better manage access to servers
-- create policy "authenticated users can select users" on public.user
--   for select using (auth.role() = 'authenticated');

-- create policy "users can insert self" on public.user
--   for insert with check (auth.uid() = id);

-- create policy "users can update self" on public.user
--   for insert with check (auth.uid() = id);
