import express from "express";
import passport from "passport";
import httpStatus from "http-status";

import { logoutController } from "@server/controllers/auth.controller";
import { AuthError } from "@server/utils/errors";
import { lucia } from "@server/config/lucia";
import { catchController } from "@server/utils/api";
import { paths } from "@/config/navigations";
import env from "@environments";

export const router = express.Router();

router.get(
  "/google",
  catchController(
    passport.authenticate("google", {
      scope: ["email", "profile"],
    }),
  ),
);

router.get(
  "/me",
  catchController(async (_req, res) => {
    console.log("we  got a me request!");

    if (!res.locals.session || !res.locals.user) {
      throw new AuthError("Session not found");
    }

    return res.status(httpStatus.OK).json(res.locals);
  }),
);

router.get(
  env.auth.googleCallbackUrl.replace("/api/auth", ""),
  passport.authenticate("google", {
    failureRedirect: `${paths.auth.login}?error=true`,
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

router.post("/logout", catchController(logoutController));
