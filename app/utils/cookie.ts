import { createCookieSessionStorage } from "@remix-run/node";

const MAX_AGE = 60 * 60 * 8; // 8 hours

const remixCookieSecret = process.env.REMIX_COOKIE_SECRET;

if (!remixCookieSecret) {
  throw new Error("Missing env var: REMIX_COOKIE_SECRET");
}

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "sb-token",
      maxAge: MAX_AGE,
      domain: "",
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      secure: true,
      secrets: [remixCookieSecret],
    },
  });

export { getSession, commitSession, destroySession, MAX_AGE };
