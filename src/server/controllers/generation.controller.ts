import httpStatus from "http-status";

import { generatePalette } from "@server/services/generation.service";
import { GeneratePaletteValidation } from "@server/validations/generation.validation";
import { catchController } from "@server/utils/api";
import { savePalette } from "@server/services/palettes.service";
import { AuthError } from "@server/utils/errors";

import type { ExpressMiddleware } from "@server/types";

export const generatePaletteController: ExpressMiddleware = catchController(async (req, res, next) => {
  const userId = res.locals.user?.id;

  if (!userId) {
    throw new AuthError("Not Authorized!", 401);
  }

  const body = req.body as GeneratePaletteValidation["body"];

  const paletteDraft = await generatePalette(body);

  const savedPalette = await savePalette({
    userId,
    ...paletteDraft,
  });

  res.status(httpStatus.OK).json(savedPalette);
}, "[Generate Palette Controller]");
