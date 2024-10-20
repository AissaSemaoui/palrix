import "module-alias/register";

import cookieParser from "cookie-parser";
import express from "express";

import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

import { paths } from "@/config/navigations";
import { errorHandler } from "@server/middlewares/errorHandler.middleware";
import { nextApp, nextHandler } from "@server/next_app";
import { generationRoutes, palettesRoutes, webhookRoutes } from "@server/routes";
import { logger } from "@server/utils/logger";
import { ApiError } from "./utils/errors";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cookieParser());

app.use("/api/webhook", webhookRoutes);
app.use("/api/*", ClerkExpressWithAuth({ signInUrl: paths.auth.login }));

app.use(express.json());

app.use("/api/palettes", palettesRoutes);
app.use("/api/generate", generationRoutes);

app.all("/api/*", () => {
  console.log("this is not found!");

  throw new ApiError("Not Found!", 404);
});

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
