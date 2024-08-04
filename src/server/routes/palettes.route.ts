import express from "express";

import { getPalettesController, savePaletteController } from "@server/controllers/palettes.controller";
import { getPalettesValidation, savePaletteValidation } from "@server/validations/palettes.validation";
import { validate } from "@server/middlewares/validate.middleware";

export const router = express.Router();

router.post("/", validate(savePaletteValidation), savePaletteController);

router.get("/", validate(getPalettesValidation), getPalettesController);
