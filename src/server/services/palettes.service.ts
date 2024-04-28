import httpStatus from "http-status";

import { db } from "@server/db";
import { palettes } from "@server/db/schema";
import { DatabaseError } from "@server/utils/errors";
import { type SavePaletteValidation } from "@server/validations/palettes.validation";

type PaletteDraft = SavePaletteValidation["body"];

export const savePalette = async (payload: PaletteDraft) => {
  const [createdPalette] = await db.insert(palettes).values(payload).returning();

  if (!createdPalette?.id) {
    throw new DatabaseError("Failed to create palette", httpStatus.INTERNAL_SERVER_ERROR);
  }

  return createdPalette;
};

console.log("running the create Palette function");
