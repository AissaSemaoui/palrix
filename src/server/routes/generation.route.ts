import express from "express";

import { chatWithPaletteController, generatePaletteController } from "@server/controllers/generation.controller";
import { validate } from "@server/middlewares/validate.middleware";
import { catchController } from "@server/utils/api";
import { chatWithPaletteValidation, generatePaletteValidation } from "@server/validations/generation.validation";

export const router = express.Router();

router.post(
  "/palette",
  validate(generatePaletteValidation),
  catchController(generatePaletteController, "[GENERATE PALETTE CONTROLLER]"),
);

router.post(
  "/palette/:paletteId",
  validate(chatWithPaletteValidation),
  catchController(chatWithPaletteController, "[CHAT WITH PALETTE CONTROLLER]"),
);
