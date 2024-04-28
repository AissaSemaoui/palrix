import httpStatus from "http-status";

import { generatePalette } from "@server/services/generation.service";
import { GeneratePaletteValidation } from "@server/validations/generation.validation";
import { catchController } from "@server/utils/api";
import type { ExpressMiddleware } from "@server/types";

export const generatePaletteController: ExpressMiddleware = catchController(async (req, res, next) => {
  const body = req.body as GeneratePaletteValidation["body"];

  const response = await generatePalette(body);

  res.status(httpStatus.OK).json(response);
}, "[Generate Palette Controller]");
