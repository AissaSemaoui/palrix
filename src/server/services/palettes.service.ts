import httpStatus from "http-status";

import { db } from "@server/db";
import { palettes } from "@server/db/schema";
import { DatabaseError } from "@server/utils/errors";
import { type CreatePaletteValidation } from "@server/validations/palettes.validation";

type PaletteDraft = CreatePaletteValidation["body"];

export const createPalette = async (data: PaletteDraft) => {
  const [createdPalette] = await db.insert(palettes).values(data).returning();

  if (!createdPalette?.id) {
    throw new DatabaseError("Failed to create palette", httpStatus.INTERNAL_SERVER_ERROR);
  }

  return createdPalette;
};

console.log("running the create Palette function");
