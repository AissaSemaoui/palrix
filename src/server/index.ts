import "module-alias/register";

import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";

import { verifySession } from "@server/middlewares/auth.middleware";
import { errorHandler } from "@server/middlewares/errorHandler.middleware";
import { authRoutes } from "@server/routes";
import { nextApp, nextHandler } from "@server/next_app";
import { passportConfig } from "@server/config/passport";
import { logger } from "@server/utils/logger";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());

passportConfig(passport);
app.use("/api/*", passport.initialize(), verifySession);

app.use("/api/auth", authRoutes);

app.use((req, res) => nextHandler(req, res));

app.use(errorHandler);

nextApp.prepare().then(() => {
  app.listen(PORT, () => {
    logger.info("Server is up and running");
  });
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});
