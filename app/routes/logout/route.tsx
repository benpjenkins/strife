import { useEffect } from "react";
import { createBrowserClient } from "~/database";

export default () => {
  const supabase = createBrowserClient();
  useEffect(() => {
    async function signOutAndRedirect() {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error);
      } else {
        window.location.href = "/login";
      }
    }
    signOutAndRedirect();
  }, []);
  return <p>Logging out...</p>;
};
