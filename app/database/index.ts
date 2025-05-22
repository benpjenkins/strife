import {
  createBrowserClient as browserClient,
  createServerClient as serverClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";
import { Database } from "~/types/database.types";

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

export const createBrowserClient = () => {
  return browserClient<Database>(supabaseUrl, supabaseKey);
};

export const createServerClient = (request: Request) => {
  const { headers } = request;
  return serverClient<Database>(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return parseCookieHeader(headers.get("Cookie") ?? "");
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          headers.append(
            "Set-Cookie",
            serializeCookieHeader(name, value, options)
          )
        );
      },
    },
  });
};
