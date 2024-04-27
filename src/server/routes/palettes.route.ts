import express from "express";

import { createPaletteController } from "@server/controllers/palettes.controller";
import { createPaletteValidation } from "@server/validations/palettes.validation";
import { validate } from "@server/middlewares/validate.middleware";

export const router = express.Router();

router.post("/", validate(createPaletteValidation), createPaletteController);
