import express from "express";
import bodyParser from "body-parser";

import { clerkWebhookController } from "@server/controllers/webhook.controller";
import { catchController } from "@server/utils/api";

export const router = express.Router();

router.post(
  "/clerk",
  bodyParser.raw({ type: "application/json" }),
  catchController(clerkWebhookController, "[CLERK WEBHOOK CONTROLLER]"),
);
