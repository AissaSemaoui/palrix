import httpStatus from "http-status";

import { savePalette } from "@server/services/palettes.service";
import { SavePaletteValidation } from "@server/validations/palettes.validation";
import { catchController } from "@server/utils/api";
import type { ExpressMiddleware } from "@server/types";

export const savePaletteController: ExpressMiddleware = catchController(async (req, res) => {
  console.log("received a request from palette controller");

  const body = req.body as SavePaletteValidation["body"];

  const newPalette = await savePalette(body);

  res.status(httpStatus.CREATED).json(newPalette);
}, "[Create Palette Controller]");
