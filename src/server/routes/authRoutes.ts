import express from "express";
import passport from "passport";
import httpStatus from "http-status";

import env from "@environments";

export const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  }),
  (req, res) => {
    res.json({
      message: "I am Authorized",
    });
  },
);

router.get("/test", (req, res) => {
  console.log(req.user);

  res.json(req.user);
});

router.get(
  env.auth.googleCallbackUrl.replace("/auth", ""),
  passport.authenticate("google", {
    failureRedirect: "/auth/failed",
    successRedirect: "/",
    session: true,
  }),
);

router.get("/logout", (req, res) => {
  req.logOut(
    {
      keepSessionInfo: false,
    },
    (err) => {
      res.sendStatus(httpStatus.BAD_REQUEST);
    },
  );
});
