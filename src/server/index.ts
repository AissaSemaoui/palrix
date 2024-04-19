import "module-alias/register";

import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import type { Session } from "lucia";

import { passportConfig } from "@server/config/passport";
import { nextApp, nextHandler } from "@server/next_app";
import { authRoutes } from "@server/routes";
import { logger } from "@server/utils/logger";

declare global {
  namespace Express {
    interface Locals {
      user: User | null;
      session: Session | null;
    }

    interface User {
      id: string;
    }
  }
}

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());

passportConfig(passport);
app.use("/api/*", passport.initialize());

app.use("/api/auth", authRoutes);

app.use((req, res) => nextHandler(req, res));

nextApp.prepare().then(() => {
  app.listen(PORT, () => {
    logger.info("Server is up and running");
  });
});
