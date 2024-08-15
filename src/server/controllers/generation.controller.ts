import httpStatus from "http-status";

import { generatePalette } from "@server/services/generation.service";
import { savePalette } from "@server/services/palettes.service";
import { AuthError } from "@server/utils/errors";
import { ApiResponse } from "@server/utils/response";
import { GeneratePaletteValidation } from "@server/validations/generation.validation";

import type { ExpressMiddleware } from "@server/types";

export const generatePaletteController: ExpressMiddleware = async (req, res, next) => {
  const userId = req.auth.userId;

  if (!userId) {
    throw new AuthError("Not Authorized!", 401);
  }

  const body = req.body as GeneratePaletteValidation["body"];

  const paletteDraft = await generatePalette(body);

  const savedPalette = await savePalette({
    userId,
    ...paletteDraft,
  });

  res.status(httpStatus.OK).json(ApiResponse(savedPalette));
};
