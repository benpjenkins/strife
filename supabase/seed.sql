
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', 'afbf68e3-bd49-4854-836a-2b1e15409b89', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"ben@benjenkins.dev","user_id":"86a75009-7ce4-40e8-b132-53b3cc54edd0","user_phone":""}}', '2025-05-21 22:49:36.08684+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '86a75009-7ce4-40e8-b132-53b3cc54edd0', 'authenticated', 'authenticated', 'ben@benjenkins.dev', '$2a$10$3ehuCPU19GAhxesRcK2BUeZL61KgqFO6/ETi0O7SfxdePut9HHmXu', '2025-05-21 22:49:36.090252+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"email_verified": true,
    "userName": "Ben Jenkins"}', null, '2025-05-21 22:49:36.079374+00', '2025-05-21 22:49:36.091724+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('86a75009-7ce4-40e8-b132-53b3cc54edd0', '86a75009-7ce4-40e8-b132-53b3cc54edd0', '{"sub": "86a75009-7ce4-40e8-b132-53b3cc54edd0", "email": "ben@benjenkins.dev", "email_verified": false, "phone_verified": false}', 'email', '2025-05-21 22:49:36.085597+00', '2025-05-21 22:49:36.085645+00', '2025-05-21 22:49:36.085645+00', '243d814e-4c89-47b9-9bfe-03af7b66cd56');




-- INSERT INTO "public"."user" ("id", "user_name", "email", "created_at", "updated_at") VALUES
-- 	('86a75009-7ce4-40e8-b132-53b3cc54edd0', 'Ben Jenkins', 'ben@benjenkins.dev', '2025-05-21 22:49:36.078816+00', '2025-05-21 22:49:36.078816+00');




--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


insert into public.server (id, name, created_at, updated_at, created_by, updated_by)
values
    ('2d2f9243-2a2b-4dc1-aa39-a70203f505d1', 'Mefca', now(), now(), '86a75009-7ce4-40e8-b132-53b3cc54edd0', '86a75009-7ce4-40e8-b132-53b3cc54edd0'),
    ('17ff0f86-ca3e-4573-9c74-2350f163fe96', 'Mefca Classic', now(), now(), '86a75009-7ce4-40e8-b132-53b3cc54edd0', '86a75009-7ce4-40e8-b132-53b3cc54edd0');

insert into public.channel (id, server_id, name, created_at, updated_at, created_by, updated_by)
values
    ('a6333e55-ccc2-4118-a568-26eb763e7abc', '2d2f9243-2a2b-4dc1-aa39-a70203f505d1', 'general', now(), now(), '86a75009-7ce4-40e8-b132-53b3cc54edd0', '86a75009-7ce4-40e8-b132-53b3cc54edd0'),
    ('cf06ff72-2f7c-422e-86a3-9faec134b25e', '17ff0f86-ca3e-4573-9c74-2350f163fe96', 'hope-core', now(), now(), '86a75009-7ce4-40e8-b132-53b3cc54edd0', '86a75009-7ce4-40e8-b132-53b3cc54edd0'),
    ('9378f0f3-5fac-4f26-9407-afe363be6694', '2d2f9243-2a2b-4dc1-aa39-a70203f505d1', 'noms-noms', now(), now(), '86a75009-7ce4-40e8-b132-53b3cc54edd0', '86a75009-7ce4-40e8-b132-53b3cc54edd0'),
    ('cd018afd-5e0c-49c4-89d0-58c50ec70f64', '17ff0f86-ca3e-4573-9c74-2350f163fe96', 'heckin-good-boys-and-girls', now(), now(), '86a75009-7ce4-40e8-b132-53b3cc54edd0', '86a75009-7ce4-40e8-b132-53b3cc54edd0');

insert into public.message (id, channel_id, user_id, content, created_at, updated_at)
values
    ('765b366e-7c8f-4b92-a8b2-c1ca2694e544', 'a6333e55-ccc2-4118-a568-26eb763e7abc', '86a75009-7ce4-40e8-b132-53b3cc54edd0', 'Hello, world!', now(), now()),
    ('4e43ff45-a64d-4160-83d2-c50e876adeaf', 'cf06ff72-2f7c-422e-86a3-9faec134b25e', '86a75009-7ce4-40e8-b132-53b3cc54edd0', 'This is a test message.', now(), now());