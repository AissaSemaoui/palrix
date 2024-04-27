import httpStatus from "http-status";

import { createPalette } from "@server/services/palettes.service";
import { CreatePaletteValidation } from "@server/validations/palettes.validation";
import { catchController } from "@server/utils/api";
import type { ExpressMiddleware } from "@server/types";

export const createPaletteController: ExpressMiddleware = catchController(async (req, res) => {
  console.log("received a request from palette controller");

  const body = req.body as CreatePaletteValidation["body"];

  const newPalette = await createPalette(body);

  res.status(httpStatus.CREATED).json(newPalette);
}, "[Create Palette Controller]");
