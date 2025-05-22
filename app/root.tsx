import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";

import "./tailwind.css";
import { useEffect } from "react";
import { supabase } from "./database";

export const meta = () => {
  return [{ title: "Strife" }];
};

export const loader = () => {
  return {
    STRIFE_ENV: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
    },
  };
};

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  const { STRIFE_ENV } = data;
  const fetcher = useFetcher();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        if (!session?.access_token) {
          console.error("No access token found");
          return;
        }
        fetcher.submit(
          {
            accessToken: session?.access_token,
          },
          {
            method: "post",
            action: "/auth/login",
          }
        );
      }
    });
  }, []);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.STRIFE_ENV = ${JSON.stringify(STRIFE_ENV)}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
