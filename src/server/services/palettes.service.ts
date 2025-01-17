import httpStatus from "http-status";

import { db } from "@server/db";
import { palettes } from "@server/db/schema";
import { DatabaseError } from "@server/utils/errors";

import {
  SavePaletteValidation,
  UpdatePaletteValidation,
  type CreatePaletteValidation,
} from "@server/validations/palettes.validation";
import { and, eq } from "drizzle-orm";
import { Color } from "../types";
import { generateUpdatedPaletteColors } from "@/lib/palettes/utils/helpers";

type CreatePalettePayload = CreatePaletteValidation["body"];
type SavePalettePayload = SavePaletteValidation["body"];
type UpdatePalettePayload = UpdatePaletteValidation["body"]["payload"];

export const getPalette = async (paletteId: string, userId: string) => {
  const [palette] = await db
    .select()
    .from(palettes)
    .where(and(eq(palettes.id, paletteId), eq(palettes.userId, userId)));

  return palette;
};

export const createPalette = async (payload: CreatePalettePayload) => {
  console.log("Create Palette Payload: ", payload);

  const [createdPalette] = await db.insert(palettes).values(payload).returning();

  console.log("Created Palette: ", createdPalette);

  if (!createdPalette?.id) {
    throw new DatabaseError("Failed to create palette", httpStatus.INTERNAL_SERVER_ERROR);
  }

  return createdPalette;
};

export const savePalette = async (paletteId: string, userId: string, payload: SavePalettePayload) => {
  console.log("Save Palette Payload: ", payload);

  const [savedPalette] = await db
    .update(palettes)
    .set(payload)
    .where(and(eq(palettes.id, paletteId), eq(palettes.userId, userId)))
    .returning();

  if (!savedPalette?.id) {
    throw new DatabaseError("Failed to save palette", httpStatus.INTERNAL_SERVER_ERROR);
  }
  return savedPalette;
};

export const updatePalette = async (paletteId: string, userId: string, payload: UpdatePalettePayload) => {
  const { colors, ...restPayload } = payload;

  let newColors: Color[] = [];

  if (colors) {
    const palette = await getPalette(paletteId, userId);

    newColors = generateUpdatedPaletteColors(palette.colors, colors);
  }

  const [udpatedPalette] = await db
    .update(palettes)
    .set({
      ...restPayload,
      ...(newColors.length && { colors: newColors }),
    })
    .where(and(eq(palettes.id, paletteId), eq(palettes.userId, userId)))
    .returning();

  if (!udpatedPalette?.id) {
    throw new DatabaseError("Failed to update palette", httpStatus.INTERNAL_SERVER_ERROR);
  }

  return udpatedPalette;
};
