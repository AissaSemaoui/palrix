import express from "express";

import { routes } from "@server/config/routes";
import { createPaletteController } from "@server/controllers/palette.controller";

export const router = express.Router();

router.post(routes.palette, createPaletteController);
