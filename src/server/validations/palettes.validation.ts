import { createInsertSchema } from "drizzle-zod";

import { palettes } from "@server/db/schema";
import * as z from "zod";

export const paletteInsertSchema = createInsertSchema(palettes, {
  colors: z.array(
    z.object({
      name: z.string(),
      shades: z.string().array(),
    }),
  ),
});

export const savePaletteValidation = z.object({
  body: paletteInsertSchema,
});

export const getPalettesValidation = z.object({
  query: z.object({
    p: z.string().optional(),
    s: z.string().optional(),
  }),
});

export const getPaletteValidation = z.object({
  params: z.object({
    paletteId: z.string(),
  }),
});

export const updatePaletteValidation = z.object({
  params: z.object({
    paletteId: z.string(),
  }),
  body: paletteInsertSchema.omit({ id: true, createdAt: true, updatedAt: true }).partial(),
});

export const deletePaletteValidation = z.object({
  params: z.object({
    paletteId: z.string(),
  }),
});

export type SavePaletteValidation = z.infer<typeof savePaletteValidation>;
export type GetPalettesValidation = z.infer<typeof getPalettesValidation>;
export type GetPaletteValidation = z.infer<typeof getPaletteValidation>;
export type UpdatePaletteValidation = z.infer<typeof updatePaletteValidation>;
export type DeletePaletteValidation = z.infer<typeof deletePaletteValidation>;
