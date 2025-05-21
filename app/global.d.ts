// define environment variable types that we are attaching to the window object for use in the client
// follows documented pattern here https://remix.run/docs/en/main/guides/envvars#browser-environment-variables
interface Window {
  STRIFE_ENV: {
    SUPABASE_URL: string;
    SUPABASE_KEY: string;
  };
}
