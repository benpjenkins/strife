import {
  commitSession,
  destroySession,
  getSession,
  MAX_AGE,
} from "~/utils/cookie";
import { redirect } from "@remix-run/node";
import { createServerClient } from "~/database";

export const action = async ({ request }: { request: Request }) => {
  const supabase = createServerClient(request);

  const formData = await request.formData();
  const accessToken = formData.get("accessToken") as string;
  const session = await getSession(accessToken);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (!user) {
    destroySession(session);
    return null;
  }
  session.set("access_token", accessToken);
  const cookie = await commitSession(session, {
    expires: new Date(Date.now() + MAX_AGE * 1000),
  });

  return redirect("/servers", {
    headers: {
      "Set-Cookie": cookie,
    },
  });
};
