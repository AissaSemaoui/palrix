import { and, count, desc, eq } from "drizzle-orm";
import httpStatus from "http-status";

import { db } from "@server/db";
import { palettes } from "@server/db/schema";
import { createPalette, updatePalette } from "@server/services/palettes.service";
import type { ExpressMiddleware } from "@server/types";
import { ApiResponse } from "@server/utils/response";
import {
  GetPalettesValidation,
  CreatePaletteValidation,
  UpdatePaletteValidation,
} from "@server/validations/palettes.validation";

export const createPaletteController: ExpressMiddleware = async (req, res) => {
  console.log("received a request from palette controller");

  const body = req.body as CreatePaletteValidation["body"];

  const newPalette = await createPalette(body);

  return res.status(httpStatus.CREATED).json(ApiResponse(newPalette));
};

export const updatePaletteController: ExpressMiddleware = async (req, res) => {
  console.log("we received an update palette request?");

  const userId = req.auth.userId;
  const paletteId = req.params.paletteId;
  const body = req.body as UpdatePaletteValidation["body"];

  console.log("before palette update!");
  const palette = await updatePalette(paletteId, userId, body.payload);
  console.log("after palette update!", palette);

  return res.status(httpStatus.OK).json(ApiResponse(palette));
};

export const getPaletteController: ExpressMiddleware = async (req, res) => {
  console.log("we received a palette request?");

  const userId = req.auth.userId;
  const paletteId = req.params.paletteId;

  const palette = await db
    .select()
    .from(palettes)
    .where(and(eq(palettes.userId, userId), eq(palettes.id, paletteId)))
    .limit(1);

  return res.status(httpStatus.OK).json(ApiResponse(palette[0]));
};

export const getPalettesController: ExpressMiddleware = async (req, res) => {
  const userId = req.auth.userId;

  const query = req.query as GetPalettesValidation["query"];

  const pageIndex = Number(query.p ?? 1) - 1;
  const pageSize = Number(query.s ?? 10);

  const historyPalettesQuery = db
    .select()
    .from(palettes)
    .where(eq(palettes.userId, userId))
    .orderBy(desc(palettes.createdAt))
    .limit(pageSize)
    .offset(pageIndex * pageSize);

  const historyPalettesCountQuery = db
    .select({ count: count(palettes.id) })
    .from(palettes)
    .where(eq(palettes.userId, userId));

  const [historyPalettes, historyPalettesCount] = await Promise.all([historyPalettesQuery, historyPalettesCountQuery]);

  console.log(historyPalettes.length);

  return res
    .status(httpStatus.OK)
    .json(ApiResponse(historyPalettes, { page: pageIndex, pageSize, totalCount: historyPalettesCount[0].count }));
};
