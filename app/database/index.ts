import { createClient } from "@supabase/supabase-js";

const isServer = typeof window === "undefined";

const supabaseUrl = isServer
  ? process.env.SUPABASE_URL
  : window.STRIFE_ENV.SUPABASE_URL;

const supabaseKey = isServer
  ? process.env.SUPABASE_KEY
  : window.STRIFE_ENV.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key must be provided");
}

const supabase = createClient(supabaseUrl, supabaseKey);
