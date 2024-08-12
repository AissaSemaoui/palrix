import express from "express";

import { generatePaletteController } from "@server/controllers/generation.controller";
import { generatePaletteValidation } from "@server/validations/generation.validation";
import { validate } from "@server/middlewares/validate.middleware";
import { catchController } from "@server/utils/api";

export const router = express.Router();

router.post(
  "/palette",
  validate(generatePaletteValidation),
  catchController(generatePaletteController, "[GENERATE PALETTE CONTROLLER]"),
);
