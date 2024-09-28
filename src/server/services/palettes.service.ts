import httpStatus from "http-status";

import { db } from "@server/db";
import { palettes } from "@server/db/schema";
import { DatabaseError } from "@server/utils/errors";

import { type SavePaletteValidation } from "@server/validations/palettes.validation";
import { eq } from "drizzle-orm";

type PaletteDraft = SavePaletteValidation["body"];

export const savePalette = async (payload: PaletteDraft) => {
  console.log("Save Palette Payload: ", payload);

  const [createdPalette] = await db.insert(palettes).values(payload).returning();

  console.log("Created Palette: ", createdPalette);

  if (!createdPalette?.id) {
    throw new DatabaseError("Failed to create palette", httpStatus.INTERNAL_SERVER_ERROR);
  }

  return createdPalette;
};

export const updatePalette = async (paletteId: string, payload: PaletteDraft) => {
  const [udpatedPalette] = await db.update(palettes).set(payload).where(eq(palettes.id, paletteId)).returning();

  if (!udpatedPalette?.id) {
    throw new DatabaseError("Failed to update palette", httpStatus.INTERNAL_SERVER_ERROR);
  }

  return udpatedPalette;
};
