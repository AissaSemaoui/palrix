import httpStatus from "http-status";

import { chatWithPalette, generatePalette } from "@server/services/generation.service";
import { createPalette, savePalette, updatePalette } from "@server/services/palettes.service";
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

  const createdPalette = await createPalette({
    userId,
    ...paletteDraft,
  });

  res.status(httpStatus.OK).json(ApiResponse(createdPalette));
};

export const chatWithPaletteController: ExpressMiddleware = async (req, res, next) => {
  const userId = req.auth.userId;

  if (!userId) {
    throw new AuthError("Not Authorized!", 401);
  }

  const paletteId = (req.params as ChatWithPaletteValidation["params"]).paletteId;
  const body = req.body as ChatWithPaletteValidation["body"];

  const { id, ...palettePayload } = await chatWithPalette(paletteId, body.userPrompt);

  const updatedPalette = await savePalette(paletteId, userId, palettePayload);

  res.status(httpStatus.OK).json(ApiResponse(updatedPalette));
};
