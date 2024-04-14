import express from "express";
import passport from "passport";
import httpStatus from "http-status";

import { routes } from "@server/config/routes";
import env from "@environments";

export const router = express.Router();

router.get(
  routes.auth.google,
  passport.authenticate("google", {
    scope: ["email", "profile"],
  }),
);

router.get("/me", (req, res) => {
  console.log(req.user);

  res.json(req.user);
});

router.get(
  env.auth.googleCallbackUrl.replace("/api/auth", ""),
  passport.authenticate("google", {
    failureRedirect: "/auth/failed",
    successRedirect: "/",
    session: true,
  }),
);

router.get(routes.auth.logout, (req, res) => {
  console.log("we got a request");

  req.logOut(
    {
      keepSessionInfo: false,
    },
    (err) => {
      res.sendStatus(httpStatus.BAD_REQUEST);
    },
  );
});
