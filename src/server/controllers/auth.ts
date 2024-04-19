import type { Request, Response } from "express";

import { lucia } from "@server/config/lucia";
import { AuthError } from "@server/utils/api";
import { paths } from "@/config/navigations";

const logoutController = async (req: Request, res: Response) => {
  const sessionId = res.locals.session?.id;

  if (!sessionId) {
    throw new AuthError("Session not found");
  }

  await lucia.invalidateSession(sessionId);

  const { name, value, attributes } = lucia.createBlankSessionCookie();
  res.cookie(name, value, attributes);

  return res.redirect(paths.auth.login);
};

export { logoutController };
