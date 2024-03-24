import "module-alias/register";

import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";

import { passportConfig } from "@server/config/passport";
import { nextApp, nextHandler } from "@server/next_app";
import { authRoutes } from "@server/routes";
import env from "@environments";
import { logger } from "./utils/logger";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cookieSession({
    name: "pl_se",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [env.auth.googleClientSecret],
  }),
);

passportConfig(passport);
app.use(passport.session());
app.use(passport.initialize());

app.use("/auth", authRoutes);

app.use((req, res) => nextHandler(req, res));

nextApp.prepare().then(() => {
  app.listen(PORT, () => {
    logger.info("Server is up and running");
  });
});
