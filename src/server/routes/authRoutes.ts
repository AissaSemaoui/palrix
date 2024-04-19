import express from "express";
import passport from "passport";

import { routes } from "@server/config/routes";
import { lucia } from "@server/config/lucia";
import { verifySession } from "@server/middlewares/auth.middleware";
import env from "@environments";
import httpStatus from "http-status";
import { paths } from "@/config/navigations";

export const router = express.Router();

router.get(
  routes.auth.google,
  passport.authenticate("google", {
    scope: ["email", "profile"],
  }),
);

router.get("/me", verifySession, async (req, res) => {
  if (!res.locals.session) {
    res.status(httpStatus.UNAUTHORIZED).redirect(paths.auth.login);
  }

  res.status(httpStatus.OK).json(res.locals);
});

router.get(
  env.auth.googleCallbackUrl.replace("/api/auth", ""),
  passport.authenticate("google", {
    failureRedirect: "/auth/failed",
    // successRedirect: "/",
    session: false,
  }),
  async (req, res) => {
    const session = await lucia.createSession(req?.user?.id ?? "", {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    res.cookie(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return res.redirect(paths.dashboard.root);
  },
);
