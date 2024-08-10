import httpStatus from "http-status";
import { desc } from "drizzle-orm";

import { savePalette } from "@server/services/palettes.service";
import { GetPalettesValidation, SavePaletteValidation } from "@server/validations/palettes.validation";
import { catchController } from "@server/utils/api";
import type { ExpressMiddleware } from "@server/types";
import { db } from "@server/db";
import { palettes } from "@server/db/schema";
import { ApiResponse } from "@server/utils/response";

export const savePaletteController: ExpressMiddleware = catchController(async (req, res) => {
  console.log("received a request from palette controller");

  const body = req.body as SavePaletteValidation["body"];

  const newPalette = await savePalette(body);

  res.status(httpStatus.CREATED).json(ApiResponse(newPalette));
}, "[Create Palette Controller]");

export const getPalettesController: ExpressMiddleware = catchController(async (req, res) => {
  const query = req.query as GetPalettesValidation["query"];

  const pageIndex = Number(query.p ?? 1) - 1;
  const pageSize = Number(query.s ?? 10);

  const historyPalettes = await db
    .select()
    .from(palettes)
    .orderBy(desc(palettes.createdAt))
    .limit(pageSize)
    .offset(pageIndex * pageSize);

  console.log(historyPalettes.length);

  return res.status(httpStatus.OK).json(ApiResponse(historyPalettes));
});
