import type { Session } from "lucia";

import { lucia } from "@server/config/lucia";

import type { ExpressMiddleware, User } from "@/server/types";

type VerifyNextSession = (cookies: string) => Promise<{ session: Session; user: User } | { session: null; user: null }>;

export const verifySession: ExpressMiddleware = async (req, res, next) => {
  const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");

  if (!sessionId) {
    res.locals.user = null;
    res.locals.session = null;

    return next();
  }

  const { user, session } = await lucia.validateSession(sessionId);

  console.log("inside the middleware : ", user, session);

  if (session && session.fresh) {
    const { name, value, attributes } = lucia.createSessionCookie(sessionId);
    res.cookie(name, value, attributes);
  }
  if (!session) {
    const { name, value, attributes } = lucia.createBlankSessionCookie();
    res.cookie(name, value, attributes);
  }

  res.locals.user = user;
  res.locals.session = session;

  return next();
};

export const verifyNextSession = async (cookies: string) => {
  const sessionId = lucia.readSessionCookie(cookies);

  if (!sessionId) {
    return { session: null, user: null };
  }

  const { session, user } = await lucia.validateSession(sessionId);

  if (!session || !user) return { session: null, user: null };

  return { session, user };
};
