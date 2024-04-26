import express from "express";

import { createPaletteController } from "@server/controllers/palette.controller";
import { createPaletteValidation } from "@server/validations/palette.validation";
import { validate } from "@server/middlewares/validate.middleware";

export const router = express.Router();

router.post("/", validate(createPaletteValidation), createPaletteController);
