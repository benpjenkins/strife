import { useEffect } from "react";
import { supabase } from "~/database";

export default () => {
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
