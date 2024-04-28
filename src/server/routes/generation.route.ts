import express from "express";

import { generatePaletteController } from "@server/controllers/generation.controller";
import { generatePaletteValidation } from "@server/validations/generation.validation";
import { validate } from "@server/middlewares/validate.middleware";

export const router = express.Router();

router.post("/palette", validate(generatePaletteValidation), generatePaletteController);
