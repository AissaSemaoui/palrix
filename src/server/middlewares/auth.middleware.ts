import { clerkClient } from "@clerk/clerk-sdk-node";
import { currentUser } from "@clerk/nextjs/server";

import type { ExpressMiddleware } from "@/server/types";

export const verifySession: ExpressMiddleware = async (req, res, next) => {
  console.log("here is the auth object? ", req.auth);

  const { sessionId, userId } = req.auth;

  if (!sessionId) {
    res.locals.user = null;
    res.locals.session = null;

    return next();
  }

  const user = await clerkClient.users.getUser(userId);

  console.log("inside the middleware : ", user, sessionId);

  res.locals.user = user;
  res.locals.session = null;

  return next();
};

export const verifyNextSession = async () => {
  const user = null;

  console.log("here is the user: ", user);

  if (!user) return { user: null, session: null };

  return { user, session: null };
};
