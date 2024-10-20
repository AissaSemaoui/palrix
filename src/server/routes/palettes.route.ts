import express from "express";

import {
  getPaletteController,
  getPalettesController,
  createPaletteController,
  updatePaletteController,
} from "@server/controllers/palettes.controller";
import {
  getPalettesValidation,
  getPaletteValidation,
  createPaletteValidation,
  updatePaletteValidation,
} from "@server/validations/palettes.validation";
import { validate } from "@server/middlewares/validate.middleware";
import { catchController } from "@server/utils/api";

export const router = express.Router();

router.get("/", validate(getPalettesValidation), catchController(getPalettesController, "[GET PALETTES CONTROLLER]"));

router.post(
  "/",
  validate(createPaletteValidation),
  catchController(createPaletteController, "[CREATE PALETTE CONTROLLER]"),
);

router.get(
  "/:paletteId",
  validate(getPaletteValidation),
  catchController(getPaletteController, "[GET SINGLE PALETTE CONTROLLER]"),
);

router.patch(
  "/:paletteId",
  validate(updatePaletteValidation),
  catchController(updatePaletteController, "[UPDATE PALETTE CONTROLLER]"),
);
