import express from "express";

import { savePaletteController } from "@server/controllers/palettes.controller";
import { savePaletteValidation } from "@server/validations/palettes.validation";
import { validate } from "@server/middlewares/validate.middleware";

export const router = express.Router();

router.post("/", validate(savePaletteValidation), savePaletteController);
