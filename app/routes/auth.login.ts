import { commitSession, getSession } from "~/utils/cookie";
import { redirect } from "@remix-run/node";

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const accessToken = formData.get("accessToken") as string;
  const session = await getSession(accessToken);
  session.set("access_token", accessToken);
  const cookie = await commitSession(session);

  return redirect("/servers", {
    headers: {
      "Set-Cookie": cookie,
    },
  });
};
