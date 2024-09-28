import httpStatus from "http-status";

import { chatWithPalette, generatePalette } from "@server/services/generation.service";
import { savePalette, updatePalette } from "@server/services/palettes.service";
import { AuthError } from "@server/utils/errors";
import { ApiResponse } from "@server/utils/response";
import { ChatWithPaletteValidation, GeneratePaletteValidation } from "@server/validations/generation.validation";

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

export const chatWithPaletteController: ExpressMiddleware = async (req, res, next) => {
  const userId = req.auth.userId;

  if (!userId) {
    throw new AuthError("Not Authorized!", 401);
  }

  const paletteId = (req.params as ChatWithPaletteValidation["params"]).paletteId;
  const body = req.body as ChatWithPaletteValidation["body"];

  const { id, ...paletteDraft } = await chatWithPalette(paletteId, body.userPrompt);

  const updatedPalette = await updatePalette(paletteId, {
    userId,
    ...paletteDraft,
  });

  res.status(httpStatus.OK).json(ApiResponse(updatedPalette));
};
